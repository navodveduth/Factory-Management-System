import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import { Navbar, Footer, Sidebar, ThemeSettings, Header, AttendanceChart, AttendanceInMonth } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars' // this code needed for the datesort function
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

const EmployeeProfile = () => {
    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();
    
    const [employee, setEmployee] = useState([]);
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    const {id} = useParams();

    const getEmployee = async () => {
        await axios.get(`http://localhost:8070/employee/viewEmployeeAndSalary/${id}`).then((res) => {
            setEmployee(res.data);
        })
        .catch((err) => {
            alert(err.message);
        })
    };

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'LKR',
        minimumFractionDigits: 2,
        currencyDisplay: 'symbol'
    });

    useEffect(() => {
        getEmployee();
        const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
            setCurrentColor(currentThemeColor);
            setCurrentMode(currentThemeMode);
        }
    }, []);

    /*let dateRangeRef = (dateRange) => {
        dateRangeRef = dateRange;
        console.log(dateRange);
        console.log("Date  : ", dateRangeRef) // dateRangeRef is a reference to the DateRangePickerComponent
    };*/

    const handleDateChange = (e) => {
        if(e.value) {
            const date = e.target.value;
            const month = date.getMonth();
            const year = date.getFullYear();
            setMonth(month);
            setYear(year);
        }
        else {
            setMonth("");
            setYear("")
        }
    }


    /*const convertDate = (format) => {
        function convert(s) {
        return s < 10 ? `0${s}` : s;
        }
        const date = new Date(format);
        return [
        date.getFullYear(),
        convert(date.getMonth() + 1),
        convert(date.getDate()),
        ].join('-');
    };*/

    /*const filterDate = () => {
        if (dateRangeRef.value && dateRangeRef.value.length > 0) {

            const start = (dateRangeRef.value[0]);
            const end = (dateRangeRef.value[1]);

            let date1 = JSON.stringify(start);
            date1 = date1.substring(1, 11);
            setStartDate(date1);

            let date2 = JSON.stringify(end);
            date2 = date2.substring(1, 11);
            setEndDate(date2);

        } else {
            setStartDate('');
            setEndDate('');
        }
    };*/

    const createPDF = () => {
        const pdf = new jsPDF("landscape", "px", "a1",false);
        const data = document.querySelector("#profile");
        pdf.html(data).then(() => {
            pdf.save("Employee Report.pdf");
        });
    };

    const createPDFLeaves = () => {
        const pdf = new jsPDF("landscape", "px", "a1",false);
        const data = document.querySelector("#leavesTable");
        pdf.html(data).then(() => {
            pdf.save("Leaves Report.pdf");
        });
    };

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
                            {employee.map((data,key) => {
                                const thisYear = new Date().getFullYear();
                                const leaveCount = 14 - (data.leavesDetails.filter((leave) => leave.leaveStartDate.substring(0, 4) == thisYear).length);
                                return (
                                    <div key={key}>
                                        <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white '>
                                            <Header category="Report" title="Employee Profile" />
                                            <div className=" flex items-center mb-5 "> {/* this code needed for the datesort function*/}
                                                <div className="ml-auto mr-5">
                                                    <button type="button"  className="py-2 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" onClick={createPDF}>Generate Report</button>
                                                </div>
                                            </div>
                                            <div id="profile">
                                                <div className="bg-main-bg dark:bg-main-dark-bg rounded-3xl p-5 m-5">
                                                    <h1 className="text-2xl font-bold">Personal Details</h1>
                                                    <div className="text-md ml-12 pt-5">
                                                        <div className="p-1"> <span className="font-bold"> Employee Number </span> : {data.employeeNumber}</div>
                                                        <div className="p-1"> <span className="font-bold"> Full Name </span> : {data.employeeFullName}</div>
                                                        <div className="p-1"> <span className="font-bold"> Name with initials </span> : {data.employeeNameWithInitials}</div>
                                                        <div className="p-1"> <span className="font-bold"> NIC number </span> : {data.employeeNIC}</div>
                                                        <div className="p-1"> <span className="font-bold"> Gender </span> : {data.employeeGender}</div>
                                                        <div className="p-1"> <span className="font-bold"> Date of birth </span> : {new Date(data.employeeDOB).toISOString().substring(0, 10)}</div>
                                                    </div>
                                                    
                                                </div>
                                                <div className="bg-main-bg dark:bg-main-dark-bg rounded-3xl p-5 m-5">
                                                    <h1 className="text-2xl font-bold">Contact Details</h1>
                                                    <div className="text-md ml-12 pt-5">
                                                        <div className="p-1"> <span className="font-bold"> Address </span> : {data.employeeAddress}</div>
                                                        <div className="p-1"> <span className="font-bold"> Contact number </span> : {data.employeeContactNumber}</div>
                                                        <div className="p-1"> <span className="font-bold"> Email </span> : {data.employeeEmail}</div>
                                                    </div>
                                                </div>
                                                <div className="bg-main-bg dark:bg-main-dark-bg rounded-3xl p-5 m-5">
                                                    <h1 className="text-2xl font-bold">Work Details</h1>
                                                    <div className="text-md ml-12 pt-5">
                                                        <div className="p-1"> <span className="font-bold"> Date joined </span> : {new Date(data.employeeDateOfJoin).toISOString().substring(0, 10)}</div>
                                                        <div className="p-1"> <span className="font-bold"> Designation </span> : {data.employeeDesignation}</div>
                                                        <div className="p-1"> <span className="font-bold"> Department </span> : {data.employeeDepartment}</div>
                                                        <div className="p-1"> <span className="font-bold"> Type </span> : {data.employeeType}</div>
                                                    </div>
                                                </div>
                                                <div className="bg-main-bg dark:bg-main-dark-bg rounded-3xl p-5 m-5">
                                                    <h1 className="text-2xl font-bold">Salary Details</h1>
                                                        <div className="text-md ml-12 pt-5">
                                                            <div className="p-1"> <span className="font-bold"> Basic salary </span> : {formatter.format(data.salaryDetails.employeeBasicSalary)}</div>
                                                            <div className="p-1"> <span className="font-bold"> Allowances </span> : {formatter.format(data.salaryDetails.employeeAllowance)}</div>
                                                            <div className="p-1"> <span className="font-bold"> Incentives </span> : {formatter.format(data.salaryDetails.employeeIncentive)}</div>
                                                            <div className="p-1"> <span className="font-bold"> Net Salary </span> : {formatter.format(data.salaryDetails.employeeBasicSalary + data.salaryDetails.employeeAllowance + data.salaryDetails.employeeIncentive)}</div>
                                                        </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white '>
                                            <Header category="Report" title="Employee Leaves" />
                                            <div className=" flex items-center mb-5 ">
                                                <div className="font-bold text-lg" > <span> Leaves left for {thisYear} </span> : {leaveCount}</div>
                                            </div>
                                            <div className=" flex items-center mb-5 "> {/* this code needed for the datesort function*/}
                                                <div className=" bg-slate-100 pt-1 rounded-lg px-5 w-56">
                                                    <DatePickerComponent  placeholder="Select a month " start="Year" depth="Year" format="MMM yyyy" onChange={handleDateChange} />
                                                </div>
                                                <div className="ml-5">
                                                    <button type="button"  className="py-2 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" onClick={handleDateChange}>Filter</button>
                                                </div>
                                                <div className="ml-auto mr-0">
                                                    <button type="button"  className="py-2 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" onClick={createPDFLeaves}>Generate Report</button>
                                                </div>
                                            </div>

                                            <div className="block w-full overflow-x-auto rounded-lg">
                                                <table className="w-full rounded-lg" id='leavesTable'>
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
                                                    {data.leavesDetails.filter((leave) => {
                                                        if (month == "" && year == ""){
                                                            return leave
                                                        }else if (month == new Date(leave.leaveStartDate).getMonth() && year == new Date(leave.leaveStartDate).getFullYear()){
                                                            return leave
                                                        }
                                                    }).map((data3, key) => {
                                                        return(
                                                        <tr className="text-sm h-10 border dark:border-slate-600" key={key}>
                                                            <TableData value={data3.leaveType} />
                                                            <TableData value={new Date(data3.leaveStartDate).toISOString().split('T')[0]} />
                                                            <TableData value={new Date(data3.leaveEndDate).toISOString().split('T')[0]} />
                                                            <TableData value={data3.leaveReason} />
                                                            <TableData value={data3.leaveStatus} />
                                                        </tr>
                                                    )
                                                    })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
                                                <AttendanceChart employeeNumber={data.employeeNumber} />
                                        </div>
                                        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
                                                <AttendanceInMonth employeeNumber={data.employeeNumber} />
                                        </div>
                                    </div>
                                )
                            })}
                            <Footer />
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeProfile;