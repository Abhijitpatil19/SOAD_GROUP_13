from django.contrib import admin

# local
from .models import key

# Register your models here.


@admin.register(key)
class keyAdmin(admin.ModelAdmin):
    list_display = ('api_key', 'quota_used', 'quota', 'date_of_creation', )
    ordering = ('api_key', 'quota_used', 'quota', 'date_of_creation', )
    search_fields = ('api_key', 'quota_used', 'quota', 'date_of_creation',)
