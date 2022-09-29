import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import TableData from '../components/Table/TableData';
import TableHeader from '../components/Table/TableHeader';

const EmployeeViewAll = () => {
  const { currentColor } = useStateContext();

  const [employee, setEmployee] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");  //add this state to save filter word

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

  const deleteEmployee = async (id) => {
    await axios
      .delete(`http://localhost:8070/employee/deleteEmployee/${id}`)
      .then((res) => {
        alert('Data deleted successfully');
        getEmployee();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">

        <Header category="Table" title="Employees" />

        <div className=" flex items-center mb-5 ">
          <div>
            <input type="text" className=" block w-400 rounded-md bg-gray-100 focus:bg-white dark:text-black" placeholder="Search Here" 
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }} />
          </div>
          <div className="mr-0 ml-auto">
            <Link to={"/EmployeeReport"}> {/* change this link your preview page */}
              <button type="button"  className="py-1 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" >Generate Report</button>
            </Link>
          </div>
        </div>

        <div className="block w-full overflow-x-auto rounded-lg">
          <table className="w-full rounded-lg">
            <thead>
              <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                <TableHeader value="Employee ID" />
                <TableHeader value="Full name" />
                <TableHeader value="NIC" />
                <TableHeader value="Gender" />
                <TableHeader value="Designation" />
                <TableHeader value="Department" />
                <TableHeader value="Manage" />
              </tr>
            </thead>

            <tbody>
              {employee.filter((data) => {
                if(searchTerm == ""){
                  return data;
                }else if((data.employeeNumber.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (data.employeeFullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (data.employeeNIC.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (data.employeeGender.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (data.employeeDesignation.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (data.employeeDepartment.toLowerCase().includes(searchTerm.toLowerCase()))) 
                {
                  return data;
                      }
              }).map((data, key) => {
                return(
                  <tr className="text-sm h-10 border dark:border-slate-600" key={key}>
                    <TableData value={data.employeeNumber} />
                    <TableData value={data.employeeFullName} />
                    <TableData value={data.employeeNIC} />
                    <TableData value={data.employeeGender} />
                    <TableData value={data.employeeDesignation} />
                    <TableData value={data.employeeDepartment} />

                    <td className="text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">
                      <Link to={`/EmployeeUpdate/${data._id}`}>
                        <button
                          type="button"
                          className="font-bold py-1 px-4 rounded-full mx-3 text-white"
                          style={{ background: currentColor }}
                        >
                          <i className="fas fa-edit" />
                        </button>
                      </Link>
                      <button
                        type="button"
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 ml-2 rounded-full"
                        onClick={() => {
                          deleteEmployee(data._id);
                        }}
                      >
                        <i className="fas fa-trash" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeViewAll;
