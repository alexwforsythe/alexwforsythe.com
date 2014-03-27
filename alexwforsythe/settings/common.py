"""Django settings for alexwforsythe project.
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))


# Set IS_PROD to True only if we are using production settings.
if os.environ.get('DJANGO_SETTINGS_MODULE', None) == 'alexwforsythe.settings.prod':
    IS_PROD = True
else:
    IS_PROD = False

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True if os.environ.get('DJANGO_DEBUG', None) == '1' else False

TEMPLATE_DEBUG = DEBUG

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ['DJANGO_SECRET_KEY']

# Honor the 'X-Forwarded-Proto' header for request.is_secure()
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Allow all host headers
ALLOWED_HOSTS = ['.herokuapp.com', 'alexwforsythe.com']


# Application definitions

DEFAULT_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
)

THIRD_PARTY_APPS = (
    'bootstrap3',
    'storages',
)

LOCAL_APPS = (
    'alexwforsythe.main',
)

INSTALLED_APPS = DEFAULT_APPS + THIRD_PARTY_APPS + LOCAL_APPS

TEMPLATE_DIRS = (
    os.path.join(BASE_DIR, 'templates')
)


# Add to the default Django template context processors
from django.conf import global_settings
TEMPLATE_CONTEXT_PROCESSORS = global_settings.TEMPLATE_CONTEXT_PROCESSORS + (
    'alexwforsythe.main.context_processors.global_settings',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'alexwforsythe.urls'

WSGI_APPLICATION = 'alexwforsythe.wsgi.application'


# Database

# Parse database configuration from $DATABASE_URL
import dj_database_url
DATABASES = {'default': dj_database_url.config()}


# Internationalization
# https://docs.djangoproject.com/en/1.6/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)

# Static asset configuration
STATIC_ROOT = 'staticfiles'

# STATICFILES_DIRS = (
#     os.path.join(BASE_DIR, 'static'),
# )
