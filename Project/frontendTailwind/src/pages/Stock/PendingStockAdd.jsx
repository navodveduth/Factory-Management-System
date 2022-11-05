import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';

function PendingStockAdd() {

    //useNavigate is a hook that is used to navigate to another page
    const navigate = useNavigate();

    const [stockCode, setStockCode] = useState('');
    const [stockName, setStockName] = useState('');
    const [stockCategory, setStockCategory] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');

    //gets the current date
    var currentDate = new Date().toISOString().split('T')[0];
    console.log(currentDate)

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
            <Header category="Form" title=" Create New Stock" />
            <div className=" flex items-center justify-center ">

                <form onSubmit={async (e) => {
                    e.preventDefault();

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
                        alert("Data saved successfully");
                        navigate('/PendingStockView');

                    }).catch((err) => {
                        console.log(err);
                        alert("ERROR: Could not add stock");
                        navigate('/PendingStockAdd');
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

                    <div className="mb-3">
                        <label for="status" className="form-label">Status: </label>
                        < select class="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="status" title="Please choose one of the options" required onChange={(e) => {
                            setStatus(e.target.value);
                            //myFunction();
                        }}>
                            <option selected  >Select option...</option>
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label for="quantity" className="form-label">Quantity Required: </label>
                        <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="quantity" placeholder="Enter quantity..." min="0"
                            title="If there is no stock please input 0" required onChange={(e) => {
                                setQuantity(e.target.value);
                            }} />
                    </div>

                    <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Add stock request</button>

                </form>
            </div>

        </div>
    )
}

export default PendingStockAdd;