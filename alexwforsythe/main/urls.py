from django.conf.urls import patterns, url


urlpatterns = patterns('alexwforsythe.main.views',
    url(r'^$', 'index', name='index'),
)
