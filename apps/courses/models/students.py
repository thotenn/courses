from django.db import models
from core.base import BaseModel


class Student(BaseModel):
    identificador = models.CharField('Identificador', blank=False, null=False, unique=True, max_length=50)
    nombre = models.CharField('Nombre', blank=False, null=False, max_length=250)
    apellido = models.CharField('Apellido', blank=False, null=False, max_length=250)
    contacto = models.CharField('Contacto', blank=False, null=False, max_length=250)
    correo = models.CharField('Correo', blank=True, null=True, max_length=250)

    class Meta:
        db_table = 'course_students'
        managed = True
        verbose_name = 'Student'
        verbose_name_plural = 'Students'
    def __str__(self) -> str:
        return super().__str__()


class StudentUser(BaseModel):
    student = models.ForeignKey(Student, blank=False, null=False, on_delete=models.PROTECT, verbose_name='Estudiante', unique=True)
    username = models.CharField('Usuario', blank=False, null=False, max_length=250)
    password = models.CharField('Pass', blank=False, null=False, max_length=550)

    class Meta:
        db_table = 'course_students_users'
        managed = True
        verbose_name = 'Student-User'
        verbose_name_plural = 'Students-User'
    def __str__(self) -> str:
        return self.student.apellido + ' ' +  self.student.nombre
