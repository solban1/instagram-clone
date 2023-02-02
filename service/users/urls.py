from django.urls import path
from .views import AuthViewSet

signup = AuthViewSet.as_view({'post': 'signup'})
urlpatterns = [
    path('signup/', signup, name='signup'),
]