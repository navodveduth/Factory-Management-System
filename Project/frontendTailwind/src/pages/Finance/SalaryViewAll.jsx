import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Header } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';

const FinanceViewAll = () => {
  const { currentColor } = useStateContext();

  const [Salary, setSalary] = useState([]);
  const [Employee, setEmployee] = useState([]);
  //const [recordedDate, setRecDate] = useState(' ');

  const getSalary = async () => {
    axios
      .get('http://localhost:8070/salary/SalaryView')
      .then((res) => {
        setSalary(res.data);
       // const date = new Date(res.data.trnRecordedDate);
       // setRecDate(date)
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const getEmployee = async () => {
    axios
      .get('http://localhost:8070/employee/viewEmployee')
      .then((res) => {
        setEmployee(res.data);
       // const date = new Date(res.data.trnRecordedDate);
       // setRecDate(date)
      })
      .catch((err) => {
        alert(err.message);
      });
  };



  useEffect(() => {
    getSalary();
  }, []);

  useEffect(() => {
    getEmployee();
  }, []);


  const deleteFinance = async (id) => {
    await axios
      .delete(`http://localhost:8070/salary/deleteSalary/${id}`)
      .then((res) => {
        alert('Salary Data Deleted Sucessfully');
        getSalary();
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
                <TableHeader value="Employee Number" />
                <TableHeader value="Employee Name" />
                <TableHeader value="Employee Designation" />
                <TableHeader value="Basic Salary" />
                <TableHeader value="Allowance" />
                <TableHeader value="Incentives" />
                <TableHeader value="Employee Nett Salary" />
              </tr>
            </thead>
            <tbody>
              {Employee.map((data) => (
                <tr className="text-sm h-10 border dark:border-slate-600">

                    <TableData value={data.employeeNumber} />
                    <TableData value={data.employeeFullName} />
                    <TableData value={data.employeeDesignation} />
                    <TableData value={data.employeeDesignation} />
                  

                  <td className="text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">
                    <Link to={`/FinanceUpdate/${data._id}`}>
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
                        deleteFinance(data._id);
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

export default FinanceViewAll;
