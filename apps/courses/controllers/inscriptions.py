from ..models.inscriptions import Inscription
from ..models.students import Student
from ..models.courses import Course
from ..models.inscriptions import Inscription

class InscriptionsController:
    @staticmethod
    def is_enrolled(identificador, course_pk):
        student = Student.objects.filter(identificador=identificador).exists()
        course = Course.objects.filter(pk=course_pk).exists()
        if not student or not course:
            return False
        inscrip = Inscription.objects.filter(course__pk=course_pk, student__identificador=identificador).exists()
        return inscrip

    @staticmethod
    def get_inscription_data(identificador, course_pk):
        student_exist = Student.objects.filter(identificador=identificador).exists()
        student = None
        student_data = {}
        if student_exist:
            student = Student.objects.get(identificador=identificador)
            student_data = {
                "identificador": student.identificador,
                "nombre": student.nombre,
                "apellido": student.apellido,
                # "contacto": student.contacto,
                # "correo": student.correo
            }
        res = {
            "status": False,
            "student_exist": False,
            "data": {}
        }
        if not InscriptionsController.is_enrolled(identificador, course_pk):
            if student_exist:
                res["student_exist"] = True
                res["data"] = student_data
        else:
            res["status"] = True
            res["student_exist"] = True
            res["data"] = student_data
        return res

    @staticmethod
    def create_account(data, course_pk):
        print(course_pk)
        print(data)
        course_exists = Course.objects.filter(pk=course_pk).exists()
        if not course_exists:
            return {
                "status": False
            }
        course = Course.objects.get(pk=course_pk)
        student_exists = Student.objects.filter(identificador=data['identificador']).exists()
        if not student_exists:
            student = Student(**data)
            student.save()
        else:
            student = Student.objects.get(identificador=data['identificador'])
        inscrip = Inscription(course=course, student=student)
        inscrip.save()
        print(inscrip)
        print('....................')
        print(student)
        print(student.pk)
