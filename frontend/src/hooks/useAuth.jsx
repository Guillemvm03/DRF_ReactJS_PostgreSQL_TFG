import { useContext, useCallback } from 'react';
import UserContext from '../context/UserContext';
import UserService from '../services/UserService';
import JwtService from '../services/JwtService';
import { useToastr } from './useToastr';
import { useNavigate } from 'react-router-dom';

export function useAuth() {

    const { user, setUser, setToken, setIsAuth, isAdmin, setIsAdmin } = useContext(UserContext)
    const { useCreateToastr } = useToastr();

    const Navigate = useNavigate();

    const login = (data) => {
        UserService.LoginUser({ user: data })
            .then(({ data, status }) => {
                if (status === 200) {
                    useCreateToastr({ status: true })
                    setUser(data);
                    setToken(data.token);
                    JwtService.saveToken(data.token);
                    setIsAuth(true);
                    setIsAdmin(data.role === 'Admin');
                    Navigate('/home')
                }
            })
            .catch(e => console.error(e));
    };

    const register = (user) => {
        UserService.RegisterUser({ user })
            .then(({ data, status }) => {
                if (status === 201) {
                    useCreateToastr({ status: true })
                    Navigate('/auth/login')
                }
            })
            .catch(e => console.error(e));
    };

    const logout = () => {
        setUser({});
        setToken(false);
        setIsAuth(false);
        setIsAdmin(false);
        JwtService.destroyToken();
        Navigate('/auth/login')
        useCreateToastr({ status: true })
    };

    const fetchUserDetails = useCallback((username) => {
        return UserService.GetUserByUsername(username)
            .then(response => {
                if (response.status === 200) {
                    return response.data;
                } else {
                    throw new Error('Failed to fetch user details');
                }
            })
            .catch(error => {
                console.error("Error fetching user details:", error);
                throw error;
            });
    }, []);

    const searchUsers = (search) => {
        return UserService.SearchUsers(search)
            .then(response => {
                if (response.status === 200) {
                    return response.data;
                } else {
                    throw new Error('Failed to search users');
                }
            })
            .catch(error => {
                console.error("Error searching users:", error);
                throw error;
            });
    };

    return { user, setUser, login, register, logout, isAdmin, fetchUserDetails, searchUsers };
}
