import { BsTwitter, BsPersonFill } from "react-icons/bs";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";
import { RiHome7Fill } from "react-icons/ri";
import SidebarLink from "./SidebarLink";
import { useAuth } from '../../hooks/useAuth';

function logout() {
    localStorage.clear();
}

const SocialSideBar = () => {
    const { user } = useAuth();

    return (
        <div className="fixed inset-x-0 bottom-0 sm:relative sm:inset-auto sm:h-full bg-white p-2 sm:flex sm:flex-col sm:items-center xl:items-start xl:w-[340px]">
            <div className="flex justify-around sm:flex-col sm:space-y-2.5 sm:mt-3 sm:mb-2.5 xl:ml-24">
                <SidebarLink link='' Icon={<RiHome7Fill size={28}/>} text="Home" />
                <SidebarLink link='' Icon={<BsPersonFill size={28}/>} text="Profile" />
                <SidebarLink link=' ' Icon={<IoIosNotificationsOutline size={28}/>} text="Notifications" />
                <SidebarLink link='/login' Icon={<BiLogOutCircle size={28}/>} onClick={logout} text="Logout" />
            </div>
        </div>
    );
}

export default SocialSideBar;
