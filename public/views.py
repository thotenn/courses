from django.conf import settings
from django.shortcuts import render

mediaurl = settings.MEDIA_URL


def index(request, *args, **kwargs):
    # Aqui dependiendo de la empresa se retornaran los valores correspondientes a las mismas
    # por ahora solo retornaremos la empresa de pk 1
    data_set = {
    }
    return render(request, 'public/index.html', data_set)
