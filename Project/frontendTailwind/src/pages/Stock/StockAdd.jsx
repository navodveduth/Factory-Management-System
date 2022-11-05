import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';
import { FiUser } from 'react-icons/fi';
import { DashTopBox, DashTopButton,  } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';

import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

function StockAdd() {

    //useNavigate is a hook that is used to navigate to another page
    const navigate = useNavigate();
    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

    const [stockCode, setStockCode] = useState('');
    const [stockName, setStockName] = useState('');
    const [stockCategory, setStockCategory] = useState('');
    const [description, setDescription] = useState('');
    var [damagedQty, setDamagedQty] = useState('');
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState('');
    var [type, setType] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    var [supplier, setSupplier] = useState('');
    var [totalValue, setTotalValue] = useState('');
    var [additions, setAdditions] = useState('');
    var [reorderLevel, setReorderLevel] = useState('');
    var [sufficientStock, setSufficientStock] = useState('');

    //gets the current date
    var currentDate = new Date().toISOString().split('T')[0];
    console.log(currentDate)

    // var displayM = true;
    // if (stockCategory === ''){
    //     displayM = true;
    // }
    // else if (stockCategory != "Finished goods") {
    //     displayM = false;
    // } else{
    //     displayM = true;
    //     supplier  = "-";
    // }
    useEffect(() => {
        const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
          setCurrentColor(currentThemeColor);
          setCurrentMode(currentThemeMode);
        }
      }, []);

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
                                    <Header category="Form" title=" Create New Stock" />
                                    <div className=" flex items-center justify-center ">

                                        <form onSubmit={async (e) => {
                                            e.preventDefault();

                                            { totalValue = quantity * unitPrice }

                                            if (supplier === '') {
                                                { supplier = "-" }
                                            }

                                            {
                                                sufficientStock = "-";
                                                reorderLevel = 0;
                                                damagedQty = 0;
                                                type = "Additions";
                                                additions = quantity
                                            }

                                            const newStock = {
                                                stockCode,
                                                stockName,
                                                stockCategory,
                                                description,
                                                reorderLevel,
                                                unitPrice,
                                                totalValue,
                                                sufficientStock,
                                                damagedQty
                                            }

                                            const newStockUtil = {
                                                stockCode,
                                                stockName,
                                                stockCategory,
                                                date,
                                                type,
                                                supplier,
                                                unitPrice,
                                                quantity,
                                                totalValue
                                            }

                                            console.log(newStock)
                                            await axios.post("http://localhost:8070/stock/create", newStock).then(() => {
                                                alert("Data saved successfully");
                                                navigate('/StockDashboard');

                                            }).catch((err) => {
                                                console.log(err);
                                                alert("ERROR: Could not add stock");
                                                navigate('/StockAdd');
                                            })

                                            await axios.post("http://localhost:8070/stockUtilisation/create", newStockUtil).then(() => {
                                                alert("Data saved successfully");
                                                navigate('/StockDashboard');

                                            }).catch((err) => {
                                                console.log(err);
                                                alert("ERROR: Could not add stock");
                                                navigate('/StockAdd');
                                            })
                                        }}>

                                            <div className="mb-3">
                                                <label for="stockCode" className="form-label">Stock Code: </label>
                                                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="code" placeholder="Enter stock code..." pattern="[A-Z]{1}[0-9]{3,7}"
                                                    title="The code needs to start with one uppercase letter, atleast 3 digits and should not exceed 8 characters" required onChange={(e) => {
                                                        setStockCode(e.target.value);
                                                    }} />
                                            </div>

                                            <div className="mb-3">
                                                <label for="stockName" className="form-label">Stock Name: </label>
                                                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="name" placeholder="Enter stock name..."
                                                    title="The name can contain only alphabets" required onChange={(e) => {
                                                        setStockName(e.target.value);
                                                    }} />
                                            </div>

                                            <div className="mb-3">
                                                <label for="category" className="form-label">Category: </label>
                                                < select class="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="stockCategory" title="Please choose one of the options" required onChange={(e) => {
                                                    setStockCategory(e.target.value);
                                                    //myFunction();
                                                }}>
                                                    <option selected  >Select option...</option>
                                                    <option value="Raw materials">Raw materials</option>
                                                    <option value="Work in progress">Work in progress</option>
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label for="description" className="form-label">Description: </label>
                                                <textarea className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="name" placeholder="Enter stock description..."
                                                    title="The name can contain only alphabets" required onChange={(e) => {
                                                        setDescription(e.target.value);
                                                    }} />
                                            </div>

                                            {/* max uses the above date variable and sets the max date to select from*/}
                                            <div className="mb-3">
                                                <label for="date" className="form-label">Date: </label>
                                                <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="date"
                                                    min="2010-01-01" max={currentDate} required onChange={(e) => {
                                                        setDate(e.target.value);
                                                    }} />
                                            </div>

                                            {/* <div className="mb-3">
                        <label for="type" className="form-label">Type: </label>
                        < select class="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="stockCategory" title="Please choose one of the options" required onChange={(e) => {
                            setType(e.target.value);
                            //myFunction();
                        }}>
                            <option selected  >Select option...</option>
                            <option value="Additions">Raw materials</option>
                            <option value="Issues">Work in progress</option>
                        </select>
                    </div> */}

                                            <div className="mb-3">
                                                <label for="quantity" className="form-label">Quantity Purchased: </label>
                                                <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="quantity" placeholder="Enter quantity..." min="0"
                                                    title="If there is no stock please input 0" required onChange={(e) => {
                                                        setQuantity(e.target.value);
                                                    }} />
                                            </div>

                                            <div className="mb-3">
                                                <label for="unitPrice" className="form-label">Unit price: </label>
                                                <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="unitPrice" placeholder='Enter price per unit...'
                                                    min="0" title="If the unit price is not avilable please enter 0" step="0.01" onChange={(e) => {
                                                        setUnitPrice(e.target.value);
                                                    }} />
                                            </div>

                                            <div className="mb-3" >
                                                <label for="supplier" className="form-label">Materials provided by: </label>
                                                <input id="supplier" type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" placeholder="Enter supplier name..."
                                                    value={supplier} onChange={(e) => {
                                                        setSupplier(e.target.value);
                                                    }} />
                                            </div>

                                            <div className="mb-3">
                                                <label for="totalValue" className="form-label">Total Value: </label>
                                                <input type="number" min="0" step="0.01" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="totalCost" value={quantity * unitPrice} readOnly />
                                            </div>

                                            <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Add new stock</button>

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

export default StockAdd;