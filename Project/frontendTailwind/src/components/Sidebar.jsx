import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import { FiUser, FiCalendar, FiBarChart } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { useStateContext } from '../contexts/ContextProvider';
import MaintenanceDashboard from './../pages/MachineryAndMaintenance/MaintenanceDashboard';

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <span>Factory Management System</span> {/*  system name  */}
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10 ">
            {/*  menu ---------------------------------------------------------------------------------- menu  */}
            <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
              Employee management {/*  menu name  */}
            </p>

            {/*  links ---------------------------------------------------------------------------------- links  */}

            <NavLink
              to="/EmployeeDashboard"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FiUser /> {/*  icon  */}
              <span className="capitalize ">Employees</span> {/*  link name  */}
            </NavLink>

            {/*  links ---------------------------------------------------------------------------------- links  */}

            <NavLink
              to="/AttendanceAndLeaveDashboard"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FiCalendar /> {/*  icon  */}
              <span className="capitalize ">Attendace and leaves</span>{' '}
              {/*  link name  */}
            </NavLink>

            {/*  links ---------------------------------------------------------------------------------- links  */}

            <NavLink
              to="/Salary"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FiBarChart /> {/*  icon  */}
              <span className="capitalize ">Salary</span> {/*  link name  */}
            </NavLink>

<<<<<<< HEAD
            {/*  done ---------------------------------------------------------------------------------- done  */}

            {/*  menu ---------------------------------------------------------------------------------- menu  */}
            <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
              Finance management {/*  menu name  */}
            </p>
=======
                {/*  links ---------------------------------------------------------------------------------- links  */}
                
                  <NavLink to="/FinanceDashboard" onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    <MdOutlineCancel /> {/*  icon  */}
                    <span className="capitalize ">Finance Center</span> {/*  link name  */}
                  </NavLink>
                
                {/*  links ---------------------------------------------------------------------------------- links  */}

                  <NavLink to="/SalaryDashboard" onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    <MdOutlineCancel /> {/*  icon  */}
                    <span className="capitalize ">Salary</span> {/*  link name  */}
                  </NavLink>
                {/*  done ---------------------------------------------------------------------------------- done  */}
>>>>>>> ff21ce7bcb0bff4d9c461c2e5cf484269e150b98

            {/*  links ---------------------------------------------------------------------------------- links  */}

            <NavLink
              to="/FinanceDashboard"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <MdOutlineCancel /> {/*  icon  */}
              <span className="capitalize ">Finance Center</span> {/*  link name  */}
            </NavLink>

            {/*  links ---------------------------------------------------------------------------------- links  */}

                  <NavLink to="/SalaryDashboard" onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    <MdOutlineCancel /> {/*  icon  */}
                    <span className="capitalize ">Salary</span> {/*  link name  */}
                  </NavLink>
                {/*  done ---------------------------------------------------------------------------------- done  */}



                {/*  menu ---------------------------------------------------------------------------------- menu  */}
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  Sales management {/*  menu name  */}
                </p>

            {/*  links ---------------------------------------------------------------------------------- links  */}

            <NavLink
              to="/SalesDashboard"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <MdOutlineCancel /> {/*  icon  */}
              <span className="capitalize ">Sales Management</span> {/*  link name  */}
            </NavLink>

            {/*  links ---------------------------------------------------------------------------------- links  */}

                  <NavLink to="/SalesDashboard" onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    <MdOutlineCancel /> {/*  icon  */}
                    <span className="capitalize ">Sales 2</span> {/*  link name  */}
                  </NavLink>
                {/*  done ---------------------------------------------------------------------------------- done  */}



                {/*  menu ---------------------------------------------------------------------------------- menu  */}
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  Production management {/*  menu name  */}
                </p>

            {/*  links ---------------------------------------------------------------------------------- links  */}

            <NavLink
              to="/production"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <MdOutlineCancel /> {/*  icon  */}
              <span className="capitalize ">Production Cost</span> {/*  link name  */}
            </NavLink>

            {/*  links ---------------------------------------------------------------------------------- links  */}

            <NavLink
              to="/Attendace and leaves"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <MdOutlineCancel /> {/*  icon  */}
              <span className="capitalize ">Order Distribution</span> {/*  link name  */}
            </NavLink>
            {/*  done ---------------------------------------------------------------------------------- done  */}

            {/*  menu ---------------------------------------------------------------------------------- menu  */}
            <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
              Stock management {/*  menu name  */}
            </p>

            {/*  links ---------------------------------------------------------------------------------- links  */}

            <NavLink
              to="/Employee"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <MdOutlineCancel /> {/*  icon  */}
              <span className="capitalize ">Stock</span> {/*  link name  */}
            </NavLink>

            {/*  links ---------------------------------------------------------------------------------- links  */}

<<<<<<< HEAD
            <NavLink
              to="/Attendace and leaves"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <MdOutlineCancel /> {/*  icon  */}
              <span className="capitalize ">Damaged stock</span>{' '}
              {/*  link name  */}
            </NavLink>
            {/*  done ---------------------------------------------------------------------------------- done  */}

            {/*  menu ---------------------------------------------------------------------------------- menu  */}
            <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
              Supplier management {/*  menu name  */}
            </p>
=======
                {/*  links ---------------------------------------------------------------------------------- links  */}
                
                  <NavLink to="/SupplierDashBoard" onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    <MdOutlineCancel /> {/*  icon  */}
                    <span className="capitalize ">Supplier Details</span> {/*  link name  */}
                  </NavLink>
                
                {/*  links ---------------------------------------------------------------------------------- links  */}

                  <NavLink to="/Attendace and leaves" onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    <MdOutlineCancel /> {/*  icon  */}
                    <span className="capitalize ">Supplier Records</span> {/*  link name  */}
                  </NavLink>
                {/*  done ---------------------------------------------------------------------------------- done  */}
>>>>>>> ff21ce7bcb0bff4d9c461c2e5cf484269e150b98

                {/*  links ---------------------------------------------------------------------------------- links  */}
                
                  <NavLink to="/SupplierDashBoard" onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    <MdOutlineCancel /> {/*  icon  */}
                    <span className="capitalize ">Supplier Details</span> {/*  link name  */}
                  </NavLink>
                
                {/*  links ---------------------------------------------------------------------------------- links  */}

                  <NavLink to="/Attendace and leaves" onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    <MdOutlineCancel /> {/*  icon  */}
                    <span className="capitalize ">Supplier Records</span> {/*  link name  */}
                  </NavLink>
                {/*  done ---------------------------------------------------------------------------------- done  */}

<<<<<<< HEAD
            {/*  links ---------------------------------------------------------------------------------- links  */}

            <NavLink
              to="/Attendace and leaves"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <MdOutlineCancel /> {/*  icon  */}
              <span className="capitalize ">Supply 2</span> {/*  link name  */}
            </NavLink>
            {/*  done ---------------------------------------------------------------------------------- done  */}
=======
                {/*  links ---------------------------------------------------------------------------------- links  */}
                
                  <NavLink to="/MachineryDashboard" onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    <MdOutlineCancel /> {/*  icon  */}
                    <span className="capitalize ">Machinery</span> {/*  link name  */}
                  </NavLink>
                
                {/*  links ---------------------------------------------------------------------------------- links  */}

                  <NavLink to="/MaintenanceDashboard" onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    <MdOutlineCancel /> {/*  icon  */}
                    <span className="capitalize ">Maintenance</span> {/*  link name  */}
                  </NavLink>
>>>>>>> ff21ce7bcb0bff4d9c461c2e5cf484269e150b98

            {/*  menu ---------------------------------------------------------------------------------- menu  */}
            <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
              Machinery and Maintenance management {/*  menu name  */}
            </p>

                {/*  links ---------------------------------------------------------------------------------- links  */}
                
                  <NavLink to="/MachineryDashboard" onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    <MdOutlineCancel /> {/*  icon  */}
                    <span className="capitalize ">Machinery</span> {/*  link name  */}
                  </NavLink>
                
                {/*  links ---------------------------------------------------------------------------------- links  */}

            <NavLink
              to="/MaintenanceDashboard"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <MdOutlineCancel /> {/*  icon  */}
              <span className="capitalize ">Maintenance</span>{' '}
              {/*  link name  */}
            </NavLink>

            {/*  links ---------------------------------------------------------------------------------- links  */}

                
                {/*  done ---------------------------------------------------------------------------------- done  */}

            {/*  menu ---------------------------------------------------------------------------------- menu  */}
            <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
              Transport management {/*  menu name  */}
            </p>

            {/*  links ---------------------------------------------------------------------------------- links  */}

            <NavLink
              to="/TransportDashboard"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <MdOutlineCancel /> {/*  icon  */}
              <span className="capitalize ">Transport</span> {/*  link name  */}
            </NavLink>

            {/*  links ---------------------------------------------------------------------------------- links  */}

            <NavLink
              to="/DriverDashboard"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <MdOutlineCancel /> {/*  icon  */}
              <span className="capitalize ">Drivers</span> {/*  link name  */}
            </NavLink>
            {/*  done ---------------------------------------------------------------------------------- done  */}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
