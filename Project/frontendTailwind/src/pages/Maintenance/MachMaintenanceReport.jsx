import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import TableHeader from "../../components/Table/TableHeader";
import TableData from '../../components/Table/TableData';
import { useStateContext } from '../../contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';
import { Header, Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import logo from '../../data/logo.png';

export default function MachMaintenanceReport() {
    const [maintainenceMachine, setMaintainenceMachine] = useState([]);

    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

    var TotalCost = 0;
    var total = 0;



    const getMaintainence = async () => {  //getMaintainence is the function to get the data from the backend
        axios.get("http://localhost:8070/maintainenceMachine/")
            .then((res) => {
                setMaintainenceMachine(res.data); //setMaintainence  is used to update the state variable

            })
            .catch((err) => {
                alert(err.message);
            })
    }

    useEffect(() => {
        getMaintainence(); // <== CHANGE ACCORDING TO YOUR OWN FUNCTIONS, YOU CAN REMOVE THIS LINE IF YOU DON'T NEED IT
        const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
            setCurrentColor(currentThemeColor);
            setCurrentMode(currentThemeMode);
        }
    }, []);


    const createPDF = () => {
        const date = new Date(Date.now()).toISOString().split('T')[0];
        const pdf = new jsPDF("landscape", "px", "a1", false);
        const data = document.querySelector("#tableContainer");
        pdf.html(data).then(() => {
            pdf.save("Machinery-Maintenance-Report-" + date + ".pdf");
        });
    };


    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'LKR',
        minimumFractionDigits: 2,
        currencyDisplay: 'symbol'
    })

    //getDAte
    const current = new Date();
    const currentdate = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;

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

                    <div className={ // MAIN BACKGROUND IMPLEMENTATION
                        activeMenu
                            ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                            : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                    }>

                        {/* NAVBAR IMPLEMENTATION */}
                        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                            <Navbar />
                        </div>

                        <div>
                            {themeSettings && <ThemeSettings />}


                            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
                                <Header category="Report" title="Machinery Maintenance" />

                                <button onClick={createPDF} type="button" className="font-bold py-1 px-4 rounded-full m-3 text-white absolute top-40 right-20 hover:bg-slate-700 bg-slate-500" >Download Report</button>


                                <div id="tableContainer">

                                    <div className="block w-full overflow-x-auto rounded-lg" >

                                        <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
                                            <img className="h-200 w-400 mb-5" src={logo} alt="logo" />
                                        </div>

                                        <div className="text-center mb-10">

                                            <p className="text-xl mt-2">Lanka MountCastle (Pvt) Ltd,</p>
                                            <p className="text-xl">No.124, Hendala, Wattala</p>
                                            <p>011 2942 672</p>
                                        </div>
                                        <p className="text-right text-xl mt-2 mb-3">Generated On : {currentdate}</p>
                                        <table className="w-full rounded-lg">
                                            <thead>
                                                <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                                                    <TableHeader value="Code" />
                                                    <TableHeader value="Item" />
                                                    <TableHeader value="Repairs" />
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
                                                        TotalCost = TotalCost + data.others,
                                                        total = formatter.format(TotalCost),

                                                        <tr className="text-sm h-10 border dark:border-slate-600" key={key}>
                                                            <TableData value={data.mid} />

                                                            <TableData value={data.machineDetailss.map((data1) => {
                                                                return (
                                                                    <div>
                                                                        <TableData value={data1.name} />
                                                                    </div>
                                                                )
                                                            })} />
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
                                        </table><br></br><br></br>
                                        <span className="text-xs font-semibold inline-block py-2 px-2  rounded text-red-600 bg-white-200 uppercase last:mr-0 mr-1">
                                            Total Cost of Machinery Maintenance : {total}

                                        </span>
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
}

