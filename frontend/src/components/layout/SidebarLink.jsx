import { Link, useLocation } from "react-router-dom";

const SidebarLink = ({ Icon, text, link }) => {
  const location = useLocation();
  const isActive = location.pathname === link;

  return (
    <Link to={link}>
      <div className={`flex items-center cursor-pointer p-3 rounded-full ${isActive ? 'bg-blue-500 text-white' : 'text-gray-600'} hover:bg-blue-100`}>
        <div className={isActive ? 'text-white' : 'text-gray-600 hover:text-blue-500'}>
          {Icon}
        </div>
        <span className={`ml-2 ${isActive ? 'text-white' : 'text-gray-600 hover:text-blue-500'} hidden md:inline lg:inline xl:inline`}>{text}</span>
      </div>
    </Link>
  );
};

export default SidebarLink;
