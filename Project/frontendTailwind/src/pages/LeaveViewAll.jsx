import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import TableData from '../components/Table/TableData';
import TableHeader from '../components/Table/TableHeader';

const LeaveViewAll = () => {
  const { currentColor } = useStateContext();

  const [leave, setLeave] = useState([]);

  const getLeave = async () => {
    axios
      .get('http://localhost:8070/leave/viewLeave')
      .then((res) => {
        setLeave(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getLeave();
  }, []);

  const deleteLeave = async (id) => {
    await axios
      .delete(`http://localhost:8070/leave/deleteLeave/${id}`)
      .then((res) => {
        alert('Data deleted successfully');
        getLeave();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
        <Header category="Table" title="Leaves" />
        <div className="block w-full overflow-x-auto rounded-lg">
          <table className="w-full rounded-lg">
            <thead>
              <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                <TableHeader value="Employee ID" />
                <TableHeader value="Leave Type" />
                <TableHeader value="Start Date" />
                <TableHeader value="End Date" />
                <TableHeader value="Reason" />
                <TableHeader value="Status" />
                <TableHeader value="Manage" />
              </tr>
            </thead>
            <tbody>
              {leave.map((data) => (
                <tr className="text-sm h-10 border dark:border-slate-600">
                  <TableData value={data.employeeNumber} />
                  <TableData value={data.leaveType} />
                  <TableData value={new Date(data.leaveStartDate).toISOString().split('T')[0]} />
                  <TableData value={new Date(data.leaveEndDate).toISOString().split('T')[0]} />
                  <TableData value={data.leaveReason} />
                  <TableData value={data.leaveStatus} />

                  <td className="text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">
                    <Link to={`/LeaveUpdate/${data._id}`}>
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
                        deleteLeave(data._id);
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

export default LeaveViewAll