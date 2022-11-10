import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import {
  FiUser,
  FiCalendar,
  FiBarChart,
  FiUsers,
  FiFileText,
  FiTool,
  FiPackage,
  FiTrendingUp,
  FiShoppingBag,
  FiGift,
} from 'react-icons/fi';
import { GiSewingMachine, GiSteeringWheel } from 'react-icons/gi';
import { HiUserGroup } from 'react-icons/hi';
import { IoBagHandleOutline } from 'react-icons/io5';
import {
  TbBuildingWarehouse,
  TbTruckDelivery,
  TbReportMoney,
  TbBuildingFactory2,
} from 'react-icons/tb';
import { FaHouseDamage, FaRegMoneyBillAlt, FaChartLine } from 'react-icons/fa';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import logo from '../data/logo.png';

import { useStateContext } from '../contexts/ContextProvider';

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
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2 transition duration-300 ease-in-out';

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
              <img src={logo} alt="logo" />
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
            {/*<NavLink
              to="/WelfareDashboard"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FiGift /> {/*  icon  */}
            {/*} <span className="capitalize ">Welfare</span>{' '}
              {/*  link name  */}
            {/*</NavLink>*/}

            {/*  menu ---------------------------------------------------------------------------------- menu  */}
            <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
              Finance management {/*  menu name  */}
            </p>

            {/*  links ---------------------------------------------------------------------------------- links  */}

            <NavLink
              to="/FinanceDashboard"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <TbReportMoney /> {/*  icon  */}
              <span className="capitalize ">Finance Center</span>{' '}
              {/*  link name  */}
            </NavLink>

            {/*  links ---------------------------------------------------------------------------------- links  */}

            <NavLink
              to="/SalaryDashboard"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FaRegMoneyBillAlt /> {/*  icon  */}
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
              <FiShoppingBag /> {/*  icon  */}
              <span className="capitalize ">Order Handling</span>{' '}
              {/*  link name  */}
            </NavLink>

            {/*  links ---------------------------------------------------------------------------------- links  */}

            <NavLink
              to="/CustomerDashboard"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <HiUserGroup />
              {/*  icon  */}
              <span className="capitalize ">Customer Management</span>{' '}
              {/*  link name  */}
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
              <TbBuildingFactory2 /> {/*  icon  */}
              <span className="capitalize ">Production Workflow</span>{' '}
              {/*  link name  */}
            </NavLink>

            {/*  links ---------------------------------------------------------------------------------- links  */}

            <NavLink
              to="/insightDashboard"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FaChartLine /> {/*  icon  */}
              <span className="capitalize ">Insights</span> {/*  link name  */}
            </NavLink>
            {/*  done ---------------------------------------------------------------------------------- done  */}

            {/*  menu ---------------------------------------------------------------------------------- menu  */}
            <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
              Stock management {/*  menu name  */}
            </p>

            {/*  links ---------------------------------------------------------------------------------- links  */}

            <NavLink
              to="/StockDashboard"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <TbBuildingWarehouse /> {/*  icon  */}
              <span className="capitalize ">Stock Information</span>{' '}
              {/*  link name  */}
            </NavLink>

            {/*  links ---------------------------------------------------------------------------------- links  */}

            <NavLink
              to="/StockUtilisationDashboard"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FaChartLine /> {/*  icon  */}
              <span className="capitalize ">Stock Utilisation</span>{' '}
              {/*  link name  */}
            </NavLink>
            {/*  done ---------------------------------------------------------------------------------- done  */}

            {/*  menu ---------------------------------------------------------------------------------- menu  */}
            <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
              Supplier management {/*  menu name  */}
            </p>

            {/*  links ---------------------------------------------------------------------------------- links  */}

            <NavLink
              to="/SupplierDashboard"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FiUsers /> {/*  icon  */}
              <span className="capitalize ">Supplier Details</span>{' '}
              {/*  link name  */}
            </NavLink>

            {/*  links ---------------------------------------------------------------------------------- links  */}

            <NavLink
              to="/PurchaseOrderDetailsDashboard"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FiFileText /> {/*  icon  */}
              <span className="capitalize ">Purchase Order Details</span>{' '}
              {/*  link name  */}
            </NavLink>
            {/*  done ---------------------------------------------------------------------------------- done  */}

            {/*  menu ---------------------------------------------------------------------------------- menu  */}
            <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
              Machinery and Maintenance management {/*  menu name  */}
            </p>

            {/*  links ---------------------------------------------------------------------------------- links  */}

            <NavLink
              to="/MachineryDashboard"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <GiSewingMachine /> {/*  icon  */}
              <span className="capitalize ">Machinery Details</span>{' '}
              {/*  link name  */}
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
              <FiTool /> {/*  icon  */}
              <span className="capitalize ">Maintenance Records</span>{' '}
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
              <TbTruckDelivery /> {/*  icon  */}
              <span className="capitalize ">Transport Details</span>{' '}
              {/*  link name  */}
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
              <GiSteeringWheel /> {/*  icon  */}
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
