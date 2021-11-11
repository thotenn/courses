import datetime
from django.db import models
from core.base import BaseModel
from .courses import Course
from .students import Student


class Inscription(BaseModel):
    student = models.ForeignKey(Student, blank=False, null=False, on_delete=models.PROTECT, verbose_name='Estudiante')
    course = models.ForeignKey(Course, blank=False, null=False, on_delete=models.PROTECT, verbose_name='Curso')
    fechainscripcion = models.DateField('Fecha de Inscripcion', blank=False, null=False, default=datetime.date.today)
    enrolled = models.BooleanField('Inscripto', null=False, blank=False, default=False)
    steps = models.TextField('Steps', blank=False, null=False)

    class Meta:
        db_table = 'course_inscriptions'
        managed = True
        verbose_name = 'Inscripcion'
        verbose_name_plural = 'Inscripcions'
        constraints = [
            models.UniqueConstraint(fields=['course', 'student'], condition=models.Q(deleted__isnull=True), name='uk_ins_course_student')
        ]
    def __str__(self) -> str:
        return self.course.nombre + ' - ' +  self.student.__str__()


class Desinscription(BaseModel):
    student = models.ForeignKey(Student, blank=False, null=False, on_delete=models.PROTECT, verbose_name='Estudiante')
    course = models.ForeignKey(Course, blank=False, null=False, on_delete=models.PROTECT, verbose_name='Curso')
    fechabaja = models.DateField('Fecha de Baja', blank=False, null=False, default=datetime.date.today)
    motivo = models.TextField('Motivo', blank=False, null=False)

    class Meta:
        db_table = 'course_desinscriptions'
        managed = True
        verbose_name = 'Desinscripcion'
        verbose_name_plural = 'Desinscripciones'
        constraints = [
            models.UniqueConstraint(fields=['course', 'student'], condition=models.Q(deleted__isnull=True), name='uk_desins_course_student')
        ]
    def __str__(self) -> str:
        return self.course.nombre + ' - ' +  self.student.__str__()
