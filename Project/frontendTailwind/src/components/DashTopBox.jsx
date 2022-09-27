import React from 'react'
import { useStateContext } from '../contexts/ContextProvider';

const DashTopBox = ({icon, label, data}) => {
    const { currentColor } = useStateContext();
  return (
    <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl m-2 hover:drop-shadow-xl">
    <button
        type="button"
        className="text-2xl text-white opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl" 
        style={{ background: currentColor }} 
    >
        {icon}
    </button>

    <p className="mt-3">
        <span className="text-lg font-semibold">{data}</span>
    </p>

    <p className="text-sm text-gray-400  mt-1">{label}</p>
</div>
  )
}

export default DashTopBox