"""django_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
# from rest_framework_simplejwt.views import TokenObtainPairView
from employee_manager.views import UserView, MyTokenObtainPairView
# from rest_framework.routers import DefaultRouter

# router = DefaultRouter()
# router.register('authenticate', UserView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('authenticate/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('authenticate/', UserView.as_view()),
    # path('', include(router.urls)),
    path('employees/', include('employee_manager.urls'))
]
