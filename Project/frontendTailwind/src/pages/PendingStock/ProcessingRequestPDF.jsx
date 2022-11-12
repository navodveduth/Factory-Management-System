import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';
import { DashTopBox, DashTopButton, } from '../../components';
import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import logo from '../../data/logo.png';
import Swal from 'sweetalert2';

import { jsPDF } from "jspdf";

function ProcessingRequestPDF() {

    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

    const [pendingStock, setPendingStock] = useState([]); //stock is the state variable and setStock is the function to update the state variable
    const [searchTerm, setSearchTerm] = useState("");


    const getPendingStock = async () => {  //getStock is the function to get the data from the backend
        axios.get("http://localhost:8070/pendingStock/status/" + "Processing")
            .then((res) => {
                setPendingStock(res.data); //setStock is used to update the state variable
                console.log(res.data);
            })
            .catch((err) => {
                alert(err.message);
            })
    }
    useEffect(() => { //useEffect is used to call the function getStock
        getPendingStock();
        const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
            setCurrentColor(currentThemeColor);
            setCurrentMode(currentThemeMode);
        }
    }, [])

    const createPDF = async () => {
        const date = new Date().toISOString().split('T')[0];
        const pdf = new jsPDF("landscape", "px", "a1", false);
        const data = await document.querySelector("#tblPDF");
        pdf.html(data).then(() => {
            pdf.save("ProcessingStockOrder" + date + ".pdf");
        });
    };

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

    //getDAte
    const current = new Date();
    const currentdate = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;

    return (
        <div>
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

                                <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
                                    <Header category="Table" title="Stocks Request Report Preview" />

                                    <div className=" flex items-center mb-5 ">
                                        <div className="mr-0 ml-auto">
                                            <button onClick={()=>{createPDF(); downloadConf();}} type="button" className="py-1 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" >Download</button>
                                        </div>
                                    </div>

                                    <div id="tblPDF">
                                        <div className="block w-full overflow-x-auto rounded-lg">
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
                                                        <TableHeader value="Bundle Name" />
                                                        <TableHeader value="Category" />
                                                        <TableHeader value="Description" />
                                                        <TableHeader value="Date" />
                                                        <TableHeader value="Units" />
                                                        <TableHeader value="Status" />
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {pendingStock.filter((data) => data.status === "Processing").map((data) => {//map is used to iterate the array


                                                        var datacolor = "text-black";
                                                        if (data.status === "Pending") {
                                                            datacolor = "text-red-600 font-bold";
                                                        } else if (data.status === "Resolved") {
                                                            datacolor = "text-green-500 font-bold";
                                                        } else {
                                                            datacolor = "text-yellow-500 font-bold";
                                                        }
                                                        return (
                                                            < tr className="text-sm h-10 border dark:border-slate-600" >
                                                                <TableData value={data.stockCode} />
                                                                <TableData value={data.stockName} />
                                                                <TableData value={data.stockCategory} />
                                                                <td className={"text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3"}>{data.description}</td>
                                                                <TableData value={data.date.split('T')[0]} />
                                                                <TableData value={data.quantity} />
                                                                <td className={`${datacolor} text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3`}>{data.status} </td>
                                                            </tr>
                                                        )
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

export default ProcessingRequestPDF