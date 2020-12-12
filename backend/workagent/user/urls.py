from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenRefreshView, TokenObtainPairView)

from django.views.generic import TemplateView

# Local
from .views import LoginAPIView


urlpatterns = [
    path('login/', LoginAPIView.as_view(), name="login"),
    path('token/refresh/', TokenRefreshView.as_view(), name="token-refresh"),
    path('', include('rest_registration.api.urls')),

    # Swagger
    path('swagger-ui/', TemplateView.as_view(
        template_name='swagger-ui.html',
        extra_context={'schema_url': 'openapi-schema'}
    ), name='swagger-ui'),
]
