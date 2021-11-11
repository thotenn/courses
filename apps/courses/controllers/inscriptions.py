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
