from django.db import models
from rest_framework.viewsets import ModelViewSet
from .models import Person
from .serializers import PersonSerializer
from rest_framework.permissions import IsAuthenticated

# Create your views here.


class PersonViewSet(ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    permission_classes = [IsAuthenticated]