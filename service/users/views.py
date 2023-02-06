from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.core.exceptions import ValidationError
from rest_framework import status, viewsets
from rest_framework.response import Response
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
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST,
            )
        user = serializer.save()
        login(request, user)
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )

    def signin(self, request):
        user = authenticate(email=request.data['email'], password=request.data['password'])
        serializer = self.get_serializer(user)
        if user is None:
            return Response(
                {
                    'message': '이메일 또는 비밀번호를 확인해 주세요.',
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        else:
            login(request, user)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )

        return Response(
            status=status.HTTP_501_NOT_IMPLEMENTED
        )

    def create_authcode(self, request):
        email = request.data['email']
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist as exception:
            return Response(
                {
                    'message': str(exception),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            authcode = user.create_authcode()
        except ValidationError as exception:
            return Response(
                {
                    'message': str(exception),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(
            {
                "authcode": authcode,
            },
            status=status.HTTP_200_OK,
        )

    def check_authcode(self, request):
        email = request.data.get('email', None)
        if email is None:
            return Response(
                {
                    'message': "이메일을 입력해 주세요.",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        authcode = request.data.get('authcode', None)
        if authcode is None:
            return Response(
                {
                    'message': '인증코드를 입력해 주세요.',
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist as exception:
            return Response(
                {
                    'message': str(exception),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            result = user.check_authcode(authcode)
        except ValidationError as exception:
            return Response(
                {
                    'message': str(exception)
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if result:
            return Response(
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {
                    'message': '잘못된 인증코드입니다.',
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

    def change_lostpassword(self, request):
        email = request.data.get('email', None)
        if email is None:
            return Response(
                {
                    'message': "존재하지 않는 이메일입니다.",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        password = request.data.get('password', None)
        if password is None:
            return Response(
                {
                    'message': '비밀번호를 입력해 주세요.',
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist as exception:
            return Response(
                {
                    'message': str(exception),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        user.change_lostpassword(password)
        return Response(
            status=status.HTTP_200_OK
        )