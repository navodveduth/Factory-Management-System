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


function StockAddExisting() {

    //useNavigate is a hook that is used to navigate to another page
    const navigate = useNavigate();
    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

    //const [stock, setStock] = useState([]);
    //const [stockUtil,setStockUtil] = useState([]);
    const [stockCode, setStockCode] = useState('');
    var [stockName, setStockName] = useState('');
    var [stockCategory, setStockCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState('');
    const [firstPurchaseDate, setFirstPurchaseDate] = useState('');
    var [type, setType] = useState('');
    var [unitPrice, setUnitPrice] = useState('');
    var [supplier, setSupplier] = useState('');
    var [totalValue, setTotalValue] = useState('');

    //gets the current date
    var currentDate = new Date().toISOString().split('T')[0];


    const { id } = useParams();

    const getStock = () => {
        axios.get("http://localhost:8070/stock/" + id).then((res) => {
            setStockCode(res.data.stockCode);
            setStockName(res.data.stockName);
            setStockCategory(res.data.stockCategory);
            setFirstPurchaseDate(res.data.firstPurchaseDate);
        }).catch((err) => {
            alert(err);
        })
    }

    // const getStockUtil = async () => {  //getStock is the function to get the data from the backend
    //     axios.get("http://localhost:8070/stockUtilisation")
    //         .then((res) => {
    //             setStockUtil(res.data); //setStock is used to update the state variable
    //             console.log(res.data);
    //         })
    //         .catch((err) => {
    //             alert(err.message);
    //         })
    // }


    useEffect(() => { //useEffect is used to call the function getStock
        getStock();
        //getStockUtil();
        const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
            setCurrentColor(currentThemeColor);
            setCurrentMode(currentThemeMode);
        }
    }, [])

    var minDate = firstPurchaseDate.split('T')[0]

    // var view = true;
    // if (type === "Additions") {
    //     view = false;
    // } else if (type === "Issues") {
    //     view = true;
    // }

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
                                    <Header category="Form" title=" Add New Existing Stock" />
                                    <div className=" flex items-center justify-center ">

                                        <form onSubmit={async (e) => {
                                            e.preventDefault();

                                        
                                           
                                            { totalValue = quantity * unitPrice }
                                            {type = "Additions"}

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

                                           
                                            await axios.post("http://localhost:8070/stockUtilisation/create", newStockUtil).then(() => {
                                                Swal.fire({  
                                                    icon: 'success',
                                                    title: 'Data Successfully Saved',
                                                    color: '#f8f9fa',
                                                    background: '#6c757d',
                                                    showConfirmButton: false,
                                                    timer: 2000
                                                  })
                                                navigate('/StockUtilisation');

                                            }).catch((err) => {
                                                console.log(err);
                                                alert("ERROR: Could not add stock");
                                                navigate('/StockAddExisting/' + id);
                                            })

                                        }}>

                                            <div className="mb-3">
                                                <label for="stockCode" className="form-label">Stock Code: </label>
                                                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="code" placeholder="Enter stock code..." pattern="[A-Z]{1}[0-9]{3,7}"
                                                    value={stockCode} readOnly />
                                            </div>

                                            <div className="mb-3">
                                                <label for="stockName" className="form-label">Stock Name: </label>
                                                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="code" 
                                                    value={stockName} readOnly />
                                            </div>

                                            {/* max uses the above date variable and sets the max date to select from*/}
                                            <div className="mb-3">
                                                <label for="date" className="form-label">Date: </label>
                                                <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="date"
                                                    min={minDate} max={currentDate} required onChange={(e) => {
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
                                                    <option value="Additions">Additions</option>
                                                    <option value="Issues">Issues</option>
                                                </select>
                                            </div> */}

                                            <div className="mb-3">
                                                <label for="additions" className="form-label">Type: </label>
                                                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="addition" 
                                                    value={"Additions"} readOnly />
                                            </div>

                                            <div className="mb-3">
                                                <label for="quantity" className="form-label">Quantity: </label>
                                                <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="quantity" placeholder="Enter quantity..." min="0"
                                                    title="If there is no stock please input 0" required onChange={(e) => {
                                                        setQuantity(e.target.value);
                                                    }} />
                                            </div>

                                            <div className="mb-3">
                                                <label for="unitPrice" className="form-label">Unit price: </label>
                                                <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="unitPrice" placeholder='Enter price per unit...'
                                                    min="0" required title="If the unit price is not avilable please enter 0" step="0.01" onChange={(e) => {
                                                        setUnitPrice(e.target.value);
                                                    }} />
                                            </div>

                                            <div className="mb-3">
                                                <label for="totalValue" className="form-label">Total Value: </label>
                                                <input type="number" min="0" step="0.01" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="totalCost" value={quantity * unitPrice} readOnly />
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

export default StockAddExisting;