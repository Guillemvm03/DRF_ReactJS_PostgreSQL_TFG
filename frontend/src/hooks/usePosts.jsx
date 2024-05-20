import { useCallback, useContext, useEffect, useState } from "react";
import PostService from "../services/PostService";
import { useToastr } from "./useToastr";
import PostContext from "../context/PostContext";

export function usePosts() {
    const { useCreateToastr } = useToastr();
    const { posts, setPosts } = useContext(PostContext);
    
    const addPost = useCallback(async (formData) => {
        try {
          const response = await PostService.addPost(formData);
          if (response.data) {
            setPosts([response.data, ...posts]);
            useCreateToastr({ status: true, message: "Post Added!" });
          }
        } catch (error) {
          console.error('Failed to add tweet:', error);
          useCreateToastr({ status: true, error: 'wrong', message:"Ha occurido un error con el servidor"})
        }
      }, [posts, setPosts]);

    return {
        posts,
        setPosts,
        addPost
        // loadMore,
        // hasMore,
        // addPost,
        // deletePost
    };
}
