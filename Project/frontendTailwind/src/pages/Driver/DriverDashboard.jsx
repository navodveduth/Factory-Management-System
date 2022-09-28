import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiUser } from 'react-icons/fi';
import { DashTopBox, DashTopButton } from '../../components';
import DriverViewAll from './DriverViewAll';

import { useStateContext } from '../../contexts/ContextProvider';

const DriverDashboard = () => {
  const { currentColor, currentMode } = useStateContext();

  return (
    <div className="mt-5">
      <div className="flex flex-wrap lg:flex-nowrap justify-left ml-10 mt-5">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* top buttons in the dashboard */} {/* use for navigation buttons*/}
          <Link to="/DriverViewAll">
            <DashTopButton value="View All Driver Details" />
          </Link>
          <Link to="/DriverCreate">
            <DashTopButton value="Create New Record" />
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* small top boxes in the dashboard */}
          {/* use minimum 3, maximum 5 */}
          <DashTopBox icon={<FiUser />} label="Total Drivers" data="100" />
          <DashTopBox icon={<FiUser />} label="Total Drivers" data="100" />
          <DashTopBox icon={<FiUser />} label="Total Drivers" data="100" />
          <DashTopBox icon={<FiUser />} label="Total Drivers" data="100" />
        </div>
      </div>
    </div>

    /* <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
        ----------use this div to create your graphs.--------------
        ----------one div per graph -------------------------------
       <div>*/
  );
};

export default DriverDashboard;
