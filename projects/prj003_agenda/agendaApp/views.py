from django.db import models
from rest_framework.viewsets import ModelViewSet
from .models import Appointment, CustomUser
from .serializers import AppointmentSerializer, CustomUserSerializer

# Create your views here.


class AppointmentViewSet(ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer


class CustomUserViewSet(ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
