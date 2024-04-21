
import { BsTwitter } from "react-icons/bs";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";
import { BsPersonFill } from "react-icons/bs";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { RiHome7Fill } from "react-icons/ri";
import SidebarLink from "./SidebarLink";

// import { useNavigate } from "react-router-dom";
function logout() {
  localStorage.clear()
  // nav('/login')
}

const SocialSideBar = () => {
  return (
    <div className="sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full bg-white">
      <div className="space-y-2.5 mt-3 mb-2.5 xl:ml-24">
        <SidebarLink link='' text="Home" Icon={<RiHome7Fill size={28}/>} />
        <SidebarLink link='' text="Profile" Icon={<BsPersonFill size={28}/>} />
        <SidebarLink link='/contacts' text="Chat" Icon={<HiOutlineEnvelope size={28}/>} />
        <SidebarLink link='/prodile'text="Notifications"  Icon={<IoIosNotificationsOutline size={28}/>} />
        <SidebarLink link='/login' text="Logout" Icon={<BiLogOutCircle size={28}/>} onClick={logout} />
      </div>
    </div>
  )
}
export default SocialSideBar