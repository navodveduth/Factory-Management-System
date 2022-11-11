import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Header } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';
import Swal from 'sweetalert2';
import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';


function ViewAllRawMaterials() {
    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

    const [stock, setStock] = useState([]); //stock is the state variable and setStock is the function to update the state variable
    const [stockUtil, setStockUtil] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    var totRM = 0;
    var price = 0;


    // const getStock = async () => {  //getStock is the function to get the data from the backend
    //     axios.get("http://localhost:8070/stock")
    //         .then((res) => {
    //             setStock(res.data); //setStock is used to update the state variable
    //             console.log(res.data);
    //         })
    //         .catch((err) => {
    //             alert(err.message);
    //         })
    // }

    const getStock = async () => {  //getStock is the function to get the data from the backend
        axios.get("http://localhost:8070/stock/category/" + "Raw materials")
            .then((res) => {
                setStock(res.data); //setStock is used to update the state variable
                console.log(res.data);
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    const getStockUtil = async () => {  //getStock is the function to get the data from the backend
        axios.get("http://localhost:8070/stockUtilisation/category/" + "Raw materials")
            .then((res) => {
                setStockUtil(res.data); //setStock is used to update the state variable
                console.log(res.data);
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    const id = useParams();

    const deleteStock = async (id) => {
        await axios.delete('http://localhost:8070/stock/delete/' + id)
            .then(() => {
                getStock();
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    useEffect(() => { //useEffect is used to call the function getStock
        getStock();
        const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
            setCurrentColor(currentThemeColor);
            setCurrentMode(currentThemeMode);
        }
    }, [])

    useEffect(() => { //useEffect is used to call the function getStock
        getStockUtil();
    }, [])


    const confirmFunc = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            color: '#f8f9fa',
            background: '#6c757d',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteStock(id);
              Swal.fire({  
                icon: 'success',
                title: 'Data Successfully Deleted',
                color: '#f8f9fa',
                background: '#6c757d',
                showConfirmButton: false,
                timer: 2000
              })
            }else {
                navigate('/ViewAllRawMaterials');
            }
          })

    }

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
                            <div>
                                <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
                                    <Header category="Table" title="Raw Materials" />

                                    <div className=" flex items-center mb-5 ">
                                        <div>
                                            <input type="text" className=" block w-400 rounded-md bg-gray-100 focus:bg-white dark:text-black" placeholder="Search Here"
                                                onChange={(e) => {
                                                    setSearchTerm(e.target.value);
                                                }} />
                                        </div>
                                        <div className="mr-0 ml-auto">
                                            <Link to={"/generateRMPDF"}> {/* change this link your preview page */}
                                                <button type="button" className="py-1 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" >Generate Report</button>
                                            </Link>
                                        </div>

                                    </div>

                                    <div className="block w-full overflow-x-auto rounded-lg">
                                        <table className="w-full rounded-lg">
                                            <thead>
                                                <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                                                    <TableHeader value="Code" />
                                                    <TableHeader value="Bundle Name" />
                                                    <TableHeader value="Category" />
                                                    <TableHeader value="Initial Purchase" />
                                                    <TableHeader value="Units" />
                                                    <TableHeader value="Unit price" />
                                                    <TableHeader value="Total value" />
                                                    <TableHeader value="Manage" />
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {stock.filter((data) => { 
                                                    if (searchTerm == "") {
                                                        return data;
                                                    } else if ((data.stockCode.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                                        (data.stockName.toLowerCase().includes(searchTerm.toLowerCase()))) {
                                                        return data;
                                                    }
                                                }).map((data, key) => {//map is used to iterate the array
                                                    const date = new Date(data.firstPurchaseDate).toISOString().split('T')[0];

                                                    var totAdds = 0;
                                                    var totIssues = 0;
                                                    var quantity = 0;
                                                    var totalValue = 0;

                                                    {
                                                        stockUtil.filter((stockUtil) => stockUtil.type == "Additions" &&
                                                            stockUtil.stockCode == data.stockCode && stockUtil.firstPurchaseDate === data.firstPurchaseDate).map((stockUtil) => {
                                                                totAdds += stockUtil.quantity
                                                                totRM += parseFloat((stockUtil.quantity * stockUtil.unitPrice));
                                                                price = stockUtil.unitPrice
                                                            })
                                                    }
                                                    {
                                                        stockUtil.filter((stockUtil) => stockUtil.type === "Issues" &&
                                                            stockUtil.stockCode == data.stockCode && stockUtil.firstPurchaseDate === data.firstPurchaseDate).map((stockUtil) => {
                                                                totIssues += stockUtil.quantity
                                                                totRM -= parseFloat((stockUtil.quantity * stockUtil.unitPrice));
                                                            })
                                                    }

                                                    { quantity = totAdds - totIssues - data.damagedQty }
                                                    { totalValue = price * quantity }

                                                    if (quantity < 0) {
                                                        { quantity = "No usable stocks left" }
                                                        { totalValue = 0 }
                                                    }

                                                    var datacolor = null;
                                                    if (quantity === "No usable stocks left") {
                                                        datacolor = "text-red-600 font-bold";
                                                    }

                                                    return (
                                                        < tr className="text-sm h-10 border dark:border-slate-600" >
                                                            <TableData value={data.stockCode} />
                                                            <TableData value={data.stockName} />
                                                            <TableData value={data.stockCategory} />
                                                            <TableData value={date} />
                                                            <td className={`${datacolor} text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3`}>{quantity} </td>
                                                            <TableData value={formatter.format(price)} />
                                                            <TableData value={formatter.format(totalValue)} />

                                                            <td className="text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">
                                                                <Link to={`/StockInformation/${data._id}`}>
                                                                    <button
                                                                        type="button"
                                                                        className="bg-neutral-500 font-bold py-1 px-4 rounded-full mx-3 text-white"
                                                                    >
                                                                        <i className="fas fa-info-circle" />
                                                                    </button>
                                                                </Link>

                                                                <Link to={`/StockUpdate/${data._id}`}>
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
                                        </table>
                                        <br></br><br></br>
                                        <span className="text-xs font-semibold inline-block py-2 px-2  rounded text-red-600 bg-white-200 uppercase last:mr-0 mr-1">
                                            Total Raw materials : {formatter.format(totRM)}

                                        </span>
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

export default ViewAllRawMaterials