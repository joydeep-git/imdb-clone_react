import React, { useContext, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

import ytLogo from "../Assets/yt-logo.png";
import ytLogoMobile from "../Assets/yt-logo-mobile.png";
import cartoonDP from "../Assets/cartoon-dp.jpg";

import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";

import { Context } from "../context/contextApi";

function Header() {

  const [searchQuery, setSearchQuery] = useState("");

  const redirect = useNavigate();

  const { mobileMenu, setMobileMenu } = useContext(Context);
  // loading

  const searchQueryHandler = (e) => {
    if ((e?.key === "enter" || e === "searchButton") && searchQuery?.length > 0) {
      redirect(`/searchResult/${searchQuery}`)
    }
  }

  const mobileMenuToggle = () => {
    setMobileMenu(!mobileMenu)
  }

  const { pathname } = useLocation();
  const pageName = pathname?.split(`/`)?.filter(Boolean)?.[0]

  return (
    <div className="sticky top-0 z-10 flex flex-row items-center justify-between h-14 px-4 md:px-5 bg-[#0e0f0e]">

      <div className="flex justify-center items-center flex-row gap-6">
        {pageName !== "video" && (
          <div className="" onClick={mobileMenuToggle}>
            {mobileMenu ? (<CgClose className="text-white text-xl" />) : (<SlMenu className="text-white text-xl" />)}
          </div>
        )}

        <Link to="/">
          <img src={ytLogo} alt="YouTube" className="h-4 hidden sm:block" />
          <img src={ytLogoMobile} alt="" className="h-4 block sm:hidden" />
        </Link>
      </div>

      <div className="flex flex-row m-4 p-0 items-center justify-center gap-0 border-[1px] border-white rounded-full">
        <div className="p-0.5 md:p-0.5 md:pl-4 m-0 border-r-[1px] rounded-l-full">
          <input type="text" placeholder="Search on YouTube"
            className="bg-transparent outline-none text-white p-0.5 text-xl w-32 md:p-[0,1rem] md:pl-0 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]  text-[0.75rem] items-center justify-center"
            onChange={(e) => setSearchQuery(e.target.value)} onKeyUp={searchQueryHandler} value={searchQuery} />
        </div>
        <div className="p-2 cursor-pointer" onClick={() => searchQueryHandler("searchButton")}>
          <IoIosSearch className="text-white h-full cursor-pointer" />
        </div>
      </div>

      <div className="text-white p-0 m-0 hidden md:flex flex-row gap-6 text-xl items-center justify-center h-full">
        <div className="hidden md:flex flex-row gap-6 items-center justify-center">
          <RiVideoAddLine className="hover:cursor-pointer hover:text-gray-300 h-6" />
          <FiBell className="hover:cursor-pointer hover:text-gray-300 h-6" />
        </div>
        <div className="bg-gray-800 p-0 rounded-full overflow-hidden h-8 w-8">
          <img src={cartoonDP} alt="profile" className="h-8 object-cover cursor-pointer" />
        </div>

      </div>

    </div>
  )
}

export default Header;