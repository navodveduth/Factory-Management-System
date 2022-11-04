import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from "jspdf";
import { Header, Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';

import { useStateContext } from '../../contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';


const EmployeeReport = () => {

    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

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
        const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
            setCurrentColor(currentThemeColor);
            setCurrentMode(currentThemeMode);
        }
    }, []);
    
    const createPDF = () => {
        const pdf = new jsPDF("landscape", "px", "a1",false);
        const data = document.querySelector("#tableContainer");
        pdf.html(data).then(() => {
            pdf.save("Employees Report.pdf");
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
                        <div>
                            {/* YOUR COMPONENT IMPLEMENTATION GOES HERE */}
                            {/* COPY YOUR ORIGINAL COMPONENT CODE HERE */}
                            {/* PART AFTER THE RETURN STATEMENT */}
                            <div>
                                <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">

                                    <Header category="Report" title="Employees" />

                                    <div className=" flex items-center mb-5 ">
                                        <div className="mr-0 ml-auto">
                                            <button onClick={createPDF} type="button"  className="py-1 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" >Download Report</button>
                                        </div>
                                    </div>

                                    <div className="block w-full overflow-x-auto rounded-lg" id="tableContainer">
                                        <table className="w-full rounded-lg">
                                            <thead>
                                                <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                                                    <TableHeader value="Employee ID" />
                                                    <TableHeader value="Full name" />
                                                    <TableHeader value="NIC" />
                                                    <TableHeader value="Gender" />
                                                    <TableHeader value="Designation" />
                                                    <TableHeader value="Department" />
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {employee.map((data, key) => {
                                                    return(
                                                        <tr className="text-sm h-10 border dark:border-slate-600" key={key}>
                                                            <TableData value={data.employeeNumber} />
                                                            <TableData value={data.employeeFullName} />
                                                            <TableData value={data.employeeNIC} />
                                                            <TableData value={data.employeeGender} />
                                                            <TableData value={data.employeeDesignation} />
                                                            <TableData value={data.employeeDepartment} />

                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
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

export default EmployeeReport;
