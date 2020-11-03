from rest_framework import serializers
from .models import Appointment, CustomUser


class AppointmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Appointment
        exclude = ["updated_at"]


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'
