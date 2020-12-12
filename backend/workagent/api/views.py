# Django
from django.shortcuts import render
from rest_framework import permissions, viewsets, filters, generics, mixins, status
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Count, Sum, Avg
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

# Local
from job.models import Job, Advertisement, Event
from user.models import User, Webhook
from job.serializers import JobSerializer, AdvertisementSerializer, EventSerialzier
from .models import key
from .serializers import UserAPISerializer, JobStatSerializer, JobAPISerializer


class APIAccessPermission(permissions.BasePermission):
    message = "Invalid API_KEY"

    def has_permission(self, request, view):
        if 'apikey' in request.query_params:
            if key.objects.filter(api_key=request.query_params['apikey']).count() == 0:
                return False
            apikey = request.query_params['apikey']
            user_key = key.objects.get(api_key=apikey)
            rem = user_key.quota - user_key.quota_used
            if rem > 0:
                user_key.quota_used += 1
                user_key.save()
                return True
            self.message = "Quota Exhausted"
            return False
        return False


class jobsView(viewsets.GenericViewSet,
               mixins.ListModelMixin,
               mixins.RetrieveModelMixin):

    permission_classes = [APIAccessPermission, ]
    serializer_class = JobAPISerializer
    queryset = Job.objects.all()

    filter_backends = (filters.SearchFilter,
                       DjangoFilterBackend, filters.OrderingFilter)

    filterset_fields = {
        'payment': ['gte', 'lte'],
        'duration': ['gte', 'lte'],
        'country': ['exact', 'contains'],
        'state': ['exact', 'contains'],
        'vacancy_count': ['gte', 'lte'],
        'skills_required': ['exact', 'contains'],
        'job_sector': ['exact', 'contains'],
    }

    # filterset_fields = ['country', 'state', 'payment',
    #                     'duration', 'job_sector', 'title', 'vacancy_count', 'skills_required']
    ordering_fields = ['country', 'state', 'payment',
                       'duration', 'job_sector', 'title', 'vacancy_count', 'skills_required']
    search_fields = ['country', 'state', 'payment',
                     'duration', 'job_sector', 'title', 'vacancy_count', 'skills_required']


class userView(viewsets.GenericViewSet,
               mixins.ListModelMixin,
               mixins.RetrieveModelMixin):

    permission_classes = [APIAccessPermission, ]
    serializer_class = UserAPISerializer
    queryset = User.objects.all()

    filter_backends = (filters.SearchFilter,
                       DjangoFilterBackend, filters.OrderingFilter)

    filterset_fields = ['first_name', 'last_name', 'country',
                        'description', 'state', 'lat', 'long', 'contact']
    ordering_fields = ['first_name', 'last_name', 'country',
                       'description', 'state', 'lat', 'long', 'contact']
    search_fields = ['first_name', 'last_name', 'country',
                     'description', 'state', 'lat', 'long', 'contact']


class eventView(viewsets.GenericViewSet,
                mixins.ListModelMixin,
                mixins.RetrieveModelMixin):

    permission_classes = [APIAccessPermission, ]
    serializer_class = EventSerialzier
    queryset = Event.objects.all()

    filter_backends = (filters.SearchFilter,
                       DjangoFilterBackend, filters.OrderingFilter)

    filterset_fields = '__all__'
    ordering_fields = '__all__'
    search_fields = '__all__'


class advertisementView(viewsets.GenericViewSet,
                        mixins.ListModelMixin,
                        mixins.RetrieveModelMixin):

    permission_classes = [APIAccessPermission, ]
    serializer_class = AdvertisementSerializer
    queryset = Advertisement.objects.all()

    filter_backends = (filters.SearchFilter,
                       DjangoFilterBackend, filters.OrderingFilter)

    # filterset_fields = '__all__'
    ordering_fields = '__all__'
    search_fields = '__all__'


# class statsView(generics.GenericAPIView):

class JobStat:
    def __init__(self, category, vacancy, average_payment, average_duration, most_demanding_skill):
        self.category = category
        self.vacancy = vacancy
        self.average_payment = average_payment
        self.average_duration = average_duration
        self.most_demanding_skill = most_demanding_skill


def get_demanding_skill(job_sector):
    return Job.objects.filter(job_sector=job_sector).values('skills_required').annotate(c=Count('skills_required')).order_by('-c')[0]['skills_required']


def get_job_sector_stats(job_sector):
    vacancy = Job.objects.filter(
        job_sector=job_sector).aggregate(Sum('vacancy_count'))['vacancy_count__sum']
    average_payment = Job.objects.filter(
        job_sector=job_sector).aggregate(Avg('payment'))['payment__avg']
    average_duration = Job.objects.filter(
        job_sector=job_sector).aggregate(Avg('duration'))['duration__avg']
    most_demanding_skill = get_demanding_skill(job_sector)
    return JobStat(category=job_sector, vacancy=vacancy, average_payment=average_payment, average_duration=average_duration, most_demanding_skill=most_demanding_skill)


def get_general_job_sector_stats():
    vacancy = Job.objects.all().aggregate(
        Sum('vacancy_count'))['vacancy_count__sum']
    average_payment = Job.objects.all().aggregate(
        Avg('payment'))['payment__avg']
    average_duration = Job.objects.all().aggregate(
        Avg('duration'))['duration__avg']
    most_demanding_skill = Job.objects.values('skills_required').annotate(
        c=Count('skills_required')).order_by('-c')[0]['skills_required']
    return JobStat(category="all", vacancy=vacancy, average_payment=average_payment, average_duration=average_duration, most_demanding_skill=most_demanding_skill)


def get_user_diversity():
    data = dict()
    data['all'] = dict()
    data['all']['users'] = User.objects.all().count()
    data['all']['data'] = dict()
    for i in User.objects.values('country').distinct():
        data['all']['data'][i['country']] = dict()
        data['all']['data'][i['country']]['users'] = User.objects.filter(
            country=i['country']).count()
        data['all']['data'][i['country']]['data'] = dict()
        for j in User.objects.filter(country=i['country']).values('state').distinct():
            if j['state'] != '' and j['state']:
                data['all']['data'][i['country']]['data'][j['state']] = dict()
                data['all']['data'][i['country']]['data'][j['state']]['users'] = User.objects.filter(
                    state=j['state']).count()
    return data


class StatsView(APIView):

    renderer_classes = [JSONRenderer]
    permission_classes = [APIAccessPermission, ]

    def get(self, request, format=None):
        user_stats = get_user_diversity()
        job_data = [get_job_sector_stats(
            i['job_sector']) for i in Job.objects.values('job_sector').distinct()]
        job_data.append(get_general_job_sector_stats())
        job_data.reverse()
        serialized_data = JobStatSerializer(job_data, many=True)
        data = {'User_Stats': user_stats, 'Job_Stats': serialized_data.data}
        return Response(data, status=status.HTTP_200_OK)
