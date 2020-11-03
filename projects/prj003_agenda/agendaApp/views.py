from django.db import models
from rest_framework.viewsets import ModelViewSet
from .models import Event, CustomUser
from .serializers import EventSerializer, CustomUserSerializer

# Create your views here.


class CustomUserViewSet(ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


class EventViewSet(ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
