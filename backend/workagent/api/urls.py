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

api_router = DefaultRouter()
api_router.register(r'jobs', views.jobsView, 'jobs_api_views')
api_router.register(r'users', views.userView, 'user_api_views')
api_router.register(r'ads', views.advertisementView, 'ads_api_views')
api_router.register(r'events', views.eventView, 'events_api_views')

urlpatterns = [
    path('', include(api_router.urls)),
    url('stats/', views.StatsView.as_view()),
]
