import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Navbar, Footer, Sidebar, ThemeSettings, Header,MaintainChart } from '../../components';
import {GrHostMaintenance } from 'react-icons/gr';
import {BiAddToQueue} from 'react-icons/bi';
import { useStateContext } from '../../contexts/ContextProvider';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';
import {DateRangePickerComponent} from '@syncfusion/ej2-react-calendars' // this code needed for the datesort function

import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import MaintenanceDashboard from './../Maintenance/MaintenanceDashboard';


const MachMaintenanceHistory = () => {

    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

    const [machinery, setMachinery] = useState([]);
    const [maintainenceMachine, setMaintainenceMachine] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');



    const { id } = useParams(); //get the id from the url

    const getMachinery = async () => {  //getMachinery is the function to get the data from the backend
        axios.get(`http://localhost:8070/machinery/${id}`)
            .then((res) => {
                setMachinery(res.data); //setMachinery is used to update the state variable


            })
            .catch((err) => {
                // alert(err.message);
            })
    }


    const machNo = machinery.machineID;

    const getMMaintainence = async () => {  //getMaintainence is the function to get the data from the backend
        axios.get(`http://localhost:8070/maintainenceMachine/viewMaintainenceMachinesNum/${machNo}`)
            .then((res) => {
                setMaintainenceMachine(res.data); //setMaintainence  is used to update the state variable
                console.log(machNo);
            })
            .catch((err) => {
                // alert(err.message);
            })
    }


    useEffect(() => {

        getMachinery();
        getMMaintainence();
        const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
            setCurrentColor(currentThemeColor);
            setCurrentMode(currentThemeMode);
        }
    }, [machinery.machineID]);

    let dateRangeRef = (dateRange) => {
        dateRangeRef = dateRange;
        console.log(dateRange);
        console.log("Date  : ", dateRangeRef) // dateRangeRef is a reference to the DateRangePickerComponent
    };

    
    //   const convertDate = (format) => {
    //     function convert(s) {
    //       return s < 10 ? `0${s}` : s;
    //     }
    //     const date = new Date(format);
    //     return [
    //       date.getFullYear(),
    //       convert(date.getMonth() + 1),
    //       convert(date.getDate()),
    //     ].join('-');
    //   };
    
      const filterDate = () => {
        if (dateRangeRef.value && dateRangeRef.value.length > 0) {

            const start = (dateRangeRef.value[0]);
            const end = (dateRangeRef.value[1]);

            let date1 = JSON.stringify(start);
            date1 = date1.substring(1, 11);
            setStartDate(date1);

            let date2 = JSON.stringify(end);
            date2 = date2.substring(1, 11);
            setEndDate(date2);

        } else {
            setStartDate('');
            setEndDate('');
        }
    };

      
    
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'LKR',
        minimumFractionDigits: 2,
        currencyDisplay: 'symbol'
      })

      const date = new Date()
  // console.log(date)
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


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
                            <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white '><GrHostMaintenance />
                            
                                <Header category="Records" title={"Machinery Maintenance Records"}/>
                                {days[date.getDay()]}  {date.getDate()}  {months[date.getMonth()]}  {date.getFullYear()}
                                <div>
                                    <div className="bg-main-bg dark:bg-main-dark-bg rounded-3xl p-5 m-5">
                                        <h1 className="text-2xl font-bold">Machinery Details</h1>
                                        <div className="text-md ml-12 pt-5">
                                            <div className="p-1"> <span  className="font-bold"> + Machine Code </span> : {machinery.machineID}</div>
                                            <div className="p-1 "> <span className="font-bold"> + Machine Model </span> : {machinery.name}</div>
                                            <div className="p-1 "> <span className="font-bold"> + Purchased Date </span> : {new Date(machinery.dateOfPurchased).toDateString()}</div>
                                            <div className="p-1 text-green-600 "> <span  className="font-bold"> + Purchased Cost </span> : {formatter.format(machinery.machineryCost)}</div>
                                            <div className="p-1 text-green-600 "> <span  className="font-bold"> + Salvage Value </span> : {formatter.format(machinery.salvage)}</div>
                                            <div className="p-1 text-green-600 "> <span  className="font-bold"> + Average Life Years </span> : {machinery.numberOfYrs}</div>
                                            <div className="p-1 text-red-600 "> <span className="font-bold"> + Depreciation Cost </span> : {formatter.format(parseFloat((machinery.machineryCost - machinery.salvage) / machinery.numberOfYrs).toFixed(2))}</div>
                                            <div className="p-1 text-red-600"> <span className="font-bold"> + Depreciation Rate </span> : {
                                                
                                            (parseFloat(
                                                ((machinery.machineryCost - machinery.salvage) / machinery.numberOfYrs)/machinery.machineryCost*100).toFixed(2))+"%"}</div>

                                        </div>

                                    </div>
                                </div>
                            </div>



                            <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white '>
                               
                                    <h1 className="text-2xl font-bold">Maintenance History</h1>

                                    <div className="text-md ml-12 pt-5">
                                    <div className=" flex items-center mb-5 "> {/* this code needed for the datesort function*/}
                                    {/* <div className=" bg-slate-100 pt-1 rounded-lg px-5 w-56">
                                        <DateRangePickerComponent ref={dateRangeRef}  placeholder="Select a date range"/>
                                    </div>
                                    <div className="ml-5">
                                        <button type="button"  className="py-2 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" onClick={filterDate}>Filter</button>
                                    </div> */}

                                    <div className="mr-0 ml-auto">
                                    <Link to={"/MaintenanceDashboard"}> 
                                        <button type="button"  className="py-2 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500"  icon={<BiAddToQueue />}>+ Maintenance</button>
                                    </Link>
                                    </div>
                                </div>

                                <div className=" flex items-center mb-5 "> {/* this code needed for the datesort function*/}
                                                <div className=" bg-slate-100 pt-1 rounded-lg px-5 w-56">
                                                    <DateRangePickerComponent ref={dateRangeRef}  placeholder="Select a date range"/>
                                                </div>
                                                <div className="ml-5">
                                                    <button type="button"  className="py-2 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" onClick={filterDate}>Filter</button>
                                                </div>
                                            </div>

                                        <div className="block w-full overflow-x-auto rounded-lg">
                                            <table className="w-full rounded-lg">
                                                <thead>
                                                    <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                                                        <TableHeader value="Code" />
                                                        <TableHeader value="Repairs " />
                                                        <TableHeader value="Repair started" />
                                                        <TableHeader value="Repaired by" />
                                                        <TableHeader value="Contacts" />
                                                        <TableHeader value="Cost" />
                                                        <TableHeader value="Status" />
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {maintainenceMachine.map((data, key) => {
                                                        var datacolor = "text-black";
                                                        if (data.status === "In progress") {
                                                            datacolor = "text-red-600 font-bold";

                                                        } else {
                                                            datacolor = "text-green-500 font-bold";
                                                        }
                                                        return (
                                                            <tr className="text-sm h-10 border dark:border-slate-600" key={key}>

                                                                <Link to={`/MachMaintenanceViewAll/`}>
                                                                    <TableData value={data.mid} />
                                                                </Link>
                                                                <TableData value={data.Description} />
                                                                <TableData value={data.lastMaintainedDate.toString().split('T')[0]} />
                                                                <TableData value={data.Location} />
                                                                <TableData value={data.contactNo} />
                                                                <TableData value={"Rs." + data.others} />
                                                                <td className={`${datacolor} text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3`}>{data.status} </td>



                                                            </tr>
                                                            
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                   

                               
                            </div>

                            
                            {/* <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white '>
                              
                                    


                                        <div className="block w-full overflow-x-auto rounded-lg">
                                            
                                                    {maintainenceMachine.map((data, key) => {
                                                        
                                                        return (
                                                            
                                                            <MaintainChart machineID={data.machineID} />
                                                    
                                                        )
                                                    })}
                                           
                                        </div> */}
                                   

                                   








                                {/* </div> */}
                            </div>
                            <Footer />
                        </div>
                    </div>




                </div>
            </div>
      

    );
};

export default MachMaintenanceHistory;

