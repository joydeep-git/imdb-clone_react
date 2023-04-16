import React, { useContext, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

import ytLogo from "../Assets/yt-logo.png";
import ytLogoMobile from "../Assets/yt-logo-mobile.png";

import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";

import { Context } from "../context/contextApi";

function Header() {

  const [searchQuery, setSearchQuery] = useState("");

  const redirect = useNavigate();

  const { loading, mobileMenu, setMobileMenu } = useContext(Context);

  const searchQueryHandler = (e) => {
    if ((e?.key === "enter" || e === "searchButton ") && searchQuery?.length > 0) {
      redirect(`/searchResult/${searchQuery}`)
    }
  }

  const mobileMenuToggle = () => {
    setMobileMenu(!mobileMenu)
  }

  const { pathname } = useLocation();
  const pageName = pathname?.split(`/`)?.filter(Boolean)?.[0]

  return (
    <div className="sticky top-0 z-10 flex flex-row items-center justify-between h-14 px-4 md:px-5 bg-black">

      <div className="">
          {pageName !== "video" && (
            <div className="" onClick={mobileMenuToggle}>
              {mobileMenu ? (<CgClose className="text-white text-xl" />) : ( <SlMenu  className="text-white text-xl" /> )}
            </div>
          )}
      </div>

    </div>
  )
}

export default Header;