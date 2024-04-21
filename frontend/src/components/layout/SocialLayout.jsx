import { Outlet } from "react-router-dom"
import SocialSideBar from "./SocialSidebar";
import Search from "../client/Social/Search";


const SocialLayout = () => {
  return (
    <>
      <div className="flex justify-center">
        <div className="shrink w-14 sm:w-14 md:w-64 lg:w-[350px] xl:w-[350px]">
          <SocialSideBar/>
        </div>
        <div className="shrink w-[500px] pr-6">
          <Outlet/>
        </div>
        <div className="shrink w-0 sm:w-14 md:w-64 lg:2-[450px] xl:w-[450px]">
          <Search/>
        </div>
      </div>
    </>
  )
}

export default SocialLayout;