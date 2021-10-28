from .base import *

DEBUG = True
CORS_ORIGIN_ALLOW_ALL = True
ALLOWED_HOSTS = ['*']
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
