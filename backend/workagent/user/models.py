# Standard
import uuid

# Third-party
from phonenumber_field.modelfields import PhoneNumberField
from rest_framework_simplejwt.tokens import RefreshToken

# Django
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _

# Local Django
import user.manager as manager
from workagent.models import AbstractAddress, validate_pin
from api.models import key


class User(AbstractUser, AbstractAddress):

    """
    This is a custom user model which overrides the existing AbstractUser model provided by django
    """

    # Since username is not required, we can get rid of it.
    username = None

    # Make the email field unique, which is absent in parent class
    email = models.EmailField(_('Email'), unique=True, blank=True)

    # Insert a new phone number field to store contact information of the user
    phone = PhoneNumberField(
        _('Phone number'), blank=True, null=True)

    # Setup some settings for auth
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    # Attach the model manager here
    objects = manager.CustomUserManager()

    # Declare all the required variables here
    id = models.UUIDField(_('Id'), primary_key=True,
                          default=uuid.uuid4, editable=False)
    first_name = models.CharField(
        _('First Name'), max_length=100, blank=True)
    last_name = models.CharField(
        _('Last Name'), max_length=100, blank=True)
    gender = models.CharField(_('Gender'), max_length=20, blank=True)
    profile_photo = models.ImageField(
        _('Profile Photo'), null=True, blank=True, upload_to="profile_photo/")
    alternate_profile_url = models.CharField(
        _('Alternate Photo Url'), max_length=300, blank=True, null=True)
    description = models.CharField(
        _('Description'), max_length=2000, blank=True, null=True)

    # Most likely needed in the future
    phoneVerified = models.BooleanField(
        _('Phone Verified'), blank=True, default=False)
    prefLang = models.CharField(
        _('Preferred Language'), max_length=50, blank=True, default="en")
    registration_mode = models.CharField(
        _('registration_field'), max_length=20, blank=False, default="website")

    # Override this from abstract address model
    country = models.CharField(_('Country'), max_length=100, blank=True)
    state = models.CharField(_('State'), max_length=100, blank=True)
    dist = models.CharField(_('District'), max_length=100, blank=True)
    subDist = models.CharField(_('Sub District'), max_length=100, blank=True)
    villageCity = models.CharField(
        _('Village City'), max_length=100, blank=True)
    address = models.CharField(_('Address'), max_length=300, blank=True)
    pin = models.CharField(_('Pin'), max_length=10,
                           blank=True, validators=[validate_pin, ])
    contact = PhoneNumberField(_('Contact Number'), blank=True, null=True)
    apikey = models.ForeignKey(
        key, on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return self.email

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        }


class Webhook(models.Model):

    callback_url = models.CharField(
        _('Callback Url'), max_length=200, blank=False, null=False)
    price_upper_limit = models.IntegerField(
        _('Price Upper Limit'), blank=True, default=1e20)
    price_lower_limit = models.IntegerField(
        _('Price Lower Limit'), blank=True, default=0)
    duration_upper_limit = models.IntegerField(
        _('Duration Upper Limit'), blank=True, default=1e10)
    duration_lower_limit = models.IntegerField(
        _('Duration Lower Limit'), blank=True, default=0)

    class Meta:
        verbose_name = 'Webhook'
        verbose_name_plural = 'Webhooks'
