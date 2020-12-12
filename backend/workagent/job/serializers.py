# Django
from rest_framework import serializers

# Local
from .models import Job, Application, Advertisement, Event
from user.models import User
from user.serializers import UserReadOnlySerializer


class JobSerializer(serializers.ModelSerializer):

    total_accepted = serializers.SerializerMethodField()
    total_submitted = serializers.SerializerMethodField()
    owner = serializers.SerializerMethodField()

    def get_owner(self, obj):
        return UserReadOnlySerializer(obj.owner).data

    def get_total_accepted(self, obj):
        return Application.objects.filter(job=obj, status='Accepted').count()

    def get_total_submitted(self, obj):
        return Application.objects.filter(job=obj).count()

    class Meta:
        model = Job
        exclude = []
        read_only_fields = ('total_accepted', 'owner',)


class JobCreationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Job
        exclude = []


class ApplicationSerializer(serializers.ModelSerializer):

    job = serializers.SerializerMethodField()
    applicant = serializers.SerializerMethodField()

    def get_job(self, obj):
        return JobSerializer(obj.job).data

    def get_applicant(self, obj):
        return UserReadOnlySerializer(obj.applicant).data

    class Meta:
        model = Application
        exclude = []
        read_only_fields = ('applicant', 'job', 'status')


class ApplicationCreationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Application
        exclude = []


class AdvertisementSerializer(serializers.ModelSerializer):

    class Meta:
        model = Advertisement
        exclude = []


class EventSerialzier(serializers.ModelSerializer):

    class Meta:
        model = Event
        exclude = []


class JobsSerializier():

    overall = serializers.SerializerMethodField()

    def get_overall(self, obj):
        pass

    class Meta:
        model = Job
        exclude = '__all__'


class SkillsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Job
        fields = ['skills_required']
