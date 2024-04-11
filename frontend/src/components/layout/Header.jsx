import { Avatar, Dropdown, Navbar, DarkThemeToggle, Flowbite } from "flowbite-react";
import "./Header.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useTranslation } from 'react-i18next';
import { useThemeMode } from 'flowbite-react';

const lngs = {
  gb: { nativeName: "English" },
  es: { nativeName: "Español" },
  fr: { nativeName: "Français" },
};

function Header() {
    
    const { t, i18n } = useTranslation();
    const activeLanguage = i18n.language;
    const { mode, toggleMode } = useThemeMode(); // Utiliza toggleMode para cambiar el tema

    console.log(activeLanguage);


  const Navigate = useNavigate();
  const { user, logout } = useAuth();

  const redirects = {
    home: () => Navigate("/home"),
    stations: () => Navigate("/admin/dashboard/stations"),
    admin: () => Navigate("/admin"),
    contact: () => Navigate("/contactus"),
    explore: () => Navigate("/explore"),
    profile: () => Navigate("/profile"),
    pricing: () => Navigate("/pricing"),
    login: () => Navigate("/auth/login"),
  };


  return (
    <Flowbite>
    <Navbar fluid rounded>
      <Navbar.Brand>
        {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="TrailBlaze Logo" /> */}
        <span
          className="self-center whitespace-nowrap text-xl font-semibold dark:text-white cursor-pointer"
          onClick={redirects.home}
        >
          TrailBlaze
        </span>

      </Navbar.Brand>
      <div className="flex md:order-2">

        {Object.entries(user).length > 0 ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <div>
                <Avatar
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded
                />
                {user.unread_notifications > 0 && (
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-0 mt-1 -end-0 me-1 dark:border-gray-900">
                    {user.unread_notifications}
                  </div>
                )}
              </div>
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{user.username}</span>
              {/* <span className="block truncate text-sm font-medium">{user.email}</span> */}
              <span className="block truncate text-xs">{user.balance} €</span>
            </Dropdown.Header>
            {user.role === "Admin" && (
              <Dropdown.Item onClick={redirects.admin}>Dashboard</Dropdown.Item>
            )}
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item onClick={redirects.profile}>Profile</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Item>
            <DarkThemeToggle />

            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => logout()}>Sign out</Dropdown.Item>

          </Dropdown>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={redirects.login}
          >
            {t("VIEWS.HEADER.login")}
          </button>
        )}
        <Navbar.Toggle />

        {/* Dropdown de idioma */}
        
        <Dropdown inline 
        label={
            <div>
                <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/css/flag-icons.min.css"
                />
                <button type="button" data-dropdown-toggle="language-dropdown-menu" className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                {/* <svg className="w-5 h-5 rounded-full me-3" 
                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" 
                xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 3900 3900"><path fill="#b22234" d="M0 0h7410v3900H0z"/><path d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0" stroke="#fff" strokeWidth="300"/><path fill="#3c3b6e" d="M0 0h2964v2100H0z"/><g fill="#fff"><g id="d"><g id="c"><g id="e"><g id="b"><path id="a" d="M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z"/><use xlinkHref="#a" y="420"/><use xlinkHref="#a" y="840"/><use xlinkHref="#a" y="1260"/></g><use xlinkHref="#a" y="1680"/></g><use xlinkHref="#b" x="247" y="210"/></g><use xlinkHref="#c" x="494"/></g><use xlinkHref="#d" x="988"/><use xlinkHref="#c" x="1976"/><use xlinkHref="#e" x="2470"/></g></svg> */}

        <span
          className={`fi fi-${activeLanguage}`}
          style={{
            width: '2rem', 
            height: '2rem', 
            borderRadius: '100%', 
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem', 
            marginRight: '0.5rem' 
          }}
        ></span>

                <span></span>

                {lngs[activeLanguage].nativeName}
                </button>
            </div>    
        }>
            
          <Dropdown.Header>Select Language</Dropdown.Header>

          {Object.keys(lngs).map((lng) => (
            <Dropdown.Item key={lng} onClick={() => i18n.changeLanguage(lng)}>
              <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
              <div className="inline-flex items-center">
        


              <span
            className={`fi fi-${lng}`}
            style={{
              width: '2rem',
              height: '2rem',
              borderRadius: '100%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              marginRight: '0.5rem',
            }}
          ></span>




                {lngs[lng].nativeName}
              </div>
            </a>
          </li>
            </Dropdown.Item>
          ))}

        </Dropdown>


      </div>
      <Navbar.Collapse>
        <Navbar.Link onClick={redirects.home} active>
        {t('VIEWS.HEADER.home')}
        </Navbar.Link>
        <Navbar.Link href="#">
        {t('VIEWS.HEADER.about')}
            </Navbar.Link>
        <Navbar.Link href="#">
        {t('VIEWS.HEADER.services')}
        </Navbar.Link>
        <Navbar.Link onClick={redirects.pricing}>
        {t('VIEWS.HEADER.pricing')}
            </Navbar.Link>
        <Navbar.Link onClick={redirects.contact}>
        {t('VIEWS.HEADER.contact')}
            </Navbar.Link>
        <Navbar.Link onClick={redirects.explore}>
        {t('VIEWS.HEADER.explore')}
            </Navbar.Link>
            
      </Navbar.Collapse>
    </Navbar>
    </Flowbite>
  );
}

export default Header;
