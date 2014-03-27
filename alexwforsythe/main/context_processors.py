from django.conf import settings


def global_settings(request):
    ga_prop_id = getattr(settings, 'GOOGLE_ANALYTICS_PROPERTY_ID', False)
    ga_domain = getattr(settings, 'GOOGLE_ANALYTICS_DOMAIN', False)

    if settings.IS_PROD:
        return {
            'DEBUG': settings.DEBUG,
            'GOOGLE_ANALYTICS_PROPERTY_ID': ga_prop_id,
            'GOOGLE_ANALYTICS_DOMAIN': ga_domain,
        }
    else:
        return {
            'DEBUG': settings.DEBUG,
        }
