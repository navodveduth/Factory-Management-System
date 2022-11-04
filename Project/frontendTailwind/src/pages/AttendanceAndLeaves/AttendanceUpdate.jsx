import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header, Navbar, Footer, Sidebar, ThemeSettings } from '../../components';

import { useStateContext } from '../../contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

const AttendanceUpdate = () => {

  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

  const navigate = useNavigate();

  const [employeeNumber, setEmployeeNumber] = useState('');
  const [employeeInTime, setEmployeeInTime] = useState('');
  const [employeeOutTime, setEmployeeOutTime] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState('');

  const {id} = useParams();

  const getAttendance = () => {
    axios.get(`http://localhost:8070/attendance/viewAttendance/${id}`)
    .then((res) => {
 
      const date = new Date(res.data.employeeInTime);
      const startTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, -8);

      //const dateOut = new Date(res.data.employeeOutTime);
      //const endTime = new Date(dateOut.getTime() - (dateOut.getTimezoneOffset() * 60000)).toISOString().slice(0, -8);4
      var dateOut;
      var endTime;
      if (res.data.employeeOutTime != null )  {
        dateOut = new Date(res.data.employeeOutTime);
        endTime = new Date(dateOut.getTime() - (dateOut.getTimezoneOffset() * 60000)).toISOString().slice(0, -8); 
      } else {
        endTime = res.data.employeeOutTime;
      }   
      setEmployeeNumber(res.data.employeeNumber);
      setEmployeeInTime(startTime);
      setEmployeeOutTime(endTime);
      setAttendanceStatus(res.data.attendanceStatus);
    })
    .catch((err) => {
      alert(err.message);
    });
  };

  useEffect(() => {
    getAttendance();
    const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

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
                            
                            <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white '>
                              <Header category="Form" title="Update Attendance" />
                                <div className=" flex items-center justify-center">

                                    <form className="" onSubmit={async(e)=>{
                                        e.preventDefault();
                                        
                                        
                                        const NewAttendace = {
                                            employeeNumber,
                                            employeeInTime,
                                            employeeOutTime,
                                            attendanceStatus
                                        }

                                        await axios.put("http://localhost:8070/attendance/updateAttendance/"+ id, NewAttendace)
                                            .then((res)=>{
                                                alert("Data updated successfully");
                                            navigate('/AttendanceViewAll');
                                            })
                                            .catch((err)=>{
                                                console.log(err);
                                                alert("Error occured");
                                            })
                                            
                                    }}>

                                      <div className="mb-3">
                                          <label htmlFor="employeeNumber" className="text-md">Employee Number : </label>
                                          <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                              id="employeeNumber" defaultValue={employeeNumber} placeholder="Enter the employee number" required disabled
                                              />
                                      </div>
                                      <div className="mb-3">
                                          <label htmlFor="employeeInTime" className="text-md">Employee In Time : </label>
                                          <input type="datetime-local" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                              id="employeeInTime" defaultValue={employeeInTime} placeholder="Enter the employee in time" required disabled
                                              />
                                      </div>
                                      <div className="mb-3">
                                          <label htmlFor="employeeOutTime" className="text-md">Employee Out Time : </label>
                                          <input type="datetime-local" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                              id="employeeOutTime" placeholder="Enter the employee out time" value={employeeOutTime} 
                                              required 
                                              onChange={(e)=>{
                                                  setEmployeeOutTime(e.target.value);
                                              }}/>
                                      </div>
                                      <div className="mb-3">
                                          <label htmlFor="attendanceStatus" className="text-md">Attendance Status : </label>
                                          <select className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                              id="attendanceStatus" value={attendanceStatus} placeholder="Enter the attendance status" required 
                                              onChange={(e)=>{
                                                  setAttendanceStatus(e.target.value);
                                              }}>
                                              <option value="In">In</option>
                                              <option value="Out">Out</option>
                                          </select>
                                      </div>
                                        <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Submit</button>
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

export default AttendanceUpdate;
