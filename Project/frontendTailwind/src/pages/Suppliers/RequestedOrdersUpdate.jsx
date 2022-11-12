import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';
import { FiUser } from 'react-icons/fi';
import { DashTopBox, DashTopButton, } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import Swal from 'sweetalert2';

import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';


function RequestedOrdersUpdate() {
    //useNavigate is a hook that is used to navigate to another page
    const navigate = useNavigate()
    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

    const [stockCode, setStockCode] = useState('');
    const [stockName, setStockName] = useState('');
    const [stockCategory, setStockCategory] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    var [date, setDate] = useState('');
    const [unitPrice , setUnitPrice] = useState('');
    const [ stock, setStock] = useState([]);
    var firstPurchaseDate = null;
    var totalValue = 0;
    var minDate = null;
    var status = null;

    const { id } = useParams();

    const getPendingStock = () => {
        axios.get("http://localhost:8070/pendingStock/" + id).then((res) => {
            setStockCode(res.data.stockCode);
            setStockName(res.data.stockName);
            setStockCategory(res.data.stockCategory);
            setDescription(res.data.description);
            setQuantity(res.data.quantity);
            setDate(res.data.date);
           // setStatus(res.data.status);
        }).catch((err) => {
            alert(err);
        })
    }

    const code = stockCode;

    const getStock =async  () => {
        await axios.get("http://localhost:8070/stock/ViewStock/" + code).then((res) => {
            console.log("data", res.data)
            setStock(res.data);
            setFirstPurchaseDate(res.data.firstPurchaseDate)
        }).catch(()=>{
//
        })
        
    }

    stock.map((data) => {
        minDate = data.firstPurchaseDate.split('T')[0];  
    })
console.log(minDate)

    useEffect(() => {
        getPendingStock();  
    }, [id]);

    useEffect(() => {
        getStock();
        const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
            setCurrentColor(currentThemeColor);
            setCurrentMode(currentThemeMode);
        }
    }, [code])

    var currentDate = new Date().toISOString().split('T')[0];

    var success = true;

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

                                <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white '>
                                    <Header category="Form" title="Update Stock" />
                                    <div className=" flex items-center justify-center">

                                        <form onSubmit={async (e) => {
                                            e.preventDefault();
                                            {
                                                status = "Resolved"
                                            }

                                            const newPStock = {
                                                stockCode,
                                                stockName,
                                                stockCategory,
                                                description,
                                                date,
                                                quantity,
                                                status
                                            }

                                            { totalValue = quantity * unitPrice }

                                            {
                                                var sufficientStock = "-";
                                                var reorderLevel = 0;
                                                var damagedQty = 0;
                                                var type = "Additions";
                                                var additions = quantity
                                            }

                                            {date = currentDate}

                                            if(stock.length === 0){
                                                success = false
                                            }
                                            
                                            if(success === false){
                                                {firstPurchaseDate = currentDate;}
                                            }else{
                                                {firstPurchaseDate = minDate}
                                            }

                                            const newStock = {
                                                stockCode,
                                                stockName,
                                                stockCategory,
                                                description,
                                                firstPurchaseDate,
                                                reorderLevel,
                                                sufficientStock,
                                                damagedQty
                                            }

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
                                            console.log('Stock:' ,stock)
                                            console.log('util ', newStockUtil)

                                            await axios.put("http://localhost:8070/pendingStock/update/" + id, newPStock)
                                                .then((res) => {
                                                    alert("Data updated successfully");
                                                    console.log(newStock);
                                                    //navigate to the stock view page
                                                    navigate('/RequestedStock');
                                                })
                                                .catch((err) => {
                                                    console.log(err);
                                                    alert("ERROR: Could not update stock");
                                                    navigate(`/RequestedOrdersUpdate/${id}`);
                                                })

                                              if(success === false){
                                            await axios.post("http://localhost:8070/stock/create", newStock).then(() => {
                                                Swal.fire({  
                                                    icon: 'success',
                                                    title: 'Data Successfully Saved',
                                                    color: '#f8f9fa',
                                                    background: '#6c757d',
                                                    showConfirmButton: false,
                                                    timer: 2000
                                                  })
                                                navigate('/RequestedStock');

                                            }).catch((err) => {
                                                console.log(err);
                                                alert(err);
                                                navigate('/StockView');
                                            })

                                            console.log(newStock)
                                        }
                                            await axios.post("http://localhost:8070/stockUtilisation/create", newStockUtil).then(() => {
                                                Swal.fire({  
                                                    icon: 'success',
                                                    title: 'Data Successfully Saved',
                                                    color: '#f8f9fa',
                                                    background: '#6c757d',
                                                    showConfirmButton: false,
                                                    timer: 2000
                                                  })
                                                navigate('/RequestedStock');

                                            }).catch((err) => {
                                                console.log(err);
                                                alert(err);
                                                navigate('/StockView');
                                            })

                                
                                        }}>

                                            <div className="mb-3">
                                                <label htmlFor="stockCode" className="text-md">Stock Code: </label>
                                                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                                    value={stockCode} id="stockCode" readOnly />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="stockName" className="form-label">Name: </label>
                                                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" value={stockName} id="stockName" readOnly />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="category" className="form-label">Category: </label>
                                                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" value={stockCategory} id="category" readOnly />
                                            </div>

                                            <div className="mb-3">
                                                <label for="description" className="form-label">Description: </label>
                                                <textarea className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="name" placeholder="Enter stock description..."
                                                    value={description} title="The name can contain only alphabets" required onChange={(e) => {
                                                        setDescription(e.target.value);
                                                    }} />
                                            </div>

                                            <div className="mb-3">
                                                <label for="qty" className="form-label">Quantity: </label>
                                                <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="unitPrice" placeholder='Enter quantity...'
                                                    min="0" value={quantity} title="If the unit price is not avilable please enter 0" onChange={(e) => {
                                                        setQuantity(e.target.value);
                                                    }} />
                                            </div>

                                            <div className="mb-3">
                                                <label for="qty" className="form-label">Unit Price: </label>
                                                <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="unitPrice" placeholder='Enter unit price...'
                                                    min="0" title="If the unit price is not avilable please enter 0" onChange={(e) => {
                                                        setUnitPrice(e.target.value);
                                                    }} />
                                            </div>

                                            <div className="mb-3">
                                                <label for="status" className="form-label">Status: </label>
                                                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="stat"
                                                    value={"Resolved"} readOnly />
                                            </div>

                                            <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Submit</button>
                                        </form>
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

export default RequestedOrdersUpdate