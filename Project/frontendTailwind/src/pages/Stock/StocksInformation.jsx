import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FiUser } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings, Header } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';

import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { GiShamrock } from 'react-icons/gi';
import { jsPDF } from "jspdf";

const StockInformation = () => {

    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

    const [stock, setStock] = useState([]);
    const [stockUtil, setStockUtil] = useState([]);
    var lastIssue = 0;
    var lastAdd = 0;
    var code = 0;

    const { id } = useParams(); //get the id from the url
    
    const getStock = async () => {  //getStock is the function to get the data from the backend
        axios.get(`http://localhost:8070/stock/${id}`)
            .then((res) => {
                setStock(res.data); //setStock is used to update the state variable
                console.log(res.data);
            })
            .catch((err) => {
                alert(err.message);
            })
    }
    const stockNo = stock.stockCode;

    const getStockUtil = async () => {  //getStock is the function to get the data from the backend
        axios.get(`http://localhost:8070/stockUtilisation//ViewStockUtil/${stockNo}`)
            .then((res) => {
                setStockUtil(res.data); //setStock is used to update the state variable
                console.log(res.data);
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    useEffect(() => { //useEffect is used to call the function getStock
        getStock();
        getStockUtil();
        const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
            setCurrentColor(currentThemeColor);
            setCurrentMode(currentThemeMode);
        }
    }, [stock.stockCode])

    const createPDF = async () => {
        const date = new Date().toISOString().split('T')[0];
        const pdf = new jsPDF("landscape", "px", "a1", false);
        const data = await document.querySelector("#report");
        pdf.html(data).then(() => {
            pdf.save("stocks_" + code + "_" + date + ".pdf");
        });
    };

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'LKR',
        minimumFractionDigits: 2,
        currencyDisplay: 'symbol'
    })

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
                            <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white '>
                                <Header category="Report" title="Stocks Information" />

                                <div className=" flex items-center mb-5 ">
                                        <div className="mr-0 ml-auto">
                                            <button onClick={createPDF} type="button" className="py-1 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500 mb-2" >Download</button>
                                        </div>
                                    </div>

                                {stock.map((stock) => {//map is used to iterate the array
                                    //const date = new Date(data.lastUpdated).toISOString().split('T')[0];

                                    var totAdds = 0;
                                    var totIssues = 0;
                                    var quantity = 0;
                                    var totalValue = 0;
                                    code = stock.stockCode;

                                    {
                                        stockUtil.filter((stockUtil) => stockUtil.type == "Additions" &&
                                            stockUtil.stockCode == stock.stockCode && stockUtil.firstPurchaseDate === stock.firstPurchaseDate).map((stockUtil) => {
                                                totAdds += stockUtil.quantity,
                                                lastAdd = stockUtil.date.split('T')[0]
                                            })
                                    }
                                    {
                                        stockUtil.filter((stockUtil) => stockUtil.type === "Issues" &&
                                            stockUtil.stockCode == stock.stockCode && stockUtil.firstPurchaseDate === stock.firstPurchaseDate).map((stockUtil) => {
                                                totIssues += stockUtil.quantity,
                                                lastIssue = stockUtil.date.split('T')[0]
                                            })
                                    }

                                    { quantity = totAdds - totIssues - stock.damagedQty }
                                    { totalValue = stock.unitPrice * quantity }

                                    if (quantity < 0) {
                                        { quantity = "No usable stocks left" }
                                        { totalValue = 0 }
                                    }

                                    var datacolor = "text-black";
                                    if (quantity === "No usable stocks left") {
                                        datacolor = "text-red-600 font-bold";
                                    }

                                    if(lastIssue === "" || lastIssue === 0){
                                        lastIssue = "-"
                                    }

                                    return (
                                        <div id="report">
                                            <div className="bg-main-bg dark:bg-main-dark-bg rounded-3xl p-5 m-5" >
                                                <h1 className="text-2xl font-bold">Stock Details</h1>
                                                <div className="text-md ml-12 pt-5">
                                                    <div className="p-1"> <span className="font-bold"> Stock Code </span> : {stock.stockCode}</div>
                                                    <div className="p-1"> <span className="font-bold"> Bundle Name </span> : {stock.stockName}</div>
                                                    <div className="p-1"> <span className="font-bold"> Category </span> : {stock.stockCategory}</div>
                                                    <div className="p-1"> <span className="font-bold"> Description </span> : {stock.description}</div>
                                                    <div className="p-1"> <span className="font-bold"> Supplier </span> : {stock.stockUtilisationDetails.map((data3) => {
                                                        return (
                                                            <div>
                                                                {data3.supplier}
                                                            </div>
                                                        )

                                                    })}</div>
                                                </div>

                                            </div>
                                            <div className="bg-main-bg dark:bg-main-dark-bg rounded-3xl p-5 m-5">
                                                <h1 className="text-2xl font-bold">Stock Breakdown</h1>
                                                <div className="text-md ml-12 pt-5">
                                                    <div className="p-1"> <span className="font-bold"> Additions </span> : {totAdds}</div>
                                                    <div className="p-1"> <span className="font-bold"> Issues </span> : {totIssues}</div>
                                                    <div className="p-1"> <span className="font-bold"> Damaged Units </span> : {stock.damagedQty}</div>
                                                    <div className="p-1"> <span className="font-bold"> Reorder Level </span> : {stock.reorderLevel}</div>
                                                    <div className="p-1"> <span className="font-bold"> Buffer Stock </span> : {stock.sufficientStock}</div>
                                                </div>
                                            </div>

                                            <div className="bg-main-bg dark:bg-main-dark-bg rounded-3xl p-5 m-5">
                                                <h1 className="text-2xl font-bold">Transaction Details</h1>
                                                <div className="text-md ml-12 pt-5">
                                                    <div className="p-1"> <span className="font-bold"> First Purchase Date </span> : {stock.firstPurchaseDate.split('T')[0]}</div>
                                                    <div className="p-1"> <span className="font-bold"> Last Purchase </span> : {lastAdd}</div>
                                                    <div className="p-1"> <span className="font-bold"> Last Issue </span> : {lastIssue}</div>
                                                </div>
                                            </div>

                                            <div className="bg-main-bg dark:bg-main-dark-bg rounded-3xl p-5 m-5">
                                                <h1 className="text-2xl font-bold">Stock Valuation</h1>
                                                <div className="text-md ml-12 pt-5">
                                                    <div className="p-1"> <span className="font-bold"> Quantity </span> : {quantity}</div>
                                                    <div className="p-1"> <span className="font-bold"> Unit price </span> : {formatter.format(stock.unitPrice)}</div>
                                                    <div className="p-1"> <span className="font-bold"> Total value </span> : {formatter.format(quantity * stock.unitPrice)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <Footer />
                        </div>
                    </div>
                </div >
            </div >
        </div >
    );
};

export default StockInformation;
