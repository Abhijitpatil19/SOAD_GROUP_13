# Django
from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework import permissions, viewsets, filters, generics, mixins, status
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response

# Core
import requests
import json

# local
from .serializers import JobSerializer, ApplicationSerializer, JobCreationSerializer, ApplicationCreationSerializer
from .models import Job, Application
from user.models import User, Webhook


def webhookUtil(obj, serialized_data):
    data = {'data': serialized_data}
    for valid_webhooks in Webhook.objects.filter(price_lower_limit__lte=obj.payment, price_upper_limit__gte=obj.payment, duration_lower_limit__lte=obj.duration, duration_upper_limit__gte=obj.duration):
        url = valid_webhooks.callback_url
        try:
            requests.post(url, data=serialized_data)
        except Exception as e:
            print("webhook error: ", str(e))


class jobsView(viewsets.GenericViewSet,
               mixins.ListModelMixin,
               mixins.RetrieveModelMixin):

    permission_classes = [permissions.IsAuthenticatedOrReadOnly, ]
    serializer_class = JobSerializer
    queryset = Job.objects.none()

    filter_backends = (filters.SearchFilter,
                       DjangoFilterBackend, filters.OrderingFilter)

    # filterset_fields = '__all__'
    ordering_fields = '__all__'
    search_fields = '__all__'

    def get_queryset(self):
        if not isinstance(self.request.user, User):
            # If the user is of type Anonymous User, then return all the items
            return Job.objects.all()
        # If the user is an authenticated user, then exclude all the jobs posted by the user
        return Job.objects.exclude(owner=self.request.user)


class myJobsView(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = JobSerializer
    queryset = Job.objects.none()

    filter_backends = (filters.SearchFilter,
                       DjangoFilterBackend, filters.OrderingFilter)

    # filterset_fields = '__all__'
    ordering_fields = '__all__'
    search_fields = '__all__'

    def get_queryset(self):
        return Job.objects.filter(owner=self.request.user)

    # Override Post method to restrict creation of Items for other users
    def create(self, request, format=None):
        """
        logic to ensure the owner of this object is the user making the current request
        :return: Save the incoming form data and return appropriate message(Incuding error messages)
        """

        # Forcefully set the the owner attribute in the data to current user
        # Note that this will also accept requests which do not have owner attribute set
        # which may be normally be considered as an invalid request
        data = request.data.copy()
        data['owner'] = request.user.id
        serialized_object = JobCreationSerializer(
            data=data)   # Pass the data to serializer
        # Check if the requested form data is valid
        if serialized_object.is_valid():
            job = serialized_object.save()
            webhookUtil(job, serialized_object.data)
            return Response(serialized_object.data, status=status.HTTP_201_CREATED)
        return Response(serialized_object.errors, status=status.HTTP_400_BAD_REQUEST)


class myApplicationViews(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = ApplicationSerializer
    queryset = Application.objects.none()

    filter_backends = (filters.SearchFilter,
                       DjangoFilterBackend, filters.OrderingFilter)

    # filterset_fields = '__all__'
    ordering_fields = '__all__'
    search_fields = '__all__'

    def get_queryset(self):
        return Application.objects.filter(applicant=self.request.user)

    # Override Post method to restrict creation of Items for other users
    def create(self, request, format=None):
        """
        logic to ensure the applicant of this object is the user making the current request
        :return: Save the incoming form data and return appropriate message(Incuding error messages)
        """

        # Forcefully set the the applicant attribute in the data to current user
        # Note that this will also accept requests which do not have applicant attribute set
        # which may be normally be considered as an invalid request
        data = request.data.copy()
        data['applicant'] = request.user.id
        data['status'] = 'Pending'
        print(data)
        serialized_object = ApplicationCreationSerializer(
            data=data)   # Pass the data to serializer
        # Check if the requested form data is valid
        if serialized_object.is_valid():
            print(serialized_object.validated_data)
            if serialized_object.validated_data['job'].owner == serialized_object.validated_data['applicant']:
                return Response({"error": "Cannot apply to self created jobs."}, status=status.HTTP_400_BAD_REQUEST)
            application = serialized_object.save()
            return Response(serialized_object.data, status=status.HTTP_201_CREATED)
        return Response(serialized_object.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post', ])
    def change_status(self, request):
        '''
        @params application_id: space separated application id's
        @params status: application status to change
        '''
        data = request.data
        field_errors = []
        if 'application_id' not in data:
            field_errors.append({'applciation_id': "Required field"})
        if 'status' not in data:
            field_errors.append({'status': "Required field"})
        if len(field_errors) > 0:
            return Response(field_errors, status=status.HTTP_400_BAD_REQUEST)

        applications = data['application_id'].split(',')

        has_perm = True
        not_found = False

        for application_id in applications:

            temp = []
            try:
                temp = Application.objects.filter(id=application_id)
            except:
                temp = []
            if len(temp) == 0:
                not_found = True
                break
            temp = temp[0]  # Get the object
            print(temp.job.owner.id, request.user.id)
            if temp.job.owner.id != request.user.id:
                has_perm = False
                break
        if not has_perm:
            return Response({'errors': 'You are not the owner of some/all job applications'}, status=status.HTTP_401_UNAUTHORIZED)
        if not_found:
            return Response({'errors': 'Some application ids are invalid'}, status=status.HTTP_400_BAD_REQUEST)

        app_objects = []

        for application_id in applications:
            temp = Application.objects.filter(id=application_id)
            temp = temp[0]
            temp.status = data['status']
            temp.save()
            app_objects.append(temp)

        return Response(ApplicationSerializer(app_objects, many=True).data, status=status.HTTP_200_OK)


class LearnSkillsView(GenericAPIView):
    serializer_class = SkillsSerializer

    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data)
        data = serializer.data
        self.queryset = Job.objects.all()
        serializer = self.serializer_class(self.queryset, many=True)
        skills = []
        for i in range(len(serializer.data)):
            skills.append(serializer.data[i]['skills_required'])
        application_skills = []
        candidates = []
        response = []
        applications = Application.objects.all()
        for i in range(len(applications)):
            if applications[i].learn_skills is True:
                skills_req = applications[i].job.skills_required
                if applications[i].job.skills_required == data['skills_required']:
                    application_skills.append(skills_req)
                    candidates.append(applications[i].applicant.email)
                else:
                    continue
        for i in range(len(application_skills)):
            learn_skills = {
                'required_skills': application_skills[i],
                'candidates': candidates[i]
            }
            response.append(learn_skills)
        return Response(response)
