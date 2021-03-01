from django.urls import path
from .views import index

urlpatterns = [
    path('menu/<str:Restname>/', index, name='home')
]
