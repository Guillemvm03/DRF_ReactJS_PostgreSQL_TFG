import { BsTwitter } from "react-icons/bs";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";
import { BsPersonFill } from "react-icons/bs";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { RiHome7Fill } from "react-icons/ri";
import SidebarLink from "./SidebarLink";

// import { useNavigate } from "react-router-dom";


const SocialSideBar = () => {

//   const username = localStorage.getItem('username')
//   const nav = useNavigate()



  return (

    <div className="sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
      <div className="space-y-2.5  mt-3 mb-2.5 xl:ml-24">
          <BsTwitter size={28} className="ml-4 mb-2" />
        <SidebarLink link='' text="Home" Icon={<RiHome7Fill size={28}/>} />
        <SidebarLink link='' text="Profile" Icon={<BsPersonFill size={28}/>} />
        <SidebarLink link='/contacts' text="Chat" Icon={<HiOutlineEnvelope size={28}/>} />
        {/* <SidebarLink link='/noti'text="Notifications" num={data?.length} Icon={<IoIosNotificationsOutline size={28}/>} /> */}

      </div>
    </div>
  )
}

export default SocialSideBar