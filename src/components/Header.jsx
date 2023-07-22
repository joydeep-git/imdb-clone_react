import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import ytLogo from "../Assets/yt-logo.png";
import ytLogoMobile from "../Assets/yt-logo-mobile.png";
import { FaBars } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { Context } from "../context/contextApi";
import Loader from "../shared/Loader";
import Dropdown from 'react-bootstrap/Dropdown';
import { useFirebaseContext } from "../context/FirebaseContext";

function Header() {
  const { googleSignIn, authenticated, userData, signOutUser } = useFirebaseContext();
  const [searchQuery, setSearchQuery] = useState("");
  const redirect = useNavigate();
  const { mobileMenu, setMobileMenu, loading } = useContext(Context);
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const searchQueryHandler = (e) => {
    if ((e?.key === "Enter" || e === "searchButton") && searchQuery?.length > 0) {
      redirect(`/searchResult/${searchQuery}`);
    }
  };

  const mobileMenuToggle = () => {
    setMobileMenu(!mobileMenu);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };

  // useEffect(() => {
  //   document.addEventListener("click", handleOutsideClick);
  //   return () => {
  //     document.removeEventListener("click", handleOutsideClick);
  //   };
  // }, [handleOutsideClick]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []); // Empty dependency array indicates the effect runs only once on mount


  return (
    <div className={`sticky top-0 z-10 flex flex-row items-center justify-between h-14 px-4 md:px-5 bg-[#171817]`}>
      <div className="flex justify-center items-center flex-row gap-2 md:gap-6">
        <div className="cursor-pointer" onClick={mobileMenuToggle}>
          {mobileMenu ? (<CgClose className="text-white text-xs md:text-xl" />) : (<FaBars className="text-white text-xs md:text-xl" />)}
        </div>
        <Link to="/">
          <img src={ytLogo} alt="YouTube" className="h-4 hidden sm:block" />
          <img src={ytLogoMobile} alt="" className="h-4 block sm:hidden" />
        </Link>
      </div>

      <div className="flex flex-row m-2 p-0 items-center justify-center gap-0 border-[1px] border-white rounded-full">
        <div className="p-0 md:p-0.5 md:pl-4 m-0 border-r-[1px] rounded-l-full h-[70%] md:h-[85%]">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-white p-0 w-24 text-center md:p-[0,1rem] md:pl-0 md:group-focus-within:pl-0 sm:w-32 sm:pl-2 sm:text-left md:w-64 lg:w-[500px]  text-[0.75rem] items-center justify-center h-70% md:h-max"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
            value={searchQuery}
          />
        </div>
        <div className="flex p-2 cursor-pointer" onClick={() => searchQueryHandler("searchButton")}>
          <IoIosSearch className="flex text-white" />
        </div>
      </div>

      {!authenticated ? (
        <button onClick={googleSignIn} className="text-white border px-2 rounded-2xl  hover:bg-white hover:text-black">
          SIGN IN
        </button>
      ) : (
        <div className="gap-6 flex flex-row items-center justify-center">
          <div className="text-white p-0 m-0 hidden md:flex flex-row gap-6 text-xl items-center justify-center h-full">
            <div className="hidden md:flex flex-row gap-6 items-center justify-center">
              <RiVideoAddLine className="hover:cursor-pointer hover:text-gray-300 h-6" />
              <FiBell className="hover:cursor-pointer hover:text-gray-300 h-6" />
            </div>
          </div>

          <div ref={dropdownRef} className="relative">
            <div className="bg-gray-800 p-0 rounded-full overflow-hidden h-8 w-8 cursor-pointer" onClick={toggleDropdown}>
              {userData && <img src={userData.photoURL} alt="p" />}
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 py-2 w-20 text-center bg-white rounded-md shadow-lg z-10 text-red-600">
                <Dropdown.Item onClick={signOutUser}>SIGN OUT</Dropdown.Item>
              </div>
            )}
          </div>
        </div>
      )}

      {loading && <Loader />}
    </div>
  );
}

export default Header;