import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import { Header, Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';
import { jsPDF } from "jspdf";
import { useStateContext } from '../../contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import logo from '../../data/logo.png';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';


const AttendanceReport = () => {

  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
    setCurrentColor(currentThemeColor);
    setCurrentMode(currentThemeMode);
    }
  }, []);

  const [attendance, setAttendance] = useState([]);

  const getAttendance = async () => {
    axios
      .get('http://localhost:8070/attendance/viewAttendance')
      .then((res) => {
        setAttendance(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getAttendance();
  }, []);

  const createPDF = () => {
    const pdf = new jsPDF("landscape", "px", "a1",false); // 
    const data = document.querySelector("#tableContainer");
    pdf.html(data).then(() => {
        pdf.save("Attendance Report.pdf");
       });
  };
  const handleDateChange = (e) => {
    if(e.value) {
        const date = e.target.value;
        const month = date.getMonth();
        const year = date.getFullYear();
        setMonth(month);
        setYear(year);
    }
    else {
        setMonth("");
        setYear("")
    }
}
const downloadConf = ()=>{
  Swal.fire({
    title: 'Downloading!',
    text: "Your download has begun!",
    icon: 'success',
    showCancelButton: false,
    color: '#f8f9fa',
    background: '#6c757d',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'OK!'
  })
};


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

                            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">

                              <Header category="Report" title="Attendance" />

                              <div className=" flex items-center mb-5 ">
                                  <div>
                                    <input type="text" className=" block w-400 rounded-md bg-gray-100 focus:bg-white dark:text-black" placeholder="Search Here" 
                                    onChange={(e) => {
                                      setSearchTerm(e.target.value);
                                    }} />
                                  </div>
                                <div className="mr-0 ml-auto">
                                  <button onClick={()=>{createPDF(); downloadConf();}} type="button"  className="py-1 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" >Download Report</button>
                                </div>
                              </div>
                              <div className=" flex items-center mb-5 ">
                                  <div className=" bg-slate-100 pt-1 rounded-lg px-5 w-56">
                                    <DatePickerComponent  placeholder="Select a month " start="Year" depth="Year" format="MMM yyyy" onChange={handleDateChange} />
                                  </div>
                                  <div className="ml-5">
                                    <button type="button"  className="py-2 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" onClick={handleDateChange}>Filter</button>
                                  </div>
                              </div>

                              <div className="block w-full overflow-x-auto rounded-lg" id="tableContainer">
                              <div id="tableContainer">
                                <div className="block w-full overflow-x-auto rounded-lg">
                                  <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
                                    <img
                                      className="h-200 w-400 mb-5"
                                      src={logo}
                                      alt="logo"
                                    />
                                  </div>

                                  <div className="text-center mb-10">
                                    <p className="text-xl mt-2">
                                      Lanka MountCastle (Pvt) Ltd,
                                    </p>
                                    <p className="text-xl">No.124, Hendala, Wattala</p>
                                    <p>011 2942 672</p>
                                  </div>
                                  <p className="text-right text-xl mt-2 mb-3">
                                    Generated On : {new Date().toLocaleDateString()}
                                  </p>
                                <table className="w-full rounded-lg">
                                  <thead>
                                    <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                                        <TableHeader value="Employee ID" />
                                        <TableHeader value="Date" />
                                        <TableHeader value="In-Time" />
                                        <TableHeader value="Out-Time" />
                                        <TableHeader value="Total Hours" />
                                        <TableHeader value="Status" />
                                      </tr>
                                  </thead>

                                  <tbody>
                                  {attendance.filter((leaves) => {
                                        if (month == "" && year == ""){
                                            return leaves
                                        }else if (month == new Date(leaves.employeeInTime).getMonth() && year == new Date(leaves.employeeInTime).getFullYear()){
                                            return leaves
                                        }
                                    }).
                                    filter((data) => {
                                      const date = new Date(data.employeeInTime).toISOString().split('T')[0];
                                      const inTime = new Date(data.employeeInTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                                      const outTime = new Date(data.employeeOutTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                                        if(searchTerm == ""){
                                          return data;
                                        }else if((data.employeeNumber.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
                                          (date.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                          (inTime.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                          (outTime.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                          (data.attendanceStatus.toLowerCase().includes(searchTerm.toLowerCase()))) 
                                        {
                                          return data;
                                              }
                                      }).map((data, key) => {

                                        var datacolor = "text-black";
                                        if (data.employeeTotalHours >= 8) {
                                            datacolor = "text-teal-600 font-semibold";
                                        }
                                        else {
                                            datacolor = "text-red-400 font-bold";
                                        }

                                      return (
                                        <tr key={key} className="text-sm h-10 border dark:border-slate-600">
                                          <TableData value={data.employeeNumber} />
                                          <TableData value={new Date(data.employeeInTime).toISOString().split('T')[0]} />
                                          <TableData value={new Date(data.employeeInTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} />
                                          <TableData value={new Date(data.employeeOutTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} />
                                          <td className={`${datacolor} text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3`}>{data.employeeTotalHours} </td>
                                          <TableData value={data.attendanceStatus} />
                                        </tr>
                                      )
                                      })}
                                  </tbody>
                                </table>
                              </div>
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

export default AttendanceReport;
