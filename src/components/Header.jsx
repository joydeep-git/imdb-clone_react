import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ytLogo from "../Assets/yt-logo.png";
import ytLogoMobile from "../Assets/yt-logo-mobile.png";
import { FaBars } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { Context } from "../context/ContextApi";
import Loader from "../shared/Loader";
import { useFirebaseContext } from "../context/FirebaseContext";

function Header() {
  const { authenticated } = useFirebaseContext();
  const [searchQuery, setSearchQuery] = useState("");
  const redirect = useNavigate();
  const { mobileMenu, setMobileMenu, loading } = useContext(Context);

  const searchQueryHandler = (e) => {
    if ((e?.key === "Enter" || e === "searchButton") && searchQuery?.length > 0) {
      redirect(`/searchResult/${searchQuery}`);
    }
  };

  const mobileMenuToggle = () => {
    setMobileMenu(!mobileMenu);
  };

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
        <Link to="/login" className="text-white flex flex-row gap-2 justify-center border px-2 rounded-2xl  hover:bg-white hover:text-black items-center">
          SIGN IN
        </Link>
      ) : (
        <div className="gap-6 flex flex-row items-center justify-center">
          <div className="text-white p-0 m-0 hidden md:flex flex-row gap-6 text-xl items-center justify-center h-full">
            <div className="hidden md:flex flex-row gap-6 items-center justify-center">
              <RiVideoAddLine className="hover:cursor-pointer hover:text-gray-300 h-6" />
              <FiBell className="hover:cursor-pointer hover:text-gray-300 h-6" />
            </div>
          </div>

          <Link to='/profile' className="text-white border px-2 rounded-2xl hover:bg-white hover:text-black">
            ACCOUNT
          </Link>
        </div>
      )}

      {loading && <Loader />}
    </div>
  );
}

export default Header;