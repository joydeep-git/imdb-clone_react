import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import LeftNavMenuItem from './LeftNavMenuItem';
import { categories } from '../utils/constants';
import { Context } from '../context/contextApi';

function LeftNav() {
  const { selectedCatagories, setSelectedCatagories, mobileMenu } = useContext(Context);

  const redirect = useNavigate("/");

  const clickHandler = (name, type) => {
    switch (type) {
      case "category":
        return setSelectedCatagories(name);
      case "home":
        return setSelectedCatagories(name);
      case "menu":
        return false;
      default:
        break;
    }
  };

  return (
    <div className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-black absolute md:relative z-10 translate-x-[-240px] md:translate-x-0 transition-all ${mobileMenu ? "translate-x-0" : ""
      }`}>
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
                    redirect("/")
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
          Clone by  : Joydeep Das
        </div>
      </div>
    </div>
  )
}

export default LeftNav;