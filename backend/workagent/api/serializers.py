# Django
from rest_framework import serializers

# Local
from user.models import User
from job.models import Job


class UserAPISerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'first_name',
                  'last_name', 'profile_photo', 'alternate_profile_url', 'country', 'state', 'description']


class JobAPISerializer(serializers.ModelSerializer):

    owner = serializers.SerializerMethodField()

    def get_owner(self, obj):
        return UserAPISerializer(obj.owner).data

    class Meta:
        model = Job
        exclude = []


class JobStatSerializer(serializers.Serializer):
    category = serializers.CharField(max_length=200)
    vacancy = serializers.IntegerField()
    average_duration = serializers.IntegerField()
    average_payment = serializers.IntegerField()
    most_demanding_skill = serializers.CharField(max_length=200)
