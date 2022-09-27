import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiUser } from 'react-icons/fi';
import { DashTopBox, DashTopButton } from '../components';

import { useStateContext } from '../contexts/ContextProvider';


const EmployeeDashboard = () => {
  const { currentColor, currentMode } = useStateContext();

  return (
    <div className="mt-5">

      <div className="flex flex-wrap lg:flex-nowrap justify-left ml-10 mt-5">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* top buttons in the dashboard */} {/* use for navigation buttons*/}
          <Link to="/EmployeeViewAll">
            <DashTopButton value="View All employees" />
          </Link>
          <Link to="/EmployeeCreate">
            <DashTopButton value="Create New Employee" />
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* small top boxes in the dashboard */} {/* use minimum 3, maximum 5 */}
          <DashTopBox icon={<FiUser />} label="Total Employees" data="100" />
          <DashTopBox icon={<FiUser />} label="Total Employees" data="100" />
          <DashTopBox icon={<FiUser />} label="Total Employees" data="100" />
          <DashTopBox icon={<FiUser />} label="Total Employees" data="100" />       
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
