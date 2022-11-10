import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import Swal from 'sweetalert2';
import {
  Header,
  Navbar,
  Footer,
  Sidebar,
  ThemeSettings,
} from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';

const TransportViewAll = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  const navigate = useNavigate();
  const [transport, setTransport] = useState([]);
  const [startDate, setStartDate] = useState(''); // dateStart
  const [endDate, setEndDate] = useState(''); // dateEnd
  const [searchTerm, setSearchTerm] = useState(''); // search term state for search bar functionality in table

  // const [value, setValue] = useState('');
  // const [tableFilter, setTableFilter] = useState([]);

  // const filterData = (e) => {
  //   if (e.target.value !== '') {
  //     setValue(e.target.value);
  //     const filterTable = transport.filter((o) =>
  //       Object.keys(o).some((k) =>
  //         String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
  //       )
  //     );
  //     setTableFilter([...filterTable]);
  //   } else {
  //     setValue(e.target.value);
  //   }
  // };

  // const toDateRange = () => {
  //   navigate('/TransportDateRange', { state: { DS: dateStart, DE: dateEnd } });
  // };

  const convertDate = (format) => {
    function convert(s) {
      return s < 10 ? `0${s}` : s;
    }
    const date = new Date(format);
    return [
      date.getFullYear(),
      convert(date.getMonth() + 1),
      convert(date.getDate()),
    ].join('-');
  };

  let dateRangeRef = (dateRange) => {
    // dateRangeRef is a reference to the DateRangePickerComponent
    dateRangeRef = dateRange;
  };

  const filterDate = () => {
    if (dateRangeRef.value && dateRangeRef.value.length > 0) {
      const start = convertDate(dateRangeRef.value[0]);
      const end = convertDate(dateRangeRef.value[1]);

      let date1 = JSON.stringify(start);
      date1 = date1.substring(1, 11);
      setStartDate(date1);

      let date2 = JSON.stringify(end);
      date2 = date2.substring(1, 11);
      setEndDate(date2);

      navigate('/TransportDateRange', { state: { DS: date1, DE: date2 } });
      // console.log(startDate);
      // console.log(endDate);
    } else {
      alert('Please select a date range');
      setStartDate('');
      setEndDate('');
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
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const deleteTransport = async (id) => {
    await axios
      .delete(`http://localhost:8070/transport/delete/${id}`)
      .then((res) => {
        getTransport();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      color: '#f8f9fa',
      background: '#6c757d',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTransport(id);
        Swal.fire({
          icon: 'success',
          title: 'Data Successfully Deleted',
          color: '#f8f9fa',
          background: '#6c757d',
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        navigate('/TransportViewAll');
      }
    });
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 2,
    currencyDisplay: 'symbol',
  });

  return (
    <div>
      <div className={currentMode === 'Dark' ? 'dark' : ''}>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            {' '}
            {/* THEME SETTINGS BUTTON */}
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
            className={
              // MAIN BACKGROUND IMPLEMENTATION
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
                <div>
                  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
                    <Header title="Transport" />

                    <div className="flex items-center mb-5 ">
                      <div>
                        <input
                          type="text"
                          className=" block w-400 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                          placeholder="Search Here"
                          onChange={(e) => {
                            setSearchTerm(e.target.value);
                          }}
                        />
                      </div>

                      <div className="mr-0 ml-auto">
                        <Link to="/TransportReport">
                          <button
                            type="button"
                            className="py-1 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500"
                          >
                            Generate Report
                          </button>
                        </Link>
                      </div>
                    </div>

                    <div className=" flex items-center mb-5 ">
                      <div className=" bg-slate-100 pt-1 rounded-lg px-5 w-56">
                        <DateRangePickerComponent
                          ref={dateRangeRef}
                          placeholder="Select a date range"
                        />
                      </div>
                      <div className="ml-5">
                        <button
                          type="button"
                          className="py-2 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500"
                          onClick={() => filterDate()}
                        >
                          Filter
                        </button>
                      </div>
                    </div>

                    <div className="block w-full overflow-x-auto rounded-lg">
                      <table className="w-full rounded-lg">
                        <thead>
                          <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                            <TableHeader value="Transport ID" />
                            <TableHeader value="Type" />
                            <TableHeader value="Destination Address" />
                            <TableHeader value="Date" />
                            <TableHeader value="Transport Cost" />
                            <TableHeader value="Driver" />
                            <TableHeader value="Status" />
                            <TableHeader value="Manage" />
                          </tr>
                        </thead>
                        <tbody>
                          {transport
                            .filter((data) => {
                              if (startDate && endDate) {
                                return (
                                  data.date >= startDate && data.date <= endDate
                                );
                              }
                              if (searchTerm === '') {
                                return data;
                              }
                              if (
                                data.transportID
                                  .toString()
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase()) ||
                                data.type
                                  .toString()
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase()) ||
                                data.destinationAddress
                                  .toString()
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase()) ||
                                data.date
                                  .toString()
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase()) ||
                                data.timeOfDispatch
                                  .toString()
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase()) ||
                                data.distance
                                  .toString()
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase()) ||
                                data.transportCost
                                  .toString()
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase()) ||
                                data.driver
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase()) ||
                                data.description
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase()) ||
                                data.status
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase())
                              ) {
                                return data;
                              }
                            })
                            .map((data, key) => {
                              let dataColor = 'text-black';
                              if (data.status === 'Completed') {
                                dataColor = 'text-green-500 font-bold';
                              } else {
                                dataColor = 'text-yellow-600 font-bold';
                              }

                              const transportCost = formatter.format(
                                data.transportCost
                              );

                              return (
                                <tr
                                  className="text-sm h-10 border dark:border-slate-600"
                                  key={key}
                                >
                                  <TableData value={data.transportID} />
                                  <TableData value={data.type} />
                                  <TableData value={data.destinationAddress} />
                                  <TableData
                                    value={data.date.substring(0, 10)}
                                  />
                                  <TableData value={transportCost} />
                                  <TableData value={data.driver} />
                                  <td
                                    className={`${dataColor} text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3`}
                                  >
                                    {data.status}
                                  </td>

                                  <td className="text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">
                                    <Link to={`/TransportRecord/${data._id}`}>
                                      <button
                                        type="button"
                                        className="bg-neutral-500 font-bold py-1 px-4 rounded-full mx-3 text-white"
                                      >
                                        <i className="fa-regular fa-file-lines" />
                                      </button>
                                    </Link>

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
                                        confirmDelete(data._id);
                                      }}
                                    >
                                      <i className="fas fa-trash" />
                                    </button>
                                  </td>
                                </tr>
                              );
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

export default TransportViewAll;
