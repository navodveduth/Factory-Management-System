import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FiUser } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings, Header  } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';

import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

const EmployeeProfile = () => {

    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

    const [employee, setEmployee] = useState([]);
    const [leave, setLeave] = useState([]);

    const {id} = useParams(); //get the id from the url
  
    const getEmployee = async () => {
        await axios.get(`http://localhost:8070/employee/viewEmployee/${id}`).then((res) => {
            setEmployee(res.data);
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    const empNo = employee.employeeNumber;
    //const dateJoined = new Date(employee.employeeDateOfJoin).toISOString().split('T')[0];
    //const dateOfBirth = new Date(employee.employeeDOB).toISOString().split('T')[0];

    const getLeaves = async () => {
        await axios.get(`http://localhost:8070/leave/viewLeavesNum/${empNo}`).then((res) => {
            setLeave(res.data);
        })
        .catch((err) => {
            alert(err.message);
        });
    };
    

    useEffect(() => {
        getEmployee();
        getLeaves();
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
                            <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white '>
                                <Header category="Report" title="Employee Profile" />
                                <div>
                                    <div className="bg-main-bg dark:bg-main-dark-bg rounded-3xl p-5 m-5">
                                        <h1 className="text-2xl font-bold">Personal Details</h1>
                                        <div className="text-md ml-12 pt-5">
                                            <div className="p-1"> <span className="font-bold"> Employee Number </span> : {employee.employeeNumber}</div>
                                            <div className="p-1"> <span className="font-bold"> Full Name </span> : {employee.employeeFullName}</div>
                                            <div className="p-1"> <span className="font-bold"> Name with initials </span> : {employee.employeeNameWithInitials}</div>
                                            <div className="p-1"> <span className="font-bold"> NIC number </span> : {employee.employeeNIC}</div>
                                            <div className="p-1"> <span className="font-bold"> Gender </span> : {employee.employeeGender}</div>
                                            <div className="p-1"> <span className="font-bold"> Date of birth </span> : {employee.employeeDOB}</div>
                                        </div>
                                        
                                    </div>
                                    <div className="bg-main-bg dark:bg-main-dark-bg rounded-3xl p-5 m-5">
                                        <h1 className="text-2xl font-bold">Contact Details</h1>
                                        <div className="text-md ml-12 pt-5">
                                            <div className="p-1"> <span className="font-bold"> Address </span> : {employee.employeeAddress}</div>
                                            <div className="p-1"> <span className="font-bold"> Contact number </span> : {employee.employeeContactNumber}</div>
                                            <div className="p-1"> <span className="font-bold"> Email </span> : {employee.employeeEmail}</div>
                                        </div>
                                    </div>
                                    <div className="bg-main-bg dark:bg-main-dark-bg rounded-3xl p-5 m-5">
                                        <h1 className="text-2xl font-bold">Work Details</h1>
                                        <div className="text-md ml-12 pt-5">
                                            <div className="p-1"> <span className="font-bold"> Date joined </span> : {employee.employeeDateOfJoin}</div>
                                            <div className="p-1"> <span className="font-bold"> Designation </span> : {employee.employeeDesignation}</div>
                                            <div className="p-1"> <span className="font-bold"> Department </span> : {employee.employeeDepartment}</div>
                                            <div className="p-1"> <span className="font-bold"> Type </span> : {employee.employeeType}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white '>
                                <Header category="Report" title="Employee Leaves" />
                                <div className="block w-full overflow-x-auto rounded-lg">
                                    <table className="w-full rounded-lg">
                                        <thead>
                                            <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                                                <TableHeader value="Leave Type" />
                                                <TableHeader value="Start Date" />
                                                <TableHeader value="End Date" />
                                                <TableHeader value="Reason" />
                                                <TableHeader value="Status" />
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {leave.map((data, key) => (
                                            <tr className="text-sm h-10 border dark:border-slate-600" key={key}>
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
                            <Footer />
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeProfile;

