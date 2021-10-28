from django.db import models
from core.base import BaseModel, BasicModel
from .courses import Course


class Step(BasicModel):
    class Meta:
        db_table = 'course_steps'
        managed = True
        verbose_name = 'Paso'
        verbose_name_plural = 'Pasos'

    def __str__(self):
        return self.nombre


class StepCourse(BaseModel):
    course = models.ForeignKey(Course, blank=False, null=False, on_delete=models.PROTECT, verbose_name='Curso')
    step = models.ForeignKey(Step, blank=False, null=False, on_delete=models.PROTECT, verbose_name='Paso')

    class Meta:
        db_table = 'course_steps_courses'
        managed = True
        verbose_name = 'Curso - Paso'
        verbose_name_plural = 'Cursos - Pasos'
        constraints = [
            models.UniqueConstraint(fields=['course', 'step'], condition=models.Q(deleted__isnull=True), name='uk_course_step')
        ]

    def __str__(self):
        return self.course.nombre + ' - ' + self.step.nombre