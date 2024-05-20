

import React, { useEffect, useState } from 'react';
import { AiOutlineArrowLeft } from "react-icons/ai";
import { IoMdCalendar } from "react-icons/io";
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth'; 
import UserPosts from '../../../components/client/Social/UserPosts';
import UserLikes from '../../../components/client/Social/UserLikes';
import UserMedia from '../../../components/client/Social/UserMedia';
import UserRe from '../../../components/client/Social/UserRe';

const UserFeed = () => {

  // const { user } = useAuth();


  const { username } = useParams();

  const { fetchUserDetails, user, 
    followUser, unfollowUser } = useAuth();
  const [userDetails, setUserDetails] = useState(null);

  const [show, setShow] = useState(0)


  useEffect(() => {
    if (username) {
      fetchUserDetails(username)
        .then(data => setUserDetails(data))
        .catch(error => console.error("Error al cargar detalles del usuario:", error));
    }
  }, [username, fetchUserDetails]);


  const handleFollow = () => {
    followUser(userDetails.uuid)
        .then(data => {
            if (data.status === 'following') {
                setUserDetails(prevDetails => ({
                    ...prevDetails,
                    is_following: true,
                    followers_count: prevDetails.followers_count + 1

                }));
            }
        })
        .catch(error => {
            console.error("Error al seguir al usuario:", error);
        });
};


const handleUnfollow = () => {
    unfollowUser(userDetails.uuid)
        .then(data => {
            if (data.status === 'unfollowed') {
                setUserDetails(prevDetails => ({
                    ...prevDetails,
                    is_following: false,
                    followers_count: prevDetails.followers_count - 1 
                }));
            }
        })
        .catch(error => {
            console.error("Error al dejar de seguir al usuario:", error);
        });
};

console.log(userDetails);

return (
  <>
      <div className="border-b-[1px] border-gray-300 p-5">
          <div className="flex flex-row items-start gap-3">
              <div>
                  <div className="flex flex-row items-center gap-2">
                      <Link to="/explore">
                          <AiOutlineArrowLeft
                              size={24}
                              className="text-gray-800 hover:text-blue-500 cursor-pointer"
                          />
                      </Link>
                      <p className="text-gray-800 font-semibold text-xl">
                          {userDetails?.username}
                      </p>
                  </div>
              </div>
          </div>
      </div>

      <img className="bg-black h-[250px] w-full" src={userDetails?.cover_image || "https://www.shutterstock.com/image-vector/bike-line-banner-bicycle-road-600nw-2070944327.jpg"} />

      <div className="flex justify-between">
          <img
              src={userDetails?.avatar || "https://via.placeholder.com/150"}
              onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
              className="w-40 h-40 ml-3 object-cover border-8 border-green-300 -mt-20 shadow-2xl rounded-full"
          />

          <div>
              {userDetails?.username === user.username ? (
                  <button className="bg-blue-500 mr-7 text-white font-semibold rounded-full px-7 py-3 mt-3 ml-3">
                      Edit Profile
                  </button>
              ) : (
                  userDetails?.is_following ? (
                      <button onClick={handleUnfollow} className="bg-red-500 mr-7 text-white font-semibold rounded-full px-7 py-3 mt-3 ml-3 hover:bg-red-600 transition">
                          Unfollow
                      </button>
                  ) : (
                      <button onClick={handleFollow} className="bg-blue-500 mr-7 text-white font-semibold rounded-full px-7 py-3 mt-3 ml-3 hover:bg-blue-600 transition">
                          Follow
                      </button>
                  )
              )}
          </div>
      </div>

      <p className="text-start ml-4 mt-4 text-xl font-bold text-gray-800">
          {userDetails?.name}
      </p>

      <div className="text-gray-800 text-start ml-4">
          <span className="text-gray-500 hidden md:block">
              {userDetails?.bio}
          </span>

          <div className="flex gap-3 w-full p-2 text-gray-500 ">
              <IoMdCalendar className="mt-1 mb-3" size={20} />
              Joined {' '}
              {new Date(userDetails?.date_joined).toDateString().slice(4)}
          </div>

          <div className="flex gap-3 w-full p-2 text-gray-800 ">
    <span className="font-semibold text-green-600">{userDetails?.followers_count}</span> Followers
    <span className="mx-2 text-gray-400">|</span>
    <span className="font-semibold text-green-600">{userDetails?.following_count}</span> Following
</div>

      </div>

      <div className="border-b-[1px] border-gray-300 grid grid-cols-4 gap-4">
          <button
              onClick={() => setShow(0)}
              className="p-5 cursor-pointer hover:bg-gray-100 transition text-gray-800">
              Posts
          </button>

          <button  
              onClick={() => setShow(1)}
              className="p-5 cursor-pointer hover:bg-gray-100 transition text-gray-800">
              RePosts
          </button>

          <button  
              onClick={() => setShow(2)}
              className="p-5 cursor-pointer hover:bg-gray-100 transition text-gray-800">
              Media
          </button>

          <button  
              onClick={() => setShow(3)}
              className="p-5 cursor-pointer hover:bg-gray-100 transition text-gray-800">
              Likes
          </button>
      </div>

      {show === 0 && <UserPosts user={userDetails} myUser={user} />}
      {show === 1 && <UserRe user={userDetails} myUser={user} />}
      {show === 2 && <UserMedia user={userDetails} myUser={user} />}
      {show === 3 && <UserLikes user={userDetails} myUser={user} />}
  </>
);
};

export default UserFeed;