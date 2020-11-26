from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser


# Create your models here.
class CustomUser(AbstractUser):
    is_normal = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.username


class Appointment(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    begins_at_date = models.DateField()
    begins_at_time = models.TimeField()
    ends_at_date = models.DateField()
    ends_at_time = models.TimeField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE,
                             related_name="appointments")
