from django.shortcuts import render
from rest_framework import viewsets, status, views,generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.permissions import (IsAuthenticated, AllowAny, IsAdminUser, IsAuthenticatedOrReadOnly)
from django.contrib.auth import authenticate
from rest_framework.pagination import PageNumberPagination
from django.shortcuts import get_object_or_404

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
    user = request.user
    paginator = StandardResultsSetPagination()
    query = request.query_params.get('query', None)
    if query is not None:
        users = User.objects.filter(username__icontains=query).exclude(id=user.id)
    else:
        users = User.objects.all().exclude(id=user.id)
    result_page = paginator.paginate_queryset(users, request)
    serializer = UserDetailSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

class UserView(viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = (IsAuthenticated,)

    def getUser(self, request):
        email = request.user

        serializer_context = { 'email': email }
        user_serializer = UserSerializer.getUser(context=serializer_context)
        return Response(user_serializer)

    # FOLLOW
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated], url_path='follow', url_name='follow')
    def follow(self, request, pk=None):
        user_to_follow = get_object_or_404(User, uuid=pk)
        
        if request.user.uuid == user_to_follow.uuid:
            return Response({"error": "You cannot follow yourself."}, status=status.HTTP_400_BAD_REQUEST)

        if user_to_follow in request.user.following.all():
            return Response({'status': 'already following'}, status=status.HTTP_409_CONFLICT)

        request.user.following.add(user_to_follow)
        return Response({'status': 'following'}, status=status.HTTP_200_OK)

    # UNFOLLOW
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated], url_path='unfollow', url_name='unfollow')
    def unfollow(self, request, pk=None):
        user_to_unfollow = get_object_or_404(User, uuid=pk)
        
        if request.user.uuid == user_to_unfollow.uuid:
            return Response({"error": "You cannot unfollow yourself."}, status=status.HTTP_400_BAD_REQUEST)

        if user_to_unfollow not in request.user.following.all():
            return Response({'status': 'not following'}, status=status.HTTP_409_CONFLICT)

        request.user.following.remove(user_to_unfollow)
        return Response({'status': 'unfollowed'}, status=status.HTTP_200_OK)

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    lookup_field = 'username'
    lookup_url_kwarg = 'username'
