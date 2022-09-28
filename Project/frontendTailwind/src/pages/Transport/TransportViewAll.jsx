import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Header } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';

const TransportViewAll = () => {
  const { currentColor } = useStateContext();

  const [transport, setTransport] = useState([]);

  const getTransport = async () => {
    axios
      .get('http://localhost:8070/transport/')
      .then((res) => {
        setTransport(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getTransport();
  }, []);

  const deleteTransport = async (id) => {
    await axios
      .delete(`http://localhost:8070/transport/delete/${id}`)
      .then((res) => {
        if (window.confirm('Are you sure ?')) {
          alert('Transport Details Deleted');
          getTransport();
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
        <Header category="Table" title="Transport" />
        <div className="block w-full overflow-x-auto rounded-lg">
          <table className="w-full rounded-lg">
            <thead>
              <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                <TableHeader value="Type" />
                <TableHeader value="Destination Address" />
                <TableHeader value="Date" />
                <TableHeader value="Distance (Km)" />
                <TableHeader value="Time" />
                <TableHeader value="Transport Cost (Rs.)" />
                <TableHeader value="Status" />
                <TableHeader value="Description" />
                <TableHeader value="Driver" />
                <TableHeader value="Manage" />
              </tr>
            </thead>
            <tbody>
              {transport.map((data) => (
                <tr
                  className="text-sm h-10 border dark:border-slate-600"
                  key={data._id}
                >
                  <TableData value={data.type} />
                  <TableData value={data.destinationAddress} />
                  <TableData value={data.date.substring(0, 10)} />
                  <TableData value={data.distance} />
                  <TableData value={data.timeOfDispatch} />
                  <TableData value={(data.distance * 1.5 + 50).toFixed(2)} />
                  <TableData value={data.status} />
                  <TableData value={data.driver} />
                  <TableData value={data.description} />

                  <td className="text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">
                    <Link to={`/transportUpdate/${data._id}`}>
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
                        deleteTransport(data._id);
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

export default TransportViewAll;
