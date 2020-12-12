# Django
from django.urls import path, include
from django.conf.urls import url
from django.contrib.auth import urls
from rest_framework.routers import DefaultRouter
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings

# Local
from . import views

general_router = DefaultRouter()
general_router.register(r'', views.jobsView, 'jobs_views')

my_router = DefaultRouter()
my_router.register(r'application', views.myApplicationViews,
                   'my_application_views')
my_router.register(r'', views.myJobsView, 'my_jobs_views')


urlpatterns = [
    path('my/', include(my_router.urls)),
    path('', include(general_router.urls)),
]
