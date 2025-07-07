from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate
from .models import CustomUser
from .serializers import (
    SignupSerializer,
    UserSerializer,
)


class SignupView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = SignupSerializer
    permission_classes = [permissions.AllowAny]


class MeView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class AdminUserListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = CustomUser.objects.all().order_by('-created_at')


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        
        if not username or not password:
            return Response({
                'detail': 'Please provide both username and password.'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if user exists
        try:
            user = CustomUser.objects.get(username=username)
        except CustomUser.DoesNotExist:
            return Response({
                'detail': 'No account found with that username. Please check your username or sign up for a new account.'
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        # Check if password is correct
        if not user.check_password(password):
            return Response({
                'detail': 'Incorrect password. Please try again.'
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        # If we get here, credentials are valid, proceed with JWT token generation
        return super().post(request, *args, **kwargs)