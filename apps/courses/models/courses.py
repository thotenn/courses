from django.db import models
from core.base import BasicModel


class CourseCategory(BasicModel):
    habilitado = models.BooleanField('Cursos de esta categoria habilitados', blank=False, null=False, default=True)

    class Meta:
        db_table = 'course_categories'
        managed = True
        verbose_name = 'Categoria'
        verbose_name_plural = 'Categorias'

    def __str__(self):
        return self.nombre


class Course(BasicModel):
    categoria = models.ForeignKey(CourseCategory, blank=False, null=False, on_delete=models.PROTECT, verbose_name='Categoria')
    habilitado = models.BooleanField('Cursos de esta categoria habilitados', blank=False, null=False, default=True)

    class Meta:
        db_table = 'course_courses'
        managed = True
        verbose_name = 'Curso'
        verbose_name_plural = 'Cursos'

    def __str__(self):
        return self.nombre
