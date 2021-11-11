from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from apps.courses.controllers.inscriptions import InscriptionsController

from core.controllers.api import GenView

class InscriptionsApi(GenView):
    permission_classes = ()
    api_url_name = 'inscriptions'

    def get(self, request, format=None):
        return Response('Error Request', status=status.HTTP_404_NOT_FOUND)
            
    def post(self, request, format=None):
        data = JSONParser().parse(request)
        api_type = data['type']
        payload = data['payload']
        content = None
        try:
            if api_type == 'ins_is_enrolled':
                content = {"state": InscriptionsController.is_enrolled(payload['identificador'], payload['course_pk'])}
        except Exception as err:
            print(err)
            return Response('Error Request', status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if content is None:
            return Response('Error Request', status=status.HTTP_404_NOT_FOUND)
        return Response(content)
        
    def put(self, request, pk, format=None):
        return Response('Error Request', status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def delete(self, request, pk, format=None):
        return Response('Error Request', status=status.HTTP_405_METHOD_NOT_ALLOWED)
