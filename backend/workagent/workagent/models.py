# Standard
import re

# Django
from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _

# Third-party
from phonenumber_field.modelfields import PhoneNumberField


def validate_pin(value):
    pattern = "^[1-9]{1}[0-9]{2}[\s]{0,1}[0-9]{3}$"
    pattern = re.compile(pattern)
    if pattern.match(value) is None:
        raise ValidationError(
            _('Invalid pincode'),
            params={'value': value}
        )


class AbstractAddress(models.Model):
    country = models.CharField(_('Country'), max_length=100, blank=False)
    state = models.CharField(_('State'), max_length=100, blank=False)
    dist = models.CharField(_('District'), max_length=100, blank=False)
    subDist = models.CharField(_('Sub District'), max_length=100, blank=False)
    villageCity = models.CharField(
        _('Village City'), max_length=100, blank=True)
    address = models.CharField(_('Address'), max_length=300, blank=False)
    pin = models.CharField(_('Pin'), max_length=10,
                           blank=False, validators=[validate_pin])
    contact = PhoneNumberField(_('Contact Number'), blank=False)
    lat = models.CharField(_('Latitude'), max_length=50, blank=True, null=True)
    long = models.CharField(
        _('Longitude'), max_length=50, blank=True, null=True)

    class Meta:
        abstract = True


class AbstractMultiplePictures(models.Model):

    image = models.ImageField(
        _('Image'), upload_to='images/', null=True, blank=True)

    class Meta:
        abstract = True
