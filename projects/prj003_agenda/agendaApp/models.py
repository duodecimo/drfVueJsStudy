from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class CustomUser(AbstractUser):
    is_normal = models.BooleanField(default=False)


class Event(models.Model):
    title: models.CharField(max_length=200)
    description: models.TextField(blank=True, null=True)
    user: models.ForeignKey(CustomUser, on_delete=models.CASCADE)
