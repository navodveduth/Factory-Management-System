import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from "jspdf";
import { Header } from '../components';
import TableData from '../components/Table/TableData';
import TableHeader from '../components/Table/TableHeader';


const EmployeeReport = () => {

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
    
    const createPDF = () => {
        const pdf = new jsPDF("landscape", "px", "a1",false);
        const data = document.querySelector("#tableContainer");
        pdf.html(data).then(() => {
            pdf.save("Employees Report.pdf");
           });
    };

    return (
        <div>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">

                <Header category="Report" title="Employees" />

                <div className=" flex items-center mb-5 ">
                    <div className="mr-0 ml-auto">
                        <button onClick={createPDF} type="button"  className="py-1 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" >Generate Report</button>
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
    );
}

export default EmployeeReport