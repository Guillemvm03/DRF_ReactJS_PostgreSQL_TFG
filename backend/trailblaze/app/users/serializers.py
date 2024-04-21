from .models import User
from ..notifications.models import Notification
from rest_framework import serializers
from ..rent.models import Rent
from ..rent.serializers import RentSerializer

class UserSerializer(serializers.ModelSerializer):

    
    class Meta:
        model = User
        fields = ('id','username', 'uuid', 'email', 'phone','role', 'password', 'balance', 'avatar', 'cover_image', 'date_joined')
        extra_kwargs = {'password': {'write_only': True}}


    def create(self, validated_data):

        if User.objects.filter(email=validated_data['email']).exists():
            raise serializers.ValidationError("This email is already in use")
        
        if User.objects.filter(username=validated_data['username']).exists():
            raise serializers.ValidationError("This username is already in use.")
        
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            phone=validated_data['phone']
        )
        return user

    def getUser(context):
            email = context['email']
            try:
                user = User.objects.get(email=email)
            except:
                raise serializers.ValidationError('*User not found.')
            
            unread_notifications_count = Notification.objects.filter(to_user=user, is_read=False, type="incident").count()


       
            active_rent =Rent.objects.filter(user=user, status='active')
            print(active_rent)

            if not active_rent.exists():
                return {
                    'user': {
                        'id': user.id,
                        'username': user.username,
                        'phone': user.phone,
                        'email': user.email,
                        'role': user.role,
                        'balance': user.balance,
                        'unread_notifications': unread_notifications_count,
                        'rent': None,
                        'avatar': user.avatar,
                    },
                    'token': user.token,
                }
            
            return {
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'phone': user.phone,
                    'email': user.email,
                    'role': user.role,
                    'balance': user.balance,
                    'unread_notifications': unread_notifications_count,
                    'rent':{
                        'id': active_rent[0].id,
                        'start_date': active_rent[0].start_date,
                        'status': active_rent[0].status,
                    },
                    'avatar': user.avatar,

                },
                'token': user.token,

            }

class UserDetailSerializer(serializers.ModelSerializer):
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username','email', 'phone', 'role', 'balance', 'avatar', 'cover_image', 
                  'date_joined', 'followers_count', 'following_count', 'following')
        extra_kwargs = {'password': {'write_only': True}}

    def get_followers_count(self, obj):
        return obj.followed.count()
    
    def get_following_count(self, obj):
        return obj.following.count()