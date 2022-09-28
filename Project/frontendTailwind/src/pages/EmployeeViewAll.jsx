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
              {employee.map((data) => (
                <tr className="text-sm h-10 border dark:border-slate-600">
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeViewAll;
