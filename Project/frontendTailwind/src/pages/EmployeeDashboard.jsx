import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiUser } from 'react-icons/fi';
import { DashTopBox, DashTopButton, EmployeePieChart, ChartsHeader } from '../components';

import { useStateContext } from '../contexts/ContextProvider';


const EmployeeDashboard = () => {
  const { currentColor, currentMode } = useStateContext();

  const [employee, setEmployee] = useState([]);

  const getEmployee = async () => {
    axios
      .get('http://localhost:8070/employee/viewEmployee')
      .then((res) => {
        setEmployee(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getEmployee();
  }, []);

  const empCount = employee.length;
  const empCountManager= employee.filter((emp) => emp.employeeDesignation === 'Manager').length;
  const empCountDriver= employee.filter((emp) => emp.employeeDesignation === 'Driver').length;
  const empCountFinance= employee.filter((emp) => emp.employeeDepartment === 'Finance').length;

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
          <DashTopBox icon={<FiUser />} label="Total Employees" data={empCount} />
          <DashTopBox icon={<FiUser />} label="Total Managers" data={empCountManager} />
          <DashTopBox icon={<FiUser />} label="Total Drivers" data={empCountDriver} />
          <DashTopBox icon={<FiUser />} label="Finance Employees" data={empCountFinance} />       
        </div>
      </div>

      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
          <EmployeePieChart />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
