from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import User_registration, User_login, User_search, UserDetailView

from .views import UserView

urlpatterns = [
    path('users', User_registration, name='User-registration'),
    path('users/login', User_login, name='User-login'),
    path('user', UserView.as_view({'get': 'getUser'})),
    path('user/<str:username>/', UserDetailView.as_view()),
    path('search/', User_search, name='User-search') 
]
