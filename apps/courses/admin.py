from django.contrib import admin

from .models.courses import CourseCategory, Course
from .models.steps import Step, StepCourse
from .models.students import Student, StudentUser
from .models.inscriptions import Inscription, Desinscription


admin.site.register(CourseCategory)
admin.site.register(Course)
admin.site.register(Step)
admin.site.register(StepCourse)
admin.site.register(Student)
admin.site.register(StudentUser)
admin.site.register(Inscription)
admin.site.register(Desinscription)
