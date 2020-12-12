# Standard
import uuid

# Third-party

# Django
from django.core.exceptions import ValidationError
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _

# Local Django
from user.models import User
from workagent.models import AbstractAddress, AbstractMultiplePictures


def check_negative_value(value):
    if value < 0:
        raise ValidationError(
            _('This field cannot be negative.'),
            params={'value': value}
        )


class Job(AbstractAddress):

    PAY_UNITS = [
        ('Minute', 'Minute'),
        ('Hour', 'Hour'),
        ('Day', 'Day'),
        ('Month', 'Month'),
        ('Year', 'Year'),
        ('TASK', 'TASK'),
    ]

    EMP_TYPE_CHOICES = [
        ('People', 'People'),
        ('Man', 'Man'),
        ('Woman', 'Woman'),
    ]

    id = models.UUIDField(_('Id'), primary_key=True,
                          default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(_('Title'), max_length=500, blank=False)
    date_of_creation = models.DateTimeField(
        _('Posted on'), auto_now_add=True, editable=False)
    date_of_expiry = models.DateTimeField(_('Expires on'), blank=False)
    vacancy_count = models.IntegerField(
        _('Vacancies'), validators=[check_negative_value, ])
    payment = models.IntegerField(_('Payment'), validators=[
                                  check_negative_value, ])
    payment_unit = models.CharField(
        _('Payment Unit'), choices=PAY_UNITS, max_length=64, null=True, blank=True)
    duration = models.IntegerField(_('Job Duration'), validators=[
                                   check_negative_value, ])
    duration_unit = models.CharField(
        _('Payment Unit'), choices=PAY_UNITS, max_length=64, null=True, blank=True)
    is_permanent = models.BooleanField(_('Is Permanent'), default=False)
    description = models.CharField(
        _('Description'), max_length=5000, blank=True, null=True)
    logo_image = models.ImageField(
        _('Job logo'), null=True, blank=True, upload_to="jobs/")
    skills_required = models.CharField(
        _('Skills Required'), max_length=300, blank=True, null=True)
    other_details = models.CharField(
        _('Other Details'), max_length=1000, blank=True, null=True)
    accomodation_available = models.BooleanField(
        _("Is Accomodation Available"), default=False)
    is_negotiable = models.BooleanField(_('Is Negotiable'), default=False)
    emp_type = models.CharField(
        _('Employment Type'), choices=EMP_TYPE_CHOICES, max_length=64, null=True, blank=True)
    job_sector = models.CharField(
        _('Job Sector'), max_length=200, null=True, blank=True)


class Application(models.Model):

    JOB_STATUS_CHOICES = [
        ('Rejected', 'Rejected'),
        ('Pending', 'Pending'),
        ('Accepted', 'Accepted'),
    ]

    id = models.UUIDField(_('Id'), primary_key=True,
                          default=uuid.uuid4, editable=False)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    applicant = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(
        _('Application Status'), choices=JOB_STATUS_CHOICES, max_length=64, null=True, blank=True)
    creation_time = models.DateTimeField(_('Created at'), auto_now_add=True)
    cover_letter = models.FileField(
        _('Cover Letter'), storage='jobs/application/', blank=True)


class Advertisement(models.Model):
    id = models.UUIDField(_('ID'), primary_key=True,
                          default=uuid.uuid4, editable=False)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    banner = models.ImageField(
        _('Banner'), null=True, blank=True, upload_to="ads/")
    priority = models.IntegerField(
        _('Priority'), default=0, null=True, blank=True)


class Event(models.Model):
    id = models.UUIDField(_('ID'), primary_key=True,
                          default=uuid.uuid4, editable=False)
    name = models.CharField(_('Name'), max_length=500, blank=False, null=True)
    category = models.CharField(
        _('Category'), max_length=100, blank=True, null=True)
    sub_category = models.CharField(
        _('Sub-Category'), max_length=100, blank=True, null=True)
    start_time = models.DateTimeField(_('Start Time'), blank=False)
    end_time = models.DateTimeField(_('End Time'), blank=False)
