from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

from core.controllers.api import GenView
from ...models.courses import Course

class CoursesApi(GenView):
    permission_classes = ()
    api_url_name = 'courses'

    def get(self, request, format=None):
        res = list(Course.objects.filter(
            habilitado=True
        ).values('pk', 'nombre', 'descripcion', 'categoria', 'habilitado'))
        return Response(res)

    def post(self, request, format=None):
        return Response('Error Request', status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk, format=None):
        return Response('Error Request', status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def delete(self, request, pk, format=None):
        return Response('Error Request', status=status.HTTP_405_METHOD_NOT_ALLOWED)