import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiUser, FiUsers, FiUserPlus } from 'react-icons/fi';
import { FaUsers, FaUserCheck, FaUserTimes, FaCalendarTimes } from 'react-icons/fa';
import { BiCalendar, BiCalendarPlus, BiCalendarCheck, BiCalendarEvent } from 'react-icons/bi';
import { DashTopBox, DashTopButton, Navbar, Footer, Sidebar, ThemeSettings, Header, AttendancePieChart } from '../../components';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';

import { useStateContext } from '../../contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';


const AttendanceAndLeaveDashboard = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

  const [employee, setEmployee] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const[leave, setLeave] = useState([]);

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

  const getAttendance = async () => {
    axios
      .get('http://localhost:8070/attendance/viewAttendance')
      .then((res) => {
        setAttendance(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const getLeave = async () => {
    axios
      .get('http://localhost:8070/leave/viewLeave')
      .then((res) => {
        setLeave(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getEmployee();
    getAttendance();
    getLeave();
    const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  console.log(employee);
  console.log(attendance);
  console.log(leave);

  const empCount = employee.length;
  const date = new Date().toISOString();
  const countPresent = attendance.filter((att) => new Date(att.employeeInTime).toISOString().slice(0, 10) === date.slice(0, 10)).length;
  const countAbsent = empCount - countPresent;
  const countPending = leave.filter((leav) => leav.leaveStatus === 'Pending').length;
  
  return (
    <div>

      {/* DON'T CHANGE ANYTHING HERE */}

        <div className={currentMode === 'Dark' ? 'dark' : ''}>

            <div className="flex relative dark:bg-main-dark-bg">

                <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}> {/* THEME SETTINGS BUTTON */}
                    <TooltipComponent content="Settings" position="Top">
                    <button
                        type="button"
                        onClick={() => setThemeSettings(true)}
                        style={{ background: currentColor, borderRadius: '50%' }}
                        className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                    >
                        <FiSettings />
                    </button>
                    </TooltipComponent>
                </div>


                {activeMenu ? ( // SIDEBAR IMPLEMENTATION
                    <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                    <Sidebar />
                    </div>
                ) : (
                    <div className="w-0 dark:bg-secondary-dark-bg">
                    <Sidebar />
                    </div>
                )}

                <div
                    className={ // MAIN BACKGROUND IMPLEMENTATION
                    activeMenu
                        ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                        : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                    }
                >
                    
                    {/* NAVBAR IMPLEMENTATION */}
                    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                        <Navbar />
                    </div>

                    <div>
                        {themeSettings && <ThemeSettings />}
                        <div>
                          <div className="mt-5">
                            <div className="flex flex-wrap lg:flex-nowrap justify-left ml-5 mt-5">
                              <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                                {/* top buttons in the dashboard */} {/* use for navigation buttons*/}
                                <Link to="/AttendanceViewAll">
                                  <DashTopButton value="All Attendance" icon={<BiCalendarEvent/>} />
                                </Link>
                                <Link to="/AttendanceCreate">
                                  <DashTopButton value="Record Attendance" icon={<BiCalendarCheck/>}/>
                                </Link>
                                <Link to="/AttendanceNewRecord">
                                  <DashTopButton value="Record Attendance 2" icon={<BiCalendarCheck/>}/>
                                </Link>
                                <Link to="/LeaveViewAll">
                                  <DashTopButton value="All Leaves" icon={<BiCalendar/>}/>
                                </Link>
                                <Link to="/LeaveCreate">
                                  <DashTopButton value="Request Leave" icon={<BiCalendarPlus/>}/>
                                </Link>
                              </div>
                            </div>

                            <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
                              <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                                {/* small top boxes in the dashboard */} {/* use minimum 3, maximum 5 */}
                                <Link to="/EmployeeViewAll">
                                  <DashTopBox icon={<FaUsers />} label="Total Employees" data={empCount} /> 
                                </Link>
                                <DashTopBox icon={<FaUserCheck />} label="Attended Today" data={countPresent} />
                                <DashTopBox icon={<FaUserTimes />} label="Absent Today" data={countAbsent} />
                                <Link to="/LeaveViewAll">
                                  <DashTopBox icon={<FaCalendarTimes />} label="Pending Leaves" data={countPending} />
                                </Link>
                              </div>
                            </div>
                          </div>

                          {/*<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
                            <AttendancePieChart />
                  </div>*/}

                          <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">

                              <Header category="Table" title="Today's Attendance" />

                              <div className="block w-full overflow-x-auto rounded-lg" id="tableContainer">
                                <table className="w-full rounded-lg">
                                  <thead>
                                    <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                                      <TableHeader value="Employee ID" />
                                      <TableHeader value="Date" />
                                      <TableHeader value="In-Time" />
                                      <TableHeader value="Out-Time" />
                                      <TableHeader value="Status" />
                                      </tr>
                                  </thead>

                                  <tbody>
                                    {attendance.filter((data) => {
                                      const date = new Date(data.employeeInTime).toISOString().split('T')[0];
                                      if(date == new Date().toISOString().split('T')[0]){
                                          return data;
                                    }
                                    }).map((data, key) => {
                                      return (
                                        <tr key={key} className="text-sm h-10 border dark:border-slate-600">
                                          <TableData value={data.employeeNumber} />
                                          <TableData value={new Date(data.employeeInTime).toISOString().split('T')[0]} />
                                          <TableData value={new Date(data.employeeInTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} />
                                          <TableData value={new Date(data.employeeOutTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} />
                                          <TableData value={data.attendanceStatus} />
                                        </tr>
                                      )
                                      })}
                                  </tbody>
                                </table>
                              </div>
                            </div>

                            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
    
                              <Header category="Table" title="Today's Leaves" />

                              <div className="block w-full overflow-x-auto rounded-lg" id="tableContainer">
                                <table className="w-full rounded-lg">
                                    <thead>
                                    <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                                        <TableHeader value="Employee ID" />
                                        <TableHeader value="Leave Type" />
                                        <TableHeader value="Start Date" />
                                        <TableHeader value="End Date" />
                                        <TableHeader value="Reason" />
                                        <TableHeader value="Status" />
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {leave.filter((data) => {
                                      const date = new Date(data.leaveStartDate).toISOString().split('T')[0];
                                      if(date == new Date().toISOString().split('T')[0]){
                                          return data;
                                    }
                                    }).map((data, key) => (
                                        <tr className="text-sm h-10 border dark:border-slate-600" key={key}>
                                            <TableData value={data.employeeNumber} />
                                            <TableData value={data.leaveType} />
                                            <TableData value={new Date(data.leaveStartDate).toISOString().split('T')[0]} />
                                            <TableData value={new Date(data.leaveEndDate).toISOString().split('T')[0]} />
                                            <TableData value={data.leaveReason} />
                                            <TableData value={data.leaveStatus} />
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                              </div>
                            </div> 

                        </div>
                        <Footer />
                    </div>  
                </div>
            </div>
        </div>
    </div>
  );
};

export default AttendanceAndLeaveDashboard;