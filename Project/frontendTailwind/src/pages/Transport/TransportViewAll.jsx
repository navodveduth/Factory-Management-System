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
  const [value, setValue] = useState('');
  const [tableFilter, setTableFilter] = useState([]);

  const filterData = (e) => {
    console.log(transport);
    if (e.target.value !== '') {
      setValue(e.target.value);
      const filterTable = transport.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setTableFilter([...filterTable]);
    } else {
      setValue(e.target.value);
    }
  };

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

        <div className=" flex items-center mb-5 ">
          <div>
            <input
              type="text"
              className=" block w-400 rounded-md bg-gray-100 focus:bg-white dark:text-black"
              placeholder="Search Here"
              value={value}
              onChange={filterData}
            />
          </div>
          <div className="mr-0 ml-auto">
            <Link to="/TransportReport">
              {/* change this link your preview page */}
              <button
                type="button"
                className="py-1 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500"
              >
                Generate Report
              </button>
            </Link>
          </div>
        </div>

        <div className="block w-full overflow-x-auto rounded-lg">
          <table className="w-full rounded-lg">
            <thead>
              <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                <TableHeader value="Type" />
                <TableHeader value="Destination Address" />
                <TableHeader value="Date" />
                <TableHeader value="Time" />
                <TableHeader value="Distance" />
                <TableHeader value="Transport Cost" />
                <TableHeader value="Driver" />
                <TableHeader value="Description" />
                <TableHeader value="Status" />
                <TableHeader value="Manage" />
              </tr>
            </thead>
            <tbody>
              {value.length > 0
                ? tableFilter.map((data) => (
                    // map is used to iterate through the transport details
                    <tr
                      className="text-sm h-10 border dark:border-slate-600"
                      key={data._id}
                    >
                      <TableData value={data.type} />
                      <TableData value={data.destinationAddress} />
                      <TableData value={data.date.substring(0, 10)} />
                      <TableData value={data.timeOfDispatch} />
                      <TableData value={`${data.distance} km`} />
                      <TableData
                        value={`Rs. ${data.transportCost.toFixed(2)}`}
                      />
                      <TableData value={data.driver} />
                      <TableData value={data.description} />
                      <TableData value={data.status} />

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
                  ))
                : transport.map((data) => (
                    <tr
                      className="text-sm h-10 border dark:border-slate-600"
                      key={data._id}
                    >
                      <TableData value={data.type} />
                      <TableData value={data.destinationAddress} />
                      <TableData value={data.date.substring(0, 10)} />
                      <TableData value={data.timeOfDispatch} />
                      <TableData value={`${data.distance} km`} />
                      <TableData
                        value={`Rs. ${data.transportCost.toFixed(2)}`}
                      />
                      <TableData value={data.driver} />
                      <TableData value={data.description} />
                      <TableData value={data.status} />

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
