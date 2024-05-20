from rest_framework import serializers
from . models import Post, Comment

class CommentSerializer(serializers.ModelSerializer):

    user = serializers.ReadOnlyField(source='user.username')
    avatar = serializers.ReadOnlyField(source='user.avatar.url')

    class Meta:
        model = Comment
        fields = '__all__'

    def get_avatar(self, obj):
        return obj.user.avatar.url

class MyPostSerializer(serializers.ModelSerializer):

    likes_count = serializers.SerializerMethodField(read_only=True)
    retweets_count = serializers.SerializerMethodField(read_only=True)
    user = serializers.ReadOnlyField(source='user.username')
    avatar = serializers.ReadOnlyField(source='user.avatar.url')

    class Meta:
        model = Post
        fields = ['id', 'user', 
                  'avatar', 
                  'content', 
                  'image', 'liked_by', 
                  'retweeted_by', 'created_at', 
                  'likes_count', 'retweets_count','parent']

    def get_avatar(self, obj):
        return obj.user.avatar.url

    def get_likes_count(self, obj):
        return obj.liked_by.all().count()

    def get_retweets_count(self, obj):
        return obj.retweeted_by.all().count()

class PostSerializer(serializers.ModelSerializer):

    user = serializers.ReadOnlyField(source='user.username')
    avatar = serializers.ReadOnlyField(source='user.avatar')

    likes_count = serializers.SerializerMethodField(read_only=True)
    retweets_count = serializers.SerializerMethodField(read_only=True)

    iliked = serializers.SerializerMethodField(read_only=True)
    iretweeted = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'user', 
                  'avatar', 
                  'content', 
                  'image', 'liked_by', 'retweeted_by', 'created_at', 'likes_count', 'retweets_count', 'iliked', 'iretweeted']
        # ordering = ['-created_at']



    def get_avatar(self, obj):
        return obj.user.avatar.url

    def get_likes_count(self, obj):
        return obj.liked_by.all().count()

    def get_retweets_count(self, obj):
        return obj.retweeted_by.all().count()

    def get_iliked(self, obj):
        return True if self.context['request'].user in obj.liked_by.all() else False

    def get_iretweeted(self, obj):
        return True if self.context['request'].user in obj.retweeted_by.all() else False