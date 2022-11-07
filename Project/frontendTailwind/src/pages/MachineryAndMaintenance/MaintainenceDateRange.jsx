import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Header } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider.js';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';

import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';



const MaintainenceDateRange = () => {
  const [maintainence, setMaintainence] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

  var TotalCost = 0;
  var total = 0;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 2,
    currencyDisplay: 'symbol'
  })

  const getMaintainence = async () => {  //getMaintainence is the function to get the data from the backend
    axios.get("http://localhost:8070/maintainence/")
      .then((res) => {
        setMaintainence(res.data); //setMaintainence  is used to update the state variable

      })
      .catch((err) => {
        alert(err.message);
      })
  }

  useEffect(() => {
    getMaintainence(); // 
    const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const deleteMaintainence = async (id) => {
    await axios.delete(`http://localhost:8070/maintainence/delete/${id}`)
      .then((res) => {
        alert("Data deleted successfully");
        getMaintainence();
      })
      .catch((err) => {
        alert(err.message);
      })
  }

  const confirmFunc = (id) => {

    if (confirm("Do you want to delete?") == true) {
      deleteMaintainence(id);
    } else {
      navigate('/MaintenanceViewAll');
    }

  }

  return (
    <div>

      {/* DON'T CHANGE ANYTHING HERE */}

      <div className={currentMode === 'Dark' ? 'dark' : ''}>

        <div className="flex relative dark:bg-main-dark-bg">

          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}> {/* THEME SETTINGS BUTTON */}
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
            className={ // MAIN BACKGROUND IMPLEMENTATION
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
                {/* YOUR COMPONENT IMPLEMENTATION GOES HERE */}
                {/* COPY YOUR ORIGINAL COMPONENT CODE HERE */}
                {/* PART AFTER THE RETURN STATEMENT */}
                <div>
                  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
                    <Header category="Table" title="Property Maintenance " />

                    <div className=" flex items-center mb-5 ">
                      <div>
                        <input type="text" className=" block w-400 rounded-md bg-gray-100 focus:bg-white dark:text-black" placeholder="Search Here"
                          onChange={(e) => {
                            setSearchTerm(e.target.value);
                          }} />
                      </div>
                      <div className="mr-0 ml-auto">
                        <Link to={"/MaintainenceReport"}> {/* change this link your preview page */}
                          <button type="button" className="py-1 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" >Generate Report</button>
                        </Link>
                      </div>

                    </div>



                    <div className="block w-full overflow-x-auto rounded-lg">
                      <table className="w-full rounded-lg" >
                        <thead>
                          <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                            <TableHeader value="Code" />
                            <TableHeader value="Type" />
                            <TableHeader value="Repair needed " />
                            <TableHeader value="Last Maintained" />
                            <TableHeader value="Next due" />
                            <TableHeader value="Cost" />
                            <TableHeader value="Status" />
                            <TableHeader value="Manage" />
                          </tr>
                        </thead>
                        <tbody>
                          {maintainence.filter((data) => {
                            if (searchTerm == "") {
                              return data;
                            } else if ((data.Type.toLowerCase().includes(searchTerm.toLowerCase())) ||
                              (data.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                              (data.Description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                              (data.midprop.toLowerCase().includes(searchTerm.toLowerCase())) ||
                              (data.status.toLowerCase().includes(searchTerm.toLowerCase()))) {
                              return data;
                            }
                          }).map((data, key) => {

                            var datacolor = "text-black";
                            if (data.status === "In progress") {
                              datacolor = "text-red-600 font-bold";

                            } else {
                              datacolor = "text-green-500 font-bold";
                            }

                            return (

                              // const LMdate = new Date(data.lastMaintainedDate).toLocaleDateString();
                              // const NSdate = new Date(data.nextServiceDate).toLocaleDateString();
                              TotalCost = TotalCost + data.others,
                              total = formatter.format(TotalCost),

                              <tr className="text-sm h-10 border dark:border-slate-600" key={key}>

                                <TableData value={data.midprop} />
                                <TableData value={data.Type} />
                                <TableData value={data.Description} />
                                <TableData value={data.lastMaintainedDate.toString().split('T')[0]} />
                                <TableData value={data.nextServiceDate.toString().split('T')[0]} />
                                <TableData value={"Rs." + data.others} />

                                <td className={`${datacolor} text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3`}>{data.status} </td>



                                <td className="text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">

                                  <Link to={`/MaintenanceUpdate/${data._id}`}>
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
                                      confirmFunc(data._id);
                                    }}
                                  >
                                    <i className="fas fa-trash" />
                                  </button>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table><br></br><br></br>
                      <span className="text-xs font-semibold inline-block py-2 px-2  rounded text-red-600 bg-white-200 uppercase last:mr-0 mr-1">
                        Total Cost of property Maintenance : {total}

                      </span>

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

export default MaintainenceDateRange;

