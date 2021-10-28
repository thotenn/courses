from core.controllers.api import generate_urlpatterns_gens_view
from core.controllers.apitools.apirestbase import ApiRestBaseController

from ..controllers.apis.courses import CoursesApi

urlpatterns = generate_urlpatterns_gens_view([
    (ApiRestBaseController.api_url_name, ApiRestBaseController),
    (CoursesApi.api_url_name, CoursesApi)
])
