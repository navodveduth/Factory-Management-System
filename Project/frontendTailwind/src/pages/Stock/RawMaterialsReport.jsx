import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';
import { jsPDF } from "jspdf";

function RawMaterialsReport() {
    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

    const [stock, setStock] = useState([]); //stock is the state variable and setStock is the function to update the state variable
    const [stockUtil, setStockUtil] = useState([]);

    const getStock = async () => {  //getStock is the function to get the data from the backend
        axios.get("http://localhost:8070/stock")
            .then((res) => {
                setStock(res.data); //setStock is used to update the state variable
                console.log(res.data);
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    const getStockUtil = async () => {  //getStock is the function to get the data from the backend
        axios.get("http://localhost:8070/stockUtilisation")
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
    }, [])

    const createPDF = async () => {
        const date = new Date().toISOString().split('T')[0];
        const pdf = new jsPDF("landscape", "px", "a2", false);
        const data = await document.querySelector("#tblPDF");
        pdf.html(data).then(() => {
            pdf.save("Damagedstocks_" + date + ".pdf");
        });
    };

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
                                    <Header category="Table" title="Preview" />

                                    <div className=" flex items-center mb-5 ">
                                        <div className="mr-0 ml-auto">
                                            <button onClick={createPDF} type="button" className="py-1 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" >Download</button>
                                        </div>
                                    </div>

                                    <div id="tblPDF" className="block w-full overflow-x-auto rounded-lg">
                                        <table className="w-full rounded-lg">
                                            <thead>
                                                <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                                                    <TableHeader value="Code" />
                                                    <TableHeader value="Bundle Name" />
                                                    <TableHeader value="Category" />
                                                    <th className='px-4 py-3 text-md whitespace-nowrap font-semibold text-center text-black-300'>Description</th>
                                                    <TableHeader value="Units" />
                                                    <TableHeader value="Unit price" />
                                                    <TableHeader value="Total value" />
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    stock.filter((data) => data.stockCategory === "Raw materials").map((data) => {//map is used to iterate the array
                                                        //const date = new Date(data.lastUpdated).toISOString().split('T')[0];

                                                        var totAdds = 0;
                                                        var totIssues = 0;
                                                        var quantity = 0;
                                                        var totalValue = 0;

                                                        {
                                                            stockUtil.filter((stockUtil) => stockUtil.type == "Additions" &&
                                                                stockUtil.stockCode == data.stockCode && stockUtil.firstPurchaseDate === data.firstPurchaseDate).map((stockUtil) => {
                                                                    totAdds += stockUtil.quantity
                                                                })
                                                        }
                                                        {
                                                            stockUtil.filter((stockUtil) => stockUtil.type === "Issues" &&
                                                                stockUtil.stockCode == data.stockCode && stockUtil.firstPurchaseDate === data.firstPurchaseDate).map((stockUtil) => {
                                                                    totIssues += stockUtil.quantity
                                                                })
                                                        }

                                                        { quantity = totAdds - totIssues - data.damagedQty }
                                                        { totalValue = data.unitPrice * quantity }

                                                        if (quantity < 0) {
                                                            { quantity = "No usable stocks left" }
                                                            { totalValue = 0 }
                                                        }

                                                        var datacolor = "text-black";
                                                        if (quantity === "No usable stocks left") {
                                                            datacolor = "text-red-600 font-bold";
                                                        }

                                                        return (
                                                            < tr className="text-sm h-10 border dark:border-slate-600" >
                                                                <TableData value={data.stockCode} />
                                                                <TableData value={data.stockName} />
                                                                <TableData value={data.stockCategory} />
                                                                {/* change the column width */}
                                                                <td className={"max-w-200 text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3"}>{data.description}</td>
                                                                <td className={`${datacolor} text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3`}>{quantity} </td>
                                                                <TableData value={data.unitPrice} />
                                                                <TableData value={"Rs." + totalValue} />


                                                            </tr>
                                                        )
                                                    })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div >
                            </div>
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RawMaterialsReport