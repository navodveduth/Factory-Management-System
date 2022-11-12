import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';
import { FiUser } from 'react-icons/fi';
import { DashTopBox, DashTopButton, } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import Swal from 'sweetalert2';

import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';


function IssuesForm() {

    //useNavigate is a hook that is used to navigate to another page
    const navigate = useNavigate();
    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

    //const [stock, setStock] = useState([]);
    //const [stockUtil,setStockUtil] = useState([]);
    const [invoiceNo, setInvoiceNo] = useState('');
    // const [stockCode, setStockCode] = useState('');
    var [stockName, setStockName] = useState('');
    const [stock, setStock] = useState([]);
    // var [stockCategory, setStockCategory] = useState("");
    const [quantity, setQuantity] = useState('');
    var [date, setDate] = useState('');
    // const [firstPurchaseDate, setFirstPurchaseDate] = useState("");
    var [type, setType] = useState('');
    var [unitPrice, setUnitPrice] = useState('');
    var [supplier, setSupplier] = useState('');
    var [totalValue, setTotalValue] = useState('');
    const [stockUtil, setStockUtil] = useState([]);

    //gets the current date
    var currentDate = new Date().toISOString().split('T')[0];
    var minDate = null;
    var stockCode = null;
    var stockCategory = null;
    var firstPurchaseDate = null;
    var totAdds = 0;
    var totIssues = 0;
    var remaining = 0;
    var damaged = 0;

    const { id } = useParams();

    var compareDate = null;

    console.log("id", id)
    //stock request
    const getCompleteOrder = () => {
        axios.get(`http://localhost:8070/stock/request/${id}`).then((res) => {
            console.log("date", res.data)
            setInvoiceNo(res.data.invoiceNo);
            setStockName(res.data.product);
            setUnitPrice(res.data.materialCost);
            setQuantity(res.data.unitQty);
        }).catch((err) => {
            alert(err.message);
        })
    }
    const name = stockName;
    console.log(name)


    const getStock = async () => {
        axios.get(`http://localhost:8070/stock/ViewStockname/${name}`).then((res) => {
            console.log("Stock", res.data)
            setStock(res.data);
            
        }).catch((err) => {
            //alert("Stock unavailable! Please make a purchase order request");
            // navigate('/StockView');
        })
    }

    const getStockUtil = async () => {  //getStock is the function to get the data from the backend
        axios.get("http://localhost:8070/stockUtilisation")
            .then((res) => {
                setStockUtil(res.data); //setStock is used to update the state variable
                console.log("stock util", res.data);
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    useEffect(() => { //useEffect is used to call the function getStock
        getStock();
    }, [name])
    

    useEffect(() => { //useEffect is used to call the function getStock
        getCompleteOrder();
        getStockUtil();
        const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
            setCurrentColor(currentThemeColor);
            setCurrentMode(currentThemeMode);
        }
    }, [])

    stock.map((data) => {
        minDate = data.firstPurchaseDate.split('T')[0];
        stockCode = data.stockCode;
        stockCategory = data.stockCategory;
        damaged = data.damagedQty
        compareDate = data.firstPurchaseDate
    })

    stockUtil.map((data) => {
        if (data.stockCode === stockCode && data.firstPurchaseDate === compareDate) {
            if (data.type === "Additions")
                totAdds += data.quantity;
            if (data.type === "Issues")
                totIssues += data.quantity;
        }
    })

    { remaining = totAdds - totIssues - damaged }

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

                                <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
                                    <Header category="Form" title="Issue Stock" />
                                    <div className=" flex items-center justify-center ">

                                        <form onSubmit={async (e) => {
                                            e.preventDefault();



                                            { totalValue = quantity * unitPrice }
                                            { type = "Issues" }
                                            { firstPurchaseDate = minDate }
                                            {date = currentDate}

                                            const newStockUtil = {
                                                stockCode,
                                                stockName,
                                                stockCategory,
                                                date,
                                                firstPurchaseDate,
                                                type,
                                                unitPrice,
                                                quantity,
                                                totalValue
                                            }

                                            if (remaining >= quantity) {
                                                await axios.post("http://localhost:8070/stockUtilisation/create", newStockUtil).then(() => {
                                                    Swal.fire({  
                                                        icon: 'success',
                                                        title: 'Stock issued',
                                                        color: '#f8f9fa',
                                                        background: '#6c757d',
                                                        showConfirmButton: false,
                                                        timer: 2000
                                                      })
                                                    navigate('/StockUtilisation');

                                                }).catch((err) => {
                                                    console.log(err);
                                                    alert("ERROR: Could not add stock");
                                                    navigate('/IssuesForm/' + id);
                                                })

                                                const salesStatus = "Completed"
                                                const statusPass = { salesStatus }
                                                await axios.put('http://localhost:8070/stock/updateStatus/' + id, { "status": salesStatus }).then((res) => {
                                                    
                                                }).catch((error) => {
                                                    Swal.fire({  
                                                        icon: 'success',
                                                        title: 'Production Status Updated',
                                                        color: '#f8f9fa',
                                                        background: '#6c757d',
                                                        showConfirmButton: false,
                                                        timer: 2000
                                                      })
                                                })
                                            } else {
                                                Swal.fire({  
                                                    icon: 'success',
                                                    title: `Not enough remaining quantity. Need ${quantity- remaining} ${name}. Place a Purchase request`,
                                                    color: '#f8f9fa',
                                                    background: '#6c757d',
                                                    showConfirmButton: false,
                                                    timer: 2000
                                                  })
                                                navigate('/PendingStockAddReq/' + stockCode);
                                            }


                                        }}>

                                            <div className="mb-3">
                                                <label for="invoiceNo" className="form-label">Invoice No: </label>
                                                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="invoiceNo"
                                                    value={invoiceNo} readOnly />
                                            </div>
                                            <div className="mb-3">
                                                <label for="stockCode" className="form-label">Stock Code: </label>
                                                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="code"
                                                    value={stockCode} readOnly />
                                            </div>

                                            <div className="mb-3">
                                                <label for="product" className="form-label">Product: </label>
                                                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="addition"
                                                    value={stockName} readOnly />
                                            </div>

                                            {/* max uses the above date variable and sets the max date to select from*/}
                                            <div className="mb-3">
                                                <label for="date" className="form-label">Date: </label>
                                                <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="date"
                                                    value={currentDate} //min={minDate} max={currentDate} required 
                                                    onChange={(e) => {
                                                        setDate(e.target.value);
                                                    }} />
                                            </div>



                                            <div className="mb-3">
                                                <label for="additions" className="form-label">Type: </label>
                                                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="addition"
                                                    value={"Issues"} readOnly />
                                            </div>

                                            <div className="mb-3">
                                                <label for="quantity" className="form-label">Quantity Available: </label>
                                                <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="quantity"
                                                    value={remaining} readOnly />
                                            </div>

                                            <div className="mb-3">
                                                <label for="quantity" className="form-label">Quantity Required: </label>
                                                <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="quantity"
                                                    value={quantity} readOnly />
                                            </div>

                                            <div className="mb-3">
                                                <label for="unitPrice" className="form-label">Unit price: </label>
                                                <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="unitPrice"
                                                    value={unitPrice} readOnly />
                                            </div>

                                            <div className="mb-3">
                                                <label for="totalValue" className="form-label">Total Value: </label>
                                                <input type="number" min="0" step="0.01" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="totalCost" value={quantity * unitPrice} readOnly />
                                            </div>

                                            <div className="mb-3">
                                                <label for="stockCode" className="form-label">Status: </label>
                                                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="code" placeholder="Enter stock code..." pattern="[A-Z]{1}[0-9]{3,7}"
                                                    value={"Completed"} readOnly />
                                            </div>

                                            <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Add entry for existing stock</button>

                                        </form>
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

export default IssuesForm;