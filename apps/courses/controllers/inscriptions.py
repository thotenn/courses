from ..models.inscriptions import Inscription
from ..models.students import Student
from ..models.courses import Course

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
        if not InscriptionsController.is_enrolled(identificador, course_pk):
            return {"status": False}
        student = Student.objects.get(identificador=identificador)
        return {
            "status": True,
            "data": {
                "nombre": student.nombre,
                "apellido": student.apellido
            }
        }

    @staticmethod
    def create_account(data, course_pk):
        pass
