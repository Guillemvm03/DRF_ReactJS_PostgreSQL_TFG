from django.shortcuts import render
# from rest_framework import PageNumberPagination
from rest_framework import response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework import viewsets
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination

from . models import Post, Comment
from ..users.models import User
from .serializers import PostSerializer, MyPostSerializer, CommentSerializer
# from backend.paginations import CustomPagination
# Create your views here.

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 1000

class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = StandardResultsSetPagination

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = StandardResultsSetPagination



