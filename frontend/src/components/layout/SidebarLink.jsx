import { Link, useLocation } from "react-router-dom"

const SidebarLink = ({ Icon, text, link, num }) => {
  const location = useLocation();
  const isActive = location.pathname === link;

  return (
    <Link to={link}>
      <div className={`rounded-full text-xl p-4 flex items-center cursor-pointer ${isActive ? 'text-black hover:bg-blue-300' : 'text-gray-500 hover:bg-blue-100 hover:bg-opacity-10'}`}>
        {Icon}
        <span className="hidden md:inline lg:inline xl:inline ml-2">{text}</span>
        {num > 0 && 
          <button 
            className={`hidden md:inline lg:inline xl:inline ml-2 rounded-full w-8 h-8 ${isActive ? 'bg-sky-300 text-black' : 'bg-gray-200 text-gray-800'}`}>
            {num}
          </button>
        }
      </div>
    </Link>
  )
}

export default SidebarLink;
