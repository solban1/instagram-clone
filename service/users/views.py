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
        if not serializer.is_valid():
            return response.Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST,
            )
        user = serializer.save()
        login(request, user)
        return response.Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )
    
    def signin(self, request):
        user = authenticate(email=request.data['email'], password=request.data['password'])
        serializer = self.get_serializer(user)
        if user is None:
            return response.Response(
                {
                    'message': '이메일 또는 비밀번호를 확인해 주세요.',
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        else:
            login(request, user)
            return response.Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )

        return response.Response(
            status=status.HTTP_501_NOT_IMPLEMENTED
        )