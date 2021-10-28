from django.urls import path, include

urlpatterns = [
    path('courses/', include('apps.courses.urlsf.courses')),
]
