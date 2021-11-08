from .base import *

DEBUG = True
CORS_ORIGIN_ALLOW_ALL = True
# CORS_ORIGIN_WHITELIST = [
#     'http://127.0.0.1:8080/',
#     'http://localhost:8080/',
# ]
ALLOWED_HOSTS = ['*']
MIDDLEWARE = MIDDLEWARE + ['core.dev.middlewares.cors.open_access_middleware']
DATABASES = {
    DB_DEFAULT_NAME: {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        # 'NAME': 'mg',
        'NAME': 'courses',
        'USER': 'postgres',
        'PASSWORD': 'holaquetal',
        'HOST': 'localhost',
        'PORT': '5432'
    },
}
