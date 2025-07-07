from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Document
from .serializers import DocumentSerializer
from django.shortcuts import get_object_or_404

class DocumentUploadView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = DocumentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DocumentListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        docs = Document.objects.filter(user=request.user, is_deleted=False)
        serializer = DocumentSerializer(docs, many=True)
        return Response(serializer.data)

class DocumentDeleteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk):
        document = get_object_or_404(Document, pk=pk, user=request.user)
        document.is_deleted = True
        document.save()
        return Response({"message": "Document soft-deleted."}, status=status.HTTP_200_OK)
    
class MyDocumentsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        docs = Document.objects.filter(user=request.user, is_deleted=False)
        serializer = DocumentSerializer(docs, many=True)
        return Response(serializer.data)