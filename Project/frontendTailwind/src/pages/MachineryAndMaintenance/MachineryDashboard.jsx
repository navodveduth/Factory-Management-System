import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GiSewingMachine } from 'react-icons/gi';
import { DashTopBox, DashTopButton } from '../../components';

import { useStateContext } from '../../contexts/ContextProvider';



const MachineryDashboard = () => {
  const { currentColor, currentMode } = useStateContext();

  return (
    <div className="mt-5">

      <div className="flex flex-wrap lg:flex-nowrap justify-left ml-10 mt-5">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* top buttons in the dashboard */} {/* use for navigation buttons*/}
          <Link to="/MachineryViewAll">
            <DashTopButton value="View All Machines" />
          </Link>
          <Link to="/MachineryCreate">
            <DashTopButton value="Add new Machine" />
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* small top boxes in the dashboard */} {/* use minimum 3, maximum 5 */}
          <DashTopBox icon={<GiSewingMachine />} label="Total Machines" data="100" />
          <DashTopBox icon={<GiSewingMachine />} label="Total Machines" data="100" />
          <DashTopBox icon={<GiSewingMachine />} label="Total Machines" data="100" />
          <DashTopBox icon={<GiSewingMachine />} label="Total Machines" data="100" />       
        </div>
      </div>
    </div>

    /* <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
        ----------use this div to create your graphs.--------------
        ----------one div per graph -------------------------------
       <div>*/
  );
};

export default MachineryDashboard;

