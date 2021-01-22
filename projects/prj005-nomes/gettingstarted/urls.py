from django.contrib import admin
from django.urls import include, path, re_path

from rest_framework.routers import DefaultRouter

from hello import views

router = DefaultRouter()
router.register('persons', views.PersonViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    re_path(r'^auth/', include('drf_social_oauth2.urls', namespace='drf')),
]