from django.urls import path
from .views import velov_data, parking_data

urlpatterns = [
    path("velov/", velov_data),
    path("parking/", parking_data),
]
