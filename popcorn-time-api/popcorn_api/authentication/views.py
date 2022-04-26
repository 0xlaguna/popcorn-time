from django.contrib.auth.models import User
from rest_framework import permissions
from rest_framework.mixins import ListModelMixin
from rest_framework import generics
from rest_framework.permissions import AllowAny

from .serializers import RegisterSerializer, UserSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer



class UserListView(ListModelMixin, generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self, request):
        return self.queryset.filter(user=self.request.user)