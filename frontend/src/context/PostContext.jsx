// context/PostContext.js
import React, { useState, useEffect } from 'react';
import PostService from '../services/PostService';

const Context = React.createContext({})

export const PostContext = ({ children }) => {
    const [posts, setPosts] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        PostService.fetchPosts()
            .then(res => {
                console.log(res);
                setPosts(res.data.results);
                // setIsLoading(false);
            })
    }, [setPosts]);



    return <Context.Provider value={{ posts, setPosts }}>
        {children}
    </Context.Provider>
};

export default Context;