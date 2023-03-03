from django.contrib import admin
from .models import Employee, Skill, User
# from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

# Register your models here.
# admin.site.register(Employee)
# admin.site.register(Skill)

# @admin.register(User)
# class UserAdmin(admin.ModelAdmin):
#     list_display = ('username', 'password')

admin.site.register(User, UserAdmin)

@admin.register(Employee)
class EmployeeAmin(admin.ModelAdmin):
    list_filter = ('first_name', 'email')
    list_display = ('first_name', 'email', 'date_of_birth', 'age', 'active', 'skill_level')

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('skill_name', 'skill_description')