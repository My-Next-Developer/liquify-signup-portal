from django.urls import path
from .api_views import DocumentUploadView, DocumentDeleteView, MyDocumentsView
from .views import ( SignupView, MeView, AdminUserListView, CustomTokenObtainPairView )

from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # HTML API
    path("me/", MeView.as_view(), name="me"),
    path("signup/", SignupView.as_view(), name="signup"),
    path("admin/users/", AdminUserListView.as_view(), name="admin-users"),

    # REST API
    path("documents/", MyDocumentsView.as_view(), name="documents"),
    path("upload-doc/", DocumentUploadView.as_view(), name="upload-doc"),
    path("documents/<int:pk>/delete/", DocumentDeleteView.as_view(), name="delete-doc"),

    # JWT API
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]