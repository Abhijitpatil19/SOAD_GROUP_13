from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _
from django.db import models, transaction

# Local
from api.models import key


class CustomUserManager(BaseUserManager):

    '''
    logic for our Custom User Manager.
    Note: These managers have to be registered in the models. Here we have linked it to the variable "objects"
    i.e. You can use these managers as "Model.objects.manager_method()"
    e.g. CustomUser.objects.create_user() can be used in shell/code directly
    '''

    def create_user(self, email, password, **extra):
        '''
        Method to create a new Custom User.
        :param email: User email. Also used as primary key for our model
        :param password: User password
        :param extra: A Dictionary instance containing all the other user information such first name, last name etc
        :return: A new Custom User object
        '''

        # Some important standard validation checks
        if not email:
            raise ValueError(_('Phone number cannot be empty'))
        extra.setdefault('is_active', True)
        user = self.model(email=email, **extra)
        apikey = key.objects.create()
        user.apikey = apikey
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra):
        '''
        Method to create a new super user. This will set some admin booleans and follow the previous create user method normally
        '''

        extra.setdefault('is_staff', True)
        extra.setdefault('is_active', True)
        extra.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra)
