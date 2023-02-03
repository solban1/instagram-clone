from django.urls import path
from .views import AuthViewSet

signup = AuthViewSet.as_view({'post': 'signup'})
signin = AuthViewSet.as_view({'post': 'signin'})
urlpatterns = [
    path('signup/', signup, name='signup'),
    path('signin/', signin, name='signin')
]