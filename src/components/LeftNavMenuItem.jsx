import React from 'react';

function LeftNavMenuItem({name, icon, className, action}) {

  return (
    <div className={`flex flex-row items-center gap-3 text-sm cursor-pointer hover:bg-white/[0.2] rounded-lg p-2 ` + className} onClick={action}>
      <span>{icon}</span>
      <span>{name}</span>
    </div>
  )
}

export default LeftNavMenuItem;