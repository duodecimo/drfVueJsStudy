from django.contrib import admin
from django.urls import include, path

from rest_framework.routers import DefaultRouter

from ionic01 import views

router = DefaultRouter()
router.register('persons', views.PersonViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))
]