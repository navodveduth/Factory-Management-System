import React from 'react'
import { useStateContext } from '../contexts/ContextProvider';

const DashTopButton = ({value, icon}) => {
    const { currentColor } = useStateContext();
  return (
    <div>
      <button
        type="button"
        className="flex text-md text-white opacity-0.9 p-4 hover:drop-shadow-xl rounded-2xl m-1" 
        style={{ background: currentColor }} 
      >
        <div className=" text-2xl mr-2 "> {icon} </div>
        {value}
      </button>
    </div>
  );
};

export default DashTopButton;
