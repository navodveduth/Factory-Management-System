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


function AddStockForRequisition() {

    //useNavigate is a hook that is used to navigate to another page
    const navigate = useNavigate();
    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

    var stockCode = null;
    var stockName = null;
    var stockCategory = null;
    var description = null;

    const [quantity, setQuantity] = useState('');
    var [date, setDate] = useState('');
    var [status, setStatus] = useState('');
    const [stock, setStock] = useState([]);
    //gets the current date
    var currentDate = new Date().toISOString().split('T')[0];
    console.log(currentDate)

    const { id } = useParams();

    var minDate = null;

    console.log("id", id)
    //stock request
    const getStock = async () => {
        await axios.get(`http://localhost:8070/stock/ViewStock/${id}`).then((res) => {
            console.log("data", res.data)
            setStock(res.data);
        }).catch(() => {
            //
        })

    }
    const name = stockName;
    console.log(name)

    async function confirmNull() {
        Swal.fire({
            icon: 'success',
            title: 'Stock is unavailable. Please make a purchase order request',
            color: '#f8f9fa',
            background: '#6c757d',
            showConfirmButton: false,
            timer: 2000
        })
        navigate('/PendingStockAdd')
    }

    useEffect(() => { //useEffect is used to call the function getStock
        if (id === "null") {
            confirmNull();
        }
        getStock();
    }, [id])

    useEffect(() => { //useEffect is used to call the function getStock

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
        stockName = data.stockName;
        stockCategory = data.stockCategory;
        description = data.description;
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

                                <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
                                    <Header category="Form" title="Stock Purchase Request" />
                                    <div className=" flex items-center justify-center ">

                                        <form onSubmit={async (e) => {
                                            e.preventDefault();

                                            { status = "Processing" }
                                            { date = currentDate}
                                            const newStock = {
                                                stockCode,
                                                stockName,
                                                stockCategory,
                                                description,
                                                date,
                                                quantity,
                                                status
                                            }

                                            console.log(newStock)
                                            await axios.post("http://localhost:8070/pendingStock/create", newStock).then(() => {
                                                Swal.fire({
                                                    icon: 'success',
                                                    title: 'Data Successfully Saved',
                                                    color: '#f8f9fa',
                                                    background: '#6c757d',
                                                    showConfirmButton: false,
                                                    timer: 2000
                                                })
                                                navigate('/ProcessingRequest');

                                            }).catch((err) => {
                                                console.log(err);
                                                alert("ERROR: Could not add stock");
                                                navigate('/PendingStockAdd');
                                            })
                                        }}>

                                            <div className="mb-3">
                                                <label for="stockCode" className="form-label">Stock Code: </label>
                                                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="code"
                                                    value={stockCode} readOnly />
                                            </div>

                                            <div className="mb-3">
                                                <label for="stockName" className="form-label">Stock Name: </label>
                                                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="name"
                                                    value={stockName} readOnly />
                                            </div>

                                            <div className="mb-3">
                                                <label for="stockCategory" className="form-label">Category: </label>
                                                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="cat"
                                                    value={stockCategory} readOnly />
                                            </div>

                                            {/* max uses the above date variable and sets the max date to select from*/}
                                            <div className="mb-3">
                                                <label for="date" className="form-label">Date: </label>
                                                <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="date"
                                                    // min={minDate} max={currentDate} 
                                                    value={currentDate} readOnly
                                                //onChange={(e) => {setDate(e.target.value);}} 
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label for="quantity" className="form-label">Quantity Required: </label>
                                                <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="quantity" placeholder="Enter quantity..." min="0"
                                                    title="Please input valid quantity" required onChange={(e) => {
                                                        setQuantity(e.target.value);
                                                    }} />
                                            </div>

                                            <div className="mb-3">
                                                <label for="status" className="form-label">Status: </label>
                                                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="stat"
                                                    value={"Processing"} readOnly />
                                            </div>

                                            <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Add stock request</button>

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

export default AddStockForRequisition;