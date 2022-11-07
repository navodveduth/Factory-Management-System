import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { Button } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import avatar from '../data/avatar.jpg';

const FilterPopup = () => {
  const { currentColor } = useStateContext();

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-400">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">Filter dates</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <div>
            
        </div>
        <div>
            <div className="flex gap-5 items-center">
                <p className="font-semibold text-xl dark:text-gray-200"> From :  </p>
                <input className='mr-2 rounded-lg p-2 dark:bg-secondary-dark-bg dark:text-gray-200' type='date' />
            </div>
            <div className="flex gap-5 items-cente">
                <p className="font-semibold text-xl dark:text-gray-200"> To :  </p>
                <input className='rounded-lg p-2 dark:bg-secondary-dark-bg dark:text-gray-200' type='date' />
            </div>
        </div>
      </div>
      
      <div className="mt-5">
        <Button
          color="white"
          bgColor={currentColor}
          text="Filter"
          borderRadius="10px"
          width="full"
        />
      </div>
    </div>

    );
};

export default FilterPopup;
