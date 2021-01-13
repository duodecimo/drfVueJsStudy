from django.contrib import admin
from django.urls import include, path, re_path

from rest_framework.routers import DefaultRouter
from ionic01.views import PersonViewSet

from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView


router = DefaultRouter()

router.register('persons', PersonViewSet)

urlpatterns = [
    path(r'admin/', admin.site.urls),
    re_path(r'api/', include(router.urls)),
    re_path(r'', TemplateView.as_view(template_name='index.html')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
