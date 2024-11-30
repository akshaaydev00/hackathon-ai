import { useContext, useState, useCallback } from 'react';
import logo from '../imgs/logo.png';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import UserNavigationPanel from './user-navigation.component';

const Navbar = () => {
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
  const [userNavPanel, setUserNavPanel] = useState(false);
  const { userAuth } = useContext(UserContext);
  const access_key = userAuth.access_token;
  const image = userAuth.profile_img;
  let navigate = useNavigate();

  const handleUserNavPanel = useCallback(() => {
    setUserNavPanel((currentVal) => !currentVal);
  }, []);

  const handleBlur = useCallback(() => {
    setTimeout(() => {
      setUserNavPanel(false);
    }, 200);
  }, []);

  const handleSearch = (e) => {
    let query = e.target.value;
    if (e.keyCode === 13 || query.length) {
      navigate(`/search/${query}`);
    }
  };

  const handleSearchChange = (e) => {
    let query = e.target.value;
    if (query) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="flex-none w-10">
          <img src={logo} className="w-full" alt="" />
        </Link>

        <div
          className={`absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show ${searchBoxVisibility ? 'show' : 'hide'}`}
        >
          <input
            type="text"
            placeholder="Search"
            onKeyDown={handleSearch}
            onChange={handleSearchChange}
            className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
          />
          <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
        </div>

        <div className="flex item-center gap-3 md:gap-6 ml-auto">
          <button
            className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center"
            onClick={() => setSearchBoxVisibility((currentVal) => !currentVal)}
          >
            <i className="fi fi-rr-search text-xl"></i>
          </button>
        </div>

        <div className="relative" onClick={handleUserNavPanel} onBlur={handleBlur}>
          {
          access_key ? (
            <>
              <button className="w-12 h-12 mt-1">
                <img src={image} className="w-full h-full object-cover rounded-full" />
              </button>
              {userNavPanel ? <UserNavigationPanel /> : ''}
            </>
          ) : (
            ''
          )}
        </div>

        {!access_key ? (
          <>
            <Link className="btn-dark py-2" to="/signin">
              Sign in
            </Link>
            <Link className="btn-light py-2 hidden md:block" to="/signup">
              Sign up
            </Link>
          </>
        ) : (
          ''
        )}
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;