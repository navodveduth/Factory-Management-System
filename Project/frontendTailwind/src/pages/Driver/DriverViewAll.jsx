import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Header } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';

const DriverViewViewAll = () => {
  const { currentColor } = useStateContext();

  const [driver, setDriver] = useState([]); // useState is a hook that is used to create a state variable and a function to update it

  const getDriver = async () => {
    axios
      .get('http://localhost:8070/driver/')
      .then((res) => {
        setDriver(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getDriver();
  }, []); // [] is used to call the function only once

  const deleteDriver = async (id) => {
    await axios
      .delete(`http://localhost:8070/driver/delete/${id}`)
      .then((res) => {
        if (window.confirm('Are you sure ?')) {
          alert('Driver Details Deleted');
          getDriver();
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
        <Header category="Table" title="Driver" />
        <div className="block w-full overflow-x-auto rounded-lg">
          <table className="w-full rounded-lg">
            <thead>
              <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                <TableHeader value="NIC" />
                <TableHeader value="Full Name" />
                <TableHeader value="Driving License No" />
                <TableHeader value="Contact No" />
                <TableHeader value="Vehicle Number" />
                <TableHeader value="Vehicle Model" />
                <TableHeader value="Status" />
                <TableHeader value="Manage" />
              </tr>
            </thead>
            <tbody>
              {driver.map((data) => (
                <tr
                  className="text-sm h-10 border dark:border-slate-600"
                  key={data._id}
                >
                  <TableData value={data.nic} />
                  <TableData value={data.fullName} />
                  <TableData value={data.drivingLicenseNo} />
                  <TableData value={data.contactNo} />
                  <TableData value={data.vehicleNo} />
                  <TableData value={data.vehicleModel} />
                  <TableData value={data.status} />

                  <td className="text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">
                    <Link to={`/driverUpdate/${data._id}`}>
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
                        deleteDriver(data._id);
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

export default DriverViewViewAll;
