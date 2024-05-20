import React from 'react';
import { usePosts } from '../../../hooks/usePosts';
import { Link } from 'react-router-dom';
import { AiOutlineMessage } from 'react-icons/ai';
import AddPost from "../../../components/client/Social/AddPost";

const Feed = () => {
    const { posts } = usePosts();

    const postItems = posts;

    return (
        <>
            <div className="bg-white border-b border-gray-300 p-5">
                <div className="flex flex-row items-center justify-between">
                    <h1 className="text-gray-800 font-semibold text-xl">Home</h1>
                </div>
            </div>

            <AddPost />

            {postItems.map((post) => (
                <div key={post.id} className="bg-white border-b border-gray-300 p-5 hover:bg-gray-50 transition">
                    <div className="flex gap-3">
                        <img
                            className="h-12 w-12 rounded-full object-cover"
                            src={post.avatar || "https://via.placeholder.com/150"}
                            alt="Profile"
                        />
                        <div className="flex flex-col flex-grow">
                            <div className="flex justify-between items-center">
                                <Link to={`${post.user}`} className="text-blue-500 font-semibold hover:underline">
                                    {post.user}
                                </Link>
                                <span className="text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString()}</span>
                            </div>
                            <p className="text-gray-800 mt-1">{post.content}</p>
                            {post.image && (
                                <div className="mt-2 flex justify-start">
                                    <img
                                        src={post.image}
                                        alt="Post"
                                        className="w-full max-h-80 object-cover" 
                                        style={{ pointerEvents: 'none' }} 
                                    />
                                </div>
                            )}
                            <div className="flex gap-10 mt-3">
                                <div className="flex items-center gap-2 text-gray-600 hover:text-blue-500 cursor-pointer">
                                    <AiOutlineMessage size={20} />
                                    <span>{post.comments?.length || 0}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 hover:text-green-500 cursor-pointer">
                                    <span>{post.retweets_count}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 hover:text-red-500 cursor-pointer">
                                    <span>{post.likes_count}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default Feed;
