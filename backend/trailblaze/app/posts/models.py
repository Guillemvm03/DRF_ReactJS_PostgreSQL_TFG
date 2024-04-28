from django.db import models
from ..users.models import User
# Create your models here.

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(max_length=255)
    image = models.ImageField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    liked_by = models.ManyToManyField(User, default=None, blank=True,  related_name="liked_posts")
    retweeted_by = models.ManyToManyField(User, default=None, blank=True, related_name='retweeted')



class Meta:
    ordering = ['-created_at'] 


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='parent')
    body = models.CharField(max_length=140)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']