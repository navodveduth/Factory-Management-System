import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Header, Navbar, Footer, Sidebar, ThemeSettings } from '../../components';

import { useStateContext } from '../../contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

const LeaveUpdate = () => {

  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();
  
  const navigate = useNavigate();

  const [employeeNumber, setEmployeeNumber] = useState("");
  const [leaveStartDate, setLeaveStartDate] = useState("");
  const [leaveEndDate, setLeaveEndDate] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [leaveStatus, setLeaveStatus] = useState("");

  const { id } = useParams();

  const getLeave = () => {
    axios.get(`http://localhost:8070/leave/viewLeave/${id}`)
    .then((res) => {
      const start = new Date(res.data.leaveStartDate).toISOString().split('T')[0];
      const end = new Date(res.data.leaveEndDate).toISOString().split('T')[0];
      setEmployeeNumber(res.data.employeeNumber);
      setLeaveStartDate(start);
      setLeaveEndDate(end);
      setLeaveType(res.data.leaveType);
      setLeaveReason(res.data.leaveReason);
      setLeaveStatus(res.data.leaveStatus);
    })
    .catch((err) => {
      alert(err.message);
    })
  }

  useEffect(() => {
    getLeave();
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
                                <Header category="Form" title="Update Leave Request" />
                                        <div className=" flex items-center justify-center">

                                            <form className="" onSubmit={async(e)=>{
                                                e.preventDefault();
                                                
                                                
                                                const newEmployee = {
                                                    employeeNumber,
                                                    leaveStartDate,
                                                    leaveEndDate,
                                                    leaveType,
                                                    leaveReason,
                                                    leaveStatus
                                                }

                                                await axios.put("http://localhost:8070/leave/updateLeave/"+ id, newEmployee)
                                                    .then((res)=>{
                                                        Swal.fire({  
                                                            icon: 'success',
                                                            title: 'Data Updated Successfully',
                                                            color: '#f8f9fa',
                                                            background: '#6c757d',
                                                            showConfirmButton: false,
                                                            timer: 2000
                                                          })
                                                    navigate('/LeaveViewAll');
                                                    })
                                                    .catch((err)=>{
                                                        console.log(err);
                                                        alert("Error occured");
                                                    })
                                                    
                                            }}>

                                                <div className="mb-3">
                                                    <label htmlFor="employeeNumber" className="text-md">Employee Number : </label>
                                                    <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                                        id="employeeNumber" defaultValue={employeeNumber} placeholder="Enter the employee number" required 
                                                        pattern='[0-9]{4}' title='Employee number should be a 4 digit number'
                                                        onChange={(e)=>{
                                                            setEmployeeNumber(e.target.value);
                                                        }}/>
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="leaveStartDate" className="text-md">Leave Start Date : </label>
                                                    <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                                        id="leaveStartDate" defaultValue={leaveStartDate} placeholder="Enter the leave start date" required 
                                                        onChange={(e)=>{
                                                            setLeaveStartDate(e.target.value);
                                                        }}/>
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="leaveEndDate" className="text-md">Leave End Date : </label>
                                                    <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                                        id="leaveEndDate" defaultValue={leaveEndDate} placeholder="Enter the leave end date" required 
                                                        onChange={(e)=>{
                                                            setLeaveEndDate(e.target.value);
                                                        }}/>
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="leaveType" className="text-md">Leave Type : </label>
                                                    <select type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                                        id="leaveType" value={leaveType} placeholder="Enter the leave type" required 
                                                        onChange={(e)=>{
                                                            setLeaveType(e.target.value);
                                                    }}>
                                                        <option value="Regular">Regular</option>
                                                        <option value="Half Day">Half Day</option>
                                                        <option value="Short Leave">Short Leave</option>
                                                    </select>
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="leaveReason" className="text-md">Leave Reason : </label>
                                                    <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                                        id="leaveReason" defaultValue={leaveReason} placeholder="Enter the leave reason" required 
                                                        pattern='[A-Za-z]{3,}' title='Leave reason should be a minimum of 3 characters'
                                                        onChange={(e)=>{
                                                            setLeaveReason(e.target.value);
                                                        }}/>
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="leaveStatus" className="text-md">Leave Status : </label>
                                                    <select className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                                        id="leaveStatus" value={leaveStatus} required 
                                                        onChange={(e)=>{
                                                            setLeaveStatus(e.target.value);
                                                        }}>
                                                        <option value="Pending">Pending</option>
                                                        <option value="Approved">Approved</option>
                                                        <option value="Rejected">Rejected</option>
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

export default LeaveUpdate;
