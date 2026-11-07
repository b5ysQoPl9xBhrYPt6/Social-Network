from django.urls import path
from .views import *

urlpatterns = [
    path('', AuthView.as_view(), name = 'auth'),
    path('send_reg/', RegistrationView.as_view(), name = 'send_reg'),
    path('send_verify_code/', VerifyCodeView.as_view(), name = 'send_verify_code'),
    path('send_login/', CustomLoginView.as_view(), name = 'send_login')
]