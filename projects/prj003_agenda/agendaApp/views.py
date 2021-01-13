from django.db import models
from rest_framework.viewsets import ModelViewSet
from .models import Appointment, CustomUser
from .serializers import AppointmentSerializer, CustomUserSerializer

# Create your views here.


class AppointmentViewSet(ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    def perform_create(self, serializer):
        print("serializer: ", serializer)
        serializer.save(user=self.request.user)


class CustomUserViewSet(ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
