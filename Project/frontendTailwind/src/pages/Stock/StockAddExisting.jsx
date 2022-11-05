import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';

function StockAddExisting() {

    //useNavigate is a hook that is used to navigate to another page
    const navigate = useNavigate();

    const [stock, setStock] = useState('');
    const [stockUtil, setStockUtil] = useState('');
    const [stockCode, setStockCode] = useState('');
    var [stockName, setstockName] = useState('');
    var [stockCategory, setStockCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    var [supplier, setSupplier] = useState('');
    var [totalValue, setTotalValue] = useState('');

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
    }, [])

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
            <Header category="Form" title=" Create New Stock" />
            <div className=" flex items-center justify-center ">

                <form onSubmit={async (e) => {
                    e.preventDefault();

                    var checkExists = "";
                    var checkAddition =0;
                    var checkIssues = 0;

                    {
                        stock.filter((stock) => stock.stockCode === stockCode).map((stock) => {
                            checkExists = stock.stockCode,
                            stockName = stock.stockName,
                            stockCategory = stock.stockCategory

                            {if(stock.type === "Additions"){
                                {checkAddition = 1}
                            }else if (stock.type === "Issues"){
                                {checkIssues = 1}
                            }}
                            
                        })
                    }

                    { totalValue = quantity * unitPrice }

                    if (supplier === '') {
                        supplier = "-";
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

                    // console.log(newStock)
                    // await axios.post("http://localhost:8070/stock/create", newStock).then(() => {
                    //     alert("Data saved successfully");
                    //     navigate('/StockDashboard');

                    // }).catch((err) => {
                    //     console.log(err);
                    //     alert("ERROR: Could not add stock");
                    //     navigate('/StockAdd');
                    // })

                    {
                        if (checkExists === "") {
                            alert('Entry does not exist in stock information.For non existing stocks addition, please add from stock information page');
                            navigate('/StockDashboard')
                        } else {
                            // if (checkExists === stockCode && date === currentDate && checkAddition === 1 && checkIssues ===1) {
                                
                            //     alert("An entry with " + stockCode + " and additions and issues already exists for today's date");
                            //     navigate('/StockUtilisation')

                            // } 
                            // else if (checkExists === stockCode && date === currentDate && checkAddition === 1) {
                                
                            //     alert("An entry with " + stockCode + " and " + type + " already exists for today's date");
                            //     navigate('/StockUtilisation')

                            // }
                            // else if (checkExists === stockCode && date === currentDate && checkIssues === 1) {
                                
                            //     alert("An entry with " + stockCode + " and " + type + " already exists for today's date");
                            //     navigate('/StockUtilisation')

                            // }else {
                                await axios.post("http://localhost:8070/stockUtilisation/create", newStockUtil).then(() => {
                                    alert("Data saved successfully");
                                    navigate('/StockUtilisation');

                                }).catch((err) => {
                                    console.log(err);
                                    alert("ERROR: Could not add stock");
                                    navigate('/StockAddExisting');
                                })
                            }
                        }
                    

                }}>

                    <div className="mb-3">
                        <label for="stockCode" className="form-label">Stock Code: </label>
                        <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="code" placeholder="Enter stock code..." pattern="[A-Z]{1}[0-9]{3,7}"
                            title="The code needs to start with one uppercase letter, atleast 3 digits and should not exceed 8 characters" required onChange={(e) => {
                                setStockCode(e.target.value);
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

                    <div className="mb-3">
                        <label for="type" className="form-label">Type: </label>
                        < select class="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="stockCategory" title="Please choose one of the options" required onChange={(e) => {
                            setType(e.target.value);
                            //myFunction();
                        }}>
                            <option selected  >Select option...</option>
                            <option value="Additions">Additions</option>
                            <option value="Issues">Issues</option>
                        </select>
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

        </div >
    )
}

export default StockAddExisting;