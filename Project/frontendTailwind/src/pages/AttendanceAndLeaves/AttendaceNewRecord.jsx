import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import  { Header, Navbar, Footer, Sidebar, ThemeSettings } from '../../components';

import { useStateContext } from '../../contexts/ContextProvider';

import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

function AttendanceNewRecord() {

  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const navigate = useNavigate();

  const [employeeNumber, setEmployeeNumber] = useState('');
  const [employeeInTime, setEmployeeInTime] = useState('');
  const [employeeOutTime, setEmployeeOutTime] = useState('');
  var [employeeTotalHours, setEmployeeTotalHours] = useState('');
  var [employeeOTHours, setEmployeeOTHours] = useState('');
  var [attendanceStatus, setAttendanceStatus] = useState('');

  
  const date = new Date();
  const currentDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, -8);
  const totalHours = new Date(employeeOutTime).getTime() - new Date(employeeInTime).getTime();
  const totalHoursInHours = Math.floor(totalHours / 1000 / 60 / 60);
  const otHours = totalHoursInHours - 8;

  function otHoursCalc(otHours) {
    if (otHours < 0) {
      otHours = 0;
    }
  }

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
                            {/* YOUR COMPONENT IMPLEMENTATION GOES HERE */}
                            {/* COPY YOUR ORIGINAL COMPONENT CODE HERE */}
                            {/* PART AFTER THE RETURN STATEMENT */}

                            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
                                    <Header category="Form" title=" Record Attendance" />
                                    <div className=" flex items-center justify-center "> 
                                      <form onSubmit={async(e)=>{
                                          e.preventDefault();

                                          employeeTotalHours = totalHoursInHours;
                                          employeeOTHours = otHours;

                                          if(employeeOutTime < employeeInTime){
                                            alert("Out time cannot be less than In time");
                                          }
                                          if(employeeOutTime === employeeInTime){
                                            alert("Out time cannot be equal to In time");
                                          }
                                          else{

                                            const newAttendance = {
                                                employeeNumber,
                                                employeeInTime,
                                                employeeOutTime,
                                                employeeTotalHours,
                                                employeeOTHours,
                                                attendanceStatus
                                            }
                                            
                                            await axios.post("http://localhost:8070/attendance/createAttendance", newAttendance)
                                                .then((res)=>{
                                                  Swal.fire({  
                                                    icon: 'success',
                                                    title: 'Data Saved Successfully',
                                                    color: '#f8f9fa',
                                                    background: '#6c757d',
                                                    showConfirmButton: false,
                                                    timer: 2000
                                                  })
                                                navigate('/AttendanceAndLeaveDashboard');
                                                })
                                                .catch((err)=>{
                                                    console.log(err);
                                                    alert("Error occured");
                                                })
                                              
                                          }
                                      }}>

                                        <div className="mb-3">
                                          <label htmlFor="employeeNumber" className="form-label">Employee Number : </label>
                                          <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                          id="employeeNumber" placeholder="Enter the employee number" 
                                          pattern="[0-9]{4}" title="The Employee Number should contain 4 digits" maxLength={4} required 
                                          onChange={(e)=>{
                                              setEmployeeNumber(e.target.value);
                                          }}/>
                                        </div>

                                        <div className="mb-3">
                                          <label htmlFor="employeeInTime" className="form-label">Employee In Time : </label>
                                          <input type="datetime-local" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                          id="employeeInTime" placeholder="Enter the employee in time"
                                          onChange={(e)=>{
                                              setEmployeeInTime(e.target.value);
                                          }}/>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="employeeOutTime" className="form-label">Employee Out Time : </label>
                                            <input type="datetime-local" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                            id="employeeOutTime" placeholder="Enter the employee out time"
                                            onChange={(e)=>{
                                                setEmployeeOutTime(e.target.value);
                                            }
                                            }/>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="employeeTotalHours" className="form-label">Employee Total Hours : </label>
                                            <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                            id="employeeTotalHours" placeholder="Enter the employee total hours" value={totalHoursInHours} readOnly/>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="employeeOTHours" className="form-label">Employee OT Hours : </label>
                                            <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                            id="employeeOTHours" placeholder="Enter the employee OT hours" value={otHours} readOnly />
                                        </div>

                                        <div className="mb-3">
                                          <label htmlFor="attendanceStatus" className="form-label">Attendance Status : </label>
                                          <select className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                          id="attendanceStatus" aria-label="Default select example" title="Select the attendance status" defaultValue={"In"} required="required"
                                          onChange={(e) =>{
                                            setAttendanceStatus(e.target.value);
                                          }}>
                                              <option value="In">In</option>
                                              <option value="Out">Out</option>
                                          </select>
                                        </div>
                                        
                                        <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Record Attendance</button>
                                      </form>
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

export default AttendanceNewRecord;