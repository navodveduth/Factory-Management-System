import React from 'react'
import { useStateContext } from '../contexts/ContextProvider';

const DashTopBox = ({icon, label, data}) => {
    const { currentColor } = useStateContext();
  return (
    <div className="flex items-start bg-white p-4 py-8 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl m-2 hover:drop-shadow-xl ">
      <div>
      <button
            type="button"
            className="text-2xl text-white opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl" 
            style={{ background: currentColor }} 
        >
            {icon}
        </button>
      </div>

      <div className="ml-4">
        <h2 className="font-semibold text-xl">{data}</h2>
        <p className="mt-2 text-sm">{label}</p>
      </div>
    </div>
  );
};

export default DashTopBox;

