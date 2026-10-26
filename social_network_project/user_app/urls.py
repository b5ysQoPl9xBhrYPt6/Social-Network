from django.urls import path
from .views import *

urlpatterns = [
    path('', AuthView.as_view(), name = 'auth')
]