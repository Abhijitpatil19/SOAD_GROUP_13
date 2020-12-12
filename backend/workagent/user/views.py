# Django
from rest_framework import generics, status, views
from rest_framework.response import Response

# Local
from .serializers import LoginSerializer

# LoginAPIView


class LoginAPIView(generics.GenericAPIView):

    serializer_class = LoginSerializer

    def post(self, request):

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
