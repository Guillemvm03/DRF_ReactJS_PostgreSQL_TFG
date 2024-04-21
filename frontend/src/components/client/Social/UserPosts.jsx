import {
  AiOutlineMessage,
  AiFillEdit
} from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { useState } from "react";

const UserPosts = ({ user, myUser }) => {

  console.log(user, myUser);

  return (
    <div className="border-b-[1px] border-gray-300 p-5 cursor-pointer hover:bg-gray-100 transition">
      <div className="flex flex-row items-start gap-3">

        {/* <img className="h-11 w-11 rounded-full" src={currentUser.avatar} /> */}
        <img className="h-11 w-11 rounded-full" src="https://avatars.githubusercontent.com/u/90612916?v=4" />

        <div>
          <div className="flex flex-row items-center gap-2">

            <p className="text-gray-800 font-semibold cursor-pointer hover:underline">
              {/* {user.username} */}
              Kevin
            </p>

            <span className="text-gray-500 text-sm">
              12 de abril
            </span>

          </div>

          <span className="text-gray-500 cursor-pointer hover:underline hidden md:block">
            @kevin
          </span>

          <div className="text-gray-800 mt-1 text-start">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt obcaecati facere dignissimos debitis? Odio esse inventore, veritatis, consequuntur hic natus reiciendis modi illum expedita, quo eaque est ipsa. Tempore, sed.
          </div>

          {/* <img src={t.image}/> */}
          <img src=""/>

          <div className="flex flex-row items-center mt-3 gap-10">

            <div className="flex flex-row items-center text-gray-500 gap-2 cursor-pointer transition hover:text-sky-500">
              <AiOutlineMessage size={20} />
              23
            </div>

            <div className="flex flex-row items-center text-gray-500 gap-2 cursor-pointer transition hover:text-green-500">
              12
            </div>

            <div className="flex flex-row items-center text-gray-500 gap-2 cursor-pointer transition hover:text-red-500">
              45
            </div>

            {/* {myUser === user.username && ( */}
              <>
                <div 
                  className="flex flex-row items-center text-gray-500 gap-2 cursor-pointer transition hover:text-red-500">
                  <BsFillTrashFill size={20} />
                </div>

                <div className="flex flex-row items-center text-gray-500 gap-2 cursor-pointer transition hover:text-yellow-300">
                  <AiFillEdit size={25} />
                </div>

                {/* {isEditing && (
                <EditTweet tweet={t} close={() => setIsEditing(false)} />
                )} */}
              </> 
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserPosts;
