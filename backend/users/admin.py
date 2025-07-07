from django.contrib import admin
from .models import CustomUser, Document


class DocumentInline(admin.TabularInline):
    model = Document
    extra = 0
    readonly_fields = ('doc_type', 'file', 'uploaded_at', 'is_deleted')
    can_delete = False


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'application_status', 'is_staff', 'is_superuser')
    search_fields = ('username', 'email')
    list_filter = ('application_status', 'is_staff', 'is_superuser')
    inlines = [DocumentInline]
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'doc_type', 'uploaded_at', 'is_deleted')
    search_fields = ('user__username',)
    list_filter = ('doc_type', 'is_deleted')
    readonly_fields = ('uploaded_at',)