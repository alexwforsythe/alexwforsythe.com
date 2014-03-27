from __future__ import absolute_import
from .common import *


# Amazon S3
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto.S3BotoStorage'
STATICFILES_STORAGE = DEFAULT_FILE_STORAGE

AWS_ACCESS_KEY_ID = os.environ['AWS_ACCESS_KEY_ID']
AWS_SECRET_ACCESS_KEY = os.environ['AWS_SECRET_ACCESS_KEY']
AWS_STORAGE_BUCKET_NAME = os.environ['AWS_STORAGE_BUCKET_NAME']

S3_URL = 'http://{0}.s3.amazonaws.com/'.format(AWS_STORAGE_BUCKET_NAME)
STATIC_URL = S3_URL

# Google Analytics
GOOGLE_ANALYTICS_PROPERTY_ID = os.environ['GOOGLE_ANALYTICS_PROPERTY_ID']
GOOGLE_ANALYTICS_DOMAIN = os.environ['GOOGLE_ANALYTICS_DOMAIN']
