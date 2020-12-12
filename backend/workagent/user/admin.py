from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserChangeForm, CustomUserCreationForm
from . import models
from workagent.models import AbstractAddress


@admin.register(models.User)
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = models.User

    list_display = ('email', 'is_staff', 'is_active',)
    list_filter = ('email', 'is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('email', 'phone',)}),
        ('Permissions', {'fields': ('is_staff', 'is_active',)}),
        ('Profile', {'fields': ('first_name', 'last_name', 'description')}),
        ('Address', {'fields': [
         field.name for field in AbstractAddress._meta.get_fields()]})
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide', ),
            'fields': ('email', 'password1', 'password2', 'phone', 'is_staff', 'is_active', 'country', 'state')
        }),
    )

    search_fields = ('email', 'phone',)
    ordering = ('email',)


@admin.register(models.Webhook)
class webhookAdmin(admin.ModelAdmin):
    list_display = [field.name for field in models.Webhook._meta.get_fields()]
