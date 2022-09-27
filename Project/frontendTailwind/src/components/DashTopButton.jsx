import React from 'react'
import { useStateContext } from '../contexts/ContextProvider';

const DashTopButton = ({value}) => {
    const { currentColor } = useStateContext();
  return (
    <button
        type="button"
        className="text-md text-white opacity-0.9 p-4 hover:drop-shadow-xl rounded-full m-1" 
        style={{ background: currentColor }} 
    >
    {value}
    </button>
  )
}

export default DashTopButton