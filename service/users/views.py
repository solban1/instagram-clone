from django.shortcuts import render
from django.contrib.auth import authenticate, login
from rest_framework import response, status, viewsets
from rest_framework.permissions import AllowAny

from .models import User
from .serializers import UserSerializer

# Create your views here.
class AuthViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

    def signup(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid()
        user = serializer.save()
        login(request, user)
        return response.Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )