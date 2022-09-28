import React from 'react';
import { Outlet } from 'react-router-dom';
import DriverNavbar from './DriverNavbar';

const DriverSharedLayout = () => {
  return (
    <div>
      <DriverNavbar />
      <Outlet />
    </div>
  );
};

export default DriverSharedLayout;
