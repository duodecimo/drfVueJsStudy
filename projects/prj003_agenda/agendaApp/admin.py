from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Appointment, CustomUser


# Register your models here.

admin.site.register(Appointment)

admin.site.register(CustomUser, UserAdmin)
