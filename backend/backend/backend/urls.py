from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('detect/', views.detect_objects, name='detect_objects'),
    path('upload/', views.upload_image, name='upload_image'),
]
