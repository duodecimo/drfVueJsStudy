"""prj003_agenda URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path, re_path

from rest_framework.routers import DefaultRouter
from agendaApp.views import AppointmentViewSet, CustomUserViewSet

from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView


router = DefaultRouter()

router.register('appointments', AppointmentViewSet)

router.register('users', CustomUserViewSet)

urlpatterns = [
    path(r'admin/', admin.site.urls),
    re_path(r'api/', include(router.urls)),
    re_path(r'^rest-auth/', include('rest_auth.urls')),
    # path(r'rest-auth/', include('rest_auth.urls')),
    path(r'registration/', include('rest_auth.registration.urls')),
    re_path(r'', TemplateView.as_view(template_name='index.html')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
