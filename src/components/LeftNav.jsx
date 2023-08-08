import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import LeftNavMenuItem from './LeftNavMenuItem';
import { categories } from '../utils/constants';

import { Context } from '../context/ContextApi';

function LeftNav() {
  const { selectedCatagories, setSelectedCatagories, mobileMenu, setMobileMenu } = useContext(Context);

  const navigate = useNavigate();

  const clickHandler = (name, type) => {

    setMobileMenu(!mobileMenu);

    switch (type) {
      case "category":
        return setSelectedCatagories(name);
      case "home":
        return setSelectedCatagories(name);
      case "menu":
        return false;
      case "history":
        setSelectedCatagories(null);
        navigate("/history");
        return;
      default:
        break;
    }
  };

  return (
    <div className={` ${mobileMenu ? "visible" : "hidden"} w-[240px] overflow-y-auto h-full py-4 bg-[#0e0d0d] z-10 transition-all absolute`}>
      <div className='flex flex-col px-5 text-white'>
        {
          categories.map((item) => {
            return (
              <React.Fragment key={item.name}>
                <LeftNavMenuItem
                  name={item.type === "home" ? "Home" : item.name}
                  icon={item.icon}
                  type={item.type}
                  action={() => {
                    navigate("/")
                    clickHandler(item.name, item.type);
                  }}
                  className={`${selectedCatagories === item.name ? "bg-white/[0.5]" : " "}`}
                />
                {
                  item.divider && (
                    <hr className="my-5 border-white/[0.2]" />
                  )
                }
              </React.Fragment>
            )
          })
        }
        <hr className="my-5 border-white/[0.2]" />
        <div className='text-xs text-white'>
          Clone by  : &nbsp; &nbsp; <br />
          <a href="https://jd-protfolio-react.netlify.app"
            className='text-blue-700 font-bold text-xl p-0 m-0'
            target='blank'
            rel="noopener noreferrer">
            Joydeep Das
          </a>
        </div>
      </div>
    </div>
  )
}

export default LeftNav;