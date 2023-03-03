from rest_framework import serializers
from .models import Employee, Skill, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only':True, 'required':True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'skill_name', 'skill_description']

class EmployeeSerializer(serializers.ModelSerializer):
    skill_level = serializers.SlugRelatedField(
        queryset=Skill.objects.all(),
        slug_field='skill_name'
     )

    class Meta:
        model = Employee
        fields = ['id', 'first_name', 'last_name', 'date_of_birth', 'email', 'skill_level', 'active', 'age']

