import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Header } from '../components';


const EmployeeViewAll = () => {

    const [employee, setEmployee] = useState([]); 
    const getEmployee = async () => {  
        axios.get("http://localhost:8070/employee/viewEmployee")
        .then((res) => { 
            setEmployee(res.data); 
        })
        .catch((err) => { 
            alert(err.message); 
        })
    }

    useEffect(() => { 
        getEmployee();
    }, [])

    const deleteEmployee = async (id) => {
        await axios.delete(`http://localhost:8070/employee/deleteEmployee/${id}`)
        .then((res) => {
            alert("Data deleted successfully");
            getEmployee();
        })
        .catch((err) => {
            alert(err.message);
        })
    }

  return (
    
    <div>
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
        <Header category="Table" title="Employees" />
        <table className="table-fixed w-full border-collapse">
            <thead>
                <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                <th>Employee ID</th>
                <th>Full name</th>
                <th>NIC</th>
                <th>Gender</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Edit</th>
                <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {employee.map((data)=>{

                    return ( 
                        <tr className="text-sm h-10 border dark:border-slate-600">
                            <td className="text-center">{data.employeeNumber}</td>
                            <td className="text-center">{data.employeeFullName}</td>
                            <td className="text-center">{data.employeeNIC}</td>
                            <td className="text-center">{data.employeeGender}</td>
                            <td className="text-center">{data.employeeDesignation}</td>
                            <td className="text-center">{data.employeeDepartment}</td>
                            <td className="text-center">
                                <Link to={'/EmployeeUpdate/'+ data._id}>
                                    <button className="bg-slate-400 text-sm text-white p-1 rounded-lg w-12 hover:bg-slate-600">
                                        Edit
                                    </button>
                                </Link>
                            </td>
                            <td className="text-center">
                                <button onClick={
                                ()=>{
                                    deleteEmployee(data._id);
                                }}
                                className="bg-red-400 text-sm text-white p-1 rounded-lg w-16 hover:bg-red-600">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )
                })}
                
                
            </tbody>
        </table>
        </div>
    </div>
  )
}

export default EmployeeViewAll