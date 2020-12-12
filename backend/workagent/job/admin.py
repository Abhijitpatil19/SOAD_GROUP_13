from django.contrib import admin

# local
from .models import Job, Application, Advertisement, Event

# Register your models here.


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('id', 'owner', 'title', 'date_of_creation', )
    ordering = ('id', 'owner', 'title', 'date_of_creation', )
    search_fields = ('id', 'owner', 'title', 'date_of_creation', )


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('id', 'job', 'applicant', 'status', 'creation_time',)
    ordering = ('id', 'job', 'applicant', 'status', 'creation_time', )
    search_fields = ('id', 'job', 'applicant', 'status', 'creation_time',)


@admin.register(Event)
class EventsAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category', 'sub_category',
                    'start_time', 'end_time',)


@admin.register(Advertisement)
class AdsAdmin(admin.ModelAdmin):
    list_display = ('job', 'banner', 'priority',)
