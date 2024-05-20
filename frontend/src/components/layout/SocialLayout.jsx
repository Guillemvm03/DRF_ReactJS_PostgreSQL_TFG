import { Outlet } from "react-router-dom";
import SocialSideBar from "./SocialSidebar";
import Search from "../client/Social/Search";

const SocialLayout = () => {
    return (
        <>
            <div className="flex justify-center items-stretch w-full">
                <div className="flex flex-none w-14 sm:w-14 md:flex-none md:w-64 lg:w-72 xl:w-72">
                    <SocialSideBar />
                </div>

                <div className="flex-grow md:w-full lg:max-w-4xl xl:max-w-4xl">
                    <Outlet />
                </div>

                <div className="hidden md:hidden lg:flex lg:flex-none lg:w-96 xl:w-96">
                    <Search />
                </div>
            </div>
        </>
    );
}

export default SocialLayout;

