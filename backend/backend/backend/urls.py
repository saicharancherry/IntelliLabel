from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('detect/', views.detect_objects, name='detect_objects'),
    path('upload/', views.upload_image, name='upload_image'),
    # path('labels/create/', views.create_label, name='label-create'),
    path('api/save_labels/', views.save_labels, name='save_labels'),
    path('api/annotations/', views.save_annotations, name='save_annotations'),
    path('api/get_all_labels/', views.get_all_label, name='get_all_label'),


    

]
