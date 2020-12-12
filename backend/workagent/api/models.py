# Standard
import secrets
import uuid

# Django
from django.db import models
from django.utils.translation import ugettext_lazy as _

# Create your models here.


class key(models.Model):

    api_key = models.UUIDField(_('API Key'), primary_key=True,
                               default=uuid.uuid4, editable=False)
    date_of_creation = models.DateTimeField(
        _('Posted on'), auto_now_add=True, editable=False)
    quota_used = models.IntegerField(
        _('Quota Used'), primary_key=False, default=0)
    quota = models.IntegerField(
        _('Quota'), primary_key=False, default=1000)

    class Meta:
        verbose_name = "Key"
        verbose_name_plural = "Keys"
