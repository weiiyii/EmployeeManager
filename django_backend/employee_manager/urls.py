from django.urls import path
from .views import EmployeeSkillListCombined, EmployeeDetail

urlpatterns = [
    path('', EmployeeSkillListCombined.as_view()),
    path('<str:pk>/', EmployeeDetail.as_view())
]