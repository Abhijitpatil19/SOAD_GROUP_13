# Django
from rest_framework import serializers
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode

# Local
from .models import User

# User Read Only Serializer


class UserReadOnlySerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        read_only = '__all__'
        exclude = ['password', ]


# LoginSerializer
class LoginSerializer(serializers.ModelSerializer):

    # email = serializers.EmailField(max_length=255, min_length=3, write_only=True)
    password = serializers.CharField(
        max_length=255, min_length=1, write_only=True)
    username = serializers.EmailField()
    tokens = serializers.CharField(
        max_length=1024, min_length=1, read_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'tokens']
        read_only = ['tokens']

    def validate(self, attrs):
        username = attrs.get('username', '')
        password = attrs.get('password', '')

        user = auth.authenticate(email=username, password=password)

        if not user:
            raise AuthenticationFailed('Inavlid credentials.')

        if not user.is_active:
            raise AuthenticationFailed(
                'Account disabled. Contact us for further help.')

        return {
            'username': user.email,
            'tokens': user.tokens,
        }
