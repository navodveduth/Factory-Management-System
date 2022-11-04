import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header, Navbar, Footer, Sidebar, ThemeSettings} from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';

import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

function LeaveNew() {
  const navigate = useNavigate(); //useNavigate hook to redirect to another page after form submission is successful
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const [employeeNumber, setEmployeeNumber] = useState('');
  const [leaveStartDate, setLeaveStartDate] = useState('');
  const [leaveEndDate, setLeaveEndDate] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveStatus, setLeaveStatus] = useState('');
  
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
                            <Header category="Form" title=" Request Leave" />
                            <div className=" flex items-center justify-center "> 
                            <form onSubmit={async(e)=>{
                                e.preventDefault();
                                
                                const newLeave = {
                                    employeeNumber,
                                    leaveStartDate,
                                    leaveEndDate,
                                    leaveType,
                                    leaveReason,
                                    leaveStatus
                                }

                                await axios.post("http://localhost:8070/leave/createLeave", newLeave)
                                    .then((res)=>{
                                        alert("Data saved successfully");
                                          //navigate to the machinery view page
                                    navigate('/LeaveViewAll');
                                    })
                                    .catch((err)=>{
                                        console.log(err);
                                        alert("Error occured");
                                    })
                                    
                                
                            }}>

                              <div className="mb-3">
                                <label htmlFor="employeeNumber" className="form-label">Employee Number</label>
                                <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="employeeNumber" placeholder="Enter Employee Number" value={employeeNumber} onChange={(e)=>{
                                    setEmployeeNumber(e.target.value);
                                }}
                                pattern="[0-9]{4}" title="The Employee Number should contain 4 digits" required/>
                              </div>
                              <div className="mb-3">
                                <label htmlFor="leaveStartDate" className="form-label">Leave Start Date</label>
                                <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="leaveStartDate" placeholder="Enter Leave Start Date" value={leaveStartDate} onChange={(e)=>{
                                    setLeaveStartDate(e.target.value);
                                }}/>
                              </div>
                              <div className="mb-3">
                                <label htmlFor="leaveEndDate" className="form-label">Leave End Date</label>
                                <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="leaveEndDate" placeholder="Enter Leave End Date" value={leaveEndDate} onChange={(e)=>{
                                    setLeaveEndDate(e.target.value);
                                }}/>
                              </div>
                              <div className="mb-3">
                                <label htmlFor="leaveType" className="form-label">Leave Type</label>
                                <select className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="leaveType" placeholder="Enter Leave Type" value={leaveType} onChange={(e)=>{
                                    setLeaveType(e.target.value);
                                }}>
                                  <option selected>Select leave type</option>
                                  <option value="Regular">Regular</option>
                                  <option value="Half Day">Half Day</option>
                                  <option value="Short Leave">Short Leave</option>
                                </select>
                              </div>
                              <div className="mb-3">
                                <label htmlFor="leaveReason" className="form-label">Leave Reason</label>
                                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="leaveReason" placeholder="Enter Leave Reason" value={leaveReason} onChange={(e)=>{
                                    setLeaveReason(e.target.value);
                                }}
                                pattern="[A-Za-z]{3,}" title="The Leave Reason should contain at least 3 letters" required/>
                              </div>
                              <div className="mb-3">
                                <label htmlFor="leaveStatus" className="form-label">Leave Status</label>
                                <select className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="leaveReason" aria-label="Default select example" required
                                onChange={(e)=>{
                                  setLeaveStatus(e.target.value);
                                }}>
                                  <option selected>Select leave status</option>
                                  <option value="Pending">Pending</option>
                                </select>
                              </div>

                              <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Request Leave</button>
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
}
export default LeaveNew