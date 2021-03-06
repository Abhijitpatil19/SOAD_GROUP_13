from django import forms
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from .models import User


class CustomUserCreationForm(UserCreationForm):

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'phone')


class CustomUserChangeForm(UserChangeForm):

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'phone')
