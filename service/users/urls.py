from django.urls import path
from .views import AuthViewSet

signup = AuthViewSet.as_view({'post': 'signup'})
signin = AuthViewSet.as_view({'post': 'signin'})
authcode = AuthViewSet.as_view({'post': 'create_authcode', 'put': 'check_authcode'})
password = AuthViewSet.as_view({'post': 'change_lostpassword'})

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('signin/', signin, name='signin'),
    path('authcode/', authcode, name='authcode'),
    path('password/', password, name='password'),
]
