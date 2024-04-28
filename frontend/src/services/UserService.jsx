import Api from './Api';

const UserService = {

    LoginUser(data) {
        return Api().post('users/login', data);
    },

    RegisterUser(data) {
        return Api().post('users', data);
    },

    GetUser() {
        return Api().get('user');
    },
    GetUserByUsername(username) {
        return Api().get(`user/${username}`);
    },
    searchUsers(search, page) {
        console.log(search, page);
        return Api().get(`users/search/?query=${encodeURIComponent(search)}&page=${page}`);
    },
    followUser(uuid) {
        return Api().post(`users/${uuid}/follow/`);
    },

    unfollowUser(uuid) {
        return Api().post(`users/${uuid}/unfollow/`);
    }
    


}

export default UserService;