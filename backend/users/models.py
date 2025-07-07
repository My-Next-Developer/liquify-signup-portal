from django.db import models
from django.contrib.auth.models import AbstractUser

class DocumentType(models.TextChoices):
    PASSPORT = 'PASSPORT', 'Passport'
    PROOF_OF_ADDRESS = 'PROOF_OF_ADDRESS', 'Proof of Address'
    ID_CARD = 'ID_CARD', 'ID Card'
    LICENSE = 'LICENSE', 'Drivers License'

class ApplicationStatus(models.TextChoices):
    PENDING = 'PENDING', 'Pending'
    APPROVED = 'APPROVED', 'Approved'
    REJECTED = 'REJECTED', 'Rejected'
    PUSHBACK = 'PUSHBACK', 'Pushback'

class CustomUser(AbstractUser):
    application_status = models.CharField(
        max_length=16,
        choices=ApplicationStatus.choices,
        default=ApplicationStatus.PENDING
    )
    pushback_reason = models.TextField(blank=True, null=True)
    is_deleted = models.BooleanField(default=False)  # soft-delete
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Document(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='documents')
    doc_type = doc_type = models.CharField(
        max_length=32,
        choices=DocumentType.choices,
        default=DocumentType.PASSPORT
    )
    file = models.FileField(upload_to='documents/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    is_deleted = models.BooleanField(default=False)  # soft-delete

    class Meta:
        ordering = ['-uploaded_at']