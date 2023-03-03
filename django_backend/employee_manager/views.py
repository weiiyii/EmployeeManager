from rest_framework import status, generics, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Employee, Skill, User
from .serializers import EmployeeSerializer, SkillSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Create your views here.
class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class SkillList(generics.ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [IsAuthenticated]

class EmployeeList(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated]


class EmployeeSkillListCombined(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        employees = Employee.objects.all()
        skills = Skill.objects.all()

        context = {
            "request": request,
        }

        employees_serializer = EmployeeSerializer(employees, many=True, context=context)
        skills_serializer = SkillSerializer(skills, many=True, context=context)

        response = {'employees': employees_serializer.data,
                    'skills': skills_serializer.data}

        return Response(response)
    
    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EmployeeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated]
