import Api from './Api';

const PostService = {
  fetchPosts(page = 1) {
    return Api().get(`/posts?page=${page}`);  
  },
  addPost(formData) {
    return Api().post('/posts/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};

export default PostService;
