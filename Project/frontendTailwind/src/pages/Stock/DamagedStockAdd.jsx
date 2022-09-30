import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';

function DamagedStockAdd() {

    //useNavigate is a hook that is used to navigate to another page
    const navigate = useNavigate();

    const [stockCode, setStockCode] = useState('');
    const [damagedStockName, setDamagedStockName] = useState('');
    const [damagedStockCategory, setDamagedStockCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [updatedDate, setUpdatedDate] = useState('');
    const [value, setValue] = useState('');
    //var [totalValue, setTotalValue] = useState('');
    const [usability, setUsability] = useState('');

    const totalValue = quantity * value;
    var date = new Date().toISOString().split('T')[0];

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
            <Header category="Form" title=" Create New Damaged Stock" />
            <div className=" flex items-center justify-center ">
                <form onSubmit={async (e) => {
                    e.preventDefault();

                    //totalValue = (quantity * value);

                    const newDamagedStock = {
                        stockCode,
                        damagedStockName,
                        damagedStockCategory,
                        quantity,
                        updatedDate,
                        value,
                        totalValue,
                        usability
                    }

                    console.log(newDamagedStock)
                    await axios.post("http://localhost:8070/damagedStock/create", newDamagedStock).then((res) => {
                        alert("Data saved successfully");
                        navigate('/DamagedStockDashboard');

                    }).catch((err) => {
                        console.log(err);
                        alert("ERROR: Could not add stock");
                        navigate('/DamagedStockAdd');
                    })
                }}>

                    <div className="mb-3">
                        <label for="stockCode" className="form-label">Stock Code: </label>
                        <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="code" placeholder="Enter stock code..." 
                            pattern="[A-Z]{1}[0-9]{3,7}"
                            title="The code needs to start with one uppercase letter, atleast 3 digits and should not exceed 8 characters" required onChange={(e) => {
                                setStockCode(e.target.value);
                            }} />
                    </div>

                    <div className="mb-3">
                        <label for="damagedStockName" className="form-label">Stock Name: </label>
                        <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="name" placeholder="Enter stock name..."
                            required onChange={(e) => {
                                setDamagedStockName(e.target.value);
                            }} />
                    </div>

                    <div className="mb-3">
                        <label for="damagedStockCategory" className="form-label">Category: </label>
                        < select class="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="category" title="Please choose a valid category" required onChange={(e) => {
                            setDamagedStockCategory(e.target.value);
                        }}>
                            <option selected  >Select option...</option>
                            <option value="Raw materials">Raw materials</option>
                            <option value="Work in progress">Work in progress</option>
                            <option value="Finished goods">Finished goods</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label for="quantity" className="form-label">Quantity: </label>
                        <input type="number" title="If there is no stock please input 0" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="quantity" min="0"
                            required onChange={(e) => {
                                setQuantity(e.target.value);
                            }} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Date: </label>
                        <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="date"
                            min="2010-01-01" max={date} required onChange={(e) => {
                                setUpdatedDate(e.target.value);
                            }} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Value: </label>
                        <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="value" placeholder="Enter value..."
                           min="0" step="0.01" title= "If the value of the damaged stock is not avilable or no value please enter 0" required onChange={(e) => {
                                setValue(e.target.value);
                            }} />
                    </div>

                    <div className="mb-3">
                        <label for="totalValue" className="form-label">Total Value: </label>
                        <input type="number" min="0" step="0.01" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="totalValue" value={quantity * value} readOnly
                        onChange={(e) => {
                            //setTotalValue(e.target.value)
                        }}/>
                    </div>

                    <div className="mb-3">
                        <label for="usability" className="form-label">Usability: </label>
                        < select class="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" title="Please select a valid option" required id="usability" onChange={(e) => {
                            setUsability(e.target.value);
                        }}>
                            <option selected  >Select option...</option>
                            <option value="Usable">Usable</option>
                            <option value="Not usable">Not usable</option>
                        </select>
                    </div>
                    <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Add new stock</button>

                </form>
            </div>

        </div>
    )
}

export default DamagedStockAdd;