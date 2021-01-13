from django.db import models
from django.conf import settings

# Create your models here.
class Person(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)