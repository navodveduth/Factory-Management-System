import React from 'react';
import { Outlet } from 'react-router-dom';
import TransportNavbar from './TransportNavbar';

function TransportSharedLayout() {
  return (
    <div>
      <TransportNavbar />
      <Outlet />
    </div>
  );
}

export default TransportSharedLayout;
