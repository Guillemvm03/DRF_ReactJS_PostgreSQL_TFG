from django.shortcuts import render
from rest_framework import viewsets, status, views,generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.permissions import (IsAuthenticated, AllowAny, IsAdminUser, IsAuthenticatedOrReadOnly)
from django.contrib.auth import authenticate
from rest_framework.pagination import PageNumberPagination

from .models import User
from .serializers import UserSerializer, UserDetailSerializer


# Create your views here.

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 1000


@api_view(['POST'])
@permission_classes([AllowAny])
def User_registration(request):
    try:
        user_data = request.data.get('user')
        serializer = UserSerializer(data=user_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"user": serializer.data}, status=status.HTTP_201_CREATED)

    except Exception as e:
        print("Exception:", str(e))
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['POST'])
@permission_classes([AllowAny])
def User_login(request):
    try:
        user_req = request.data.get('user')
        user = authenticate(email=user_req['email'], password=user_req['password'])
        
        if user is not None:
            serializer = UserSerializer(user)
            serializer_data = serializer.data
            serializer_data['token'] = user.token  
            return Response(serializer_data, status=status.HTTP_200_OK) 
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    except Exception as e:
        print("Exception:", str(e))
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def User_search(request):
    paginator = StandardResultsSetPagination()
    query = request.query_params.get('query', None)
    if query is not None:
        users = User.objects.filter(username__icontains=query)
    else:
        users = User.objects.all()
    result_page = paginator.paginate_queryset(users, request)
    serializer = UserSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

class UserView(viewsets.GenericViewSet):
    permission_classes = (IsAuthenticated,)

    def getUser(self, request):
        email = request.user

        serializer_context = { 'email': email }
        user_serializer = UserSerializer.getUser(context=serializer_context)
        return Response(user_serializer)


    # def put(self, request):
    #     serializer = UserSerializer(request.user, data=request.data, partial=True)
    #     serializer.is_valid(raise_exception=True)
    #     serializer.save()
    #     return Response(serializer.data, status=status.HTTP_200_OK)

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    lookup_field = 'username'
    lookup_url_kwarg = 'username'
