from django.conf import settings
from django.contrib import admin
from django.urls import path, re_path, include
from django.conf.urls import url
from django.conf.urls.static import static
from public.views import index

from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + [
    path('admin/', admin.site.urls),

    url(r'^api-auth/', include('rest_framework.urls')),
    path('auth-token/', obtain_auth_token),

    path('api/app/', include('apps.courses.urls')),

    re_path('', index),
    re_path(r'^.*/', index),
]
