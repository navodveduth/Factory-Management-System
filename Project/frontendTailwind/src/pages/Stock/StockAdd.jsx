import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

function StockAdd() {

    //useNavigate is a hook that is used to navigate to another page
    const navigate = useNavigate();

    const [stockCode, setStockCode] = useState('');
    const [stockName, setStockName] = useState('');
    const [stockCategory, setStockCategory] = useState('');
    const [lastUpdated, setLastUpdated] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    var [supplier, setSupplier] = useState('');
    var [totalValue, setTotalValue] = useState('');

    //gets the current date
    var date = new Date().toISOString().split('T')[0];
    console.log(date)

    var displayM = true;
    if (stockCategory === ''){
        displayM = true;
    }
    else if (stockCategory != "Finished goods") {
        displayM = false;
    } else
        displayM = true;

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
            <Header category="Form" title=" Create New Stock" />
            <div className=" flex items-center justify-center ">

                <form onSubmit={async (e) => {
                    e.preventDefault();

                    totalValue = quantity * unitPrice;

                    if(supplier === '')
                    {
                        supplier = "-";
                    }

                    const newStock = {
                        stockCode,
                        stockName,
                        stockCategory,
                        lastUpdated,
                        quantity,
                        unitPrice,
                        supplier,
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
                            <option value="Finished goods">Finished goods</option>
                        </select>
                    </div>
                    {/* max uses the above date variable and sets the max date to select from*/}
                    <div className="mb-3">
                        <label for="date" className="form-label">Date: </label>
                        <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="date"
                            min="2010-01-01" max={date} required onChange={(e) => {
                                setLastUpdated(e.target.value);
                            }} />
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
                        <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="supplier" placeholder="Enter supplier name..."
                            disabled={displayM} onChange={(e) => {
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
    )
}

export default StockAdd;