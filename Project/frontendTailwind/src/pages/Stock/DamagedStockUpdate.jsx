import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';

function DamagedStockUpdate() {

    //useNavigate is a hook that is used to navigate to another page
    const navigate = useNavigate()

    const [stockCode, setStockCode] = useState('');
    const [damagedStockName, setDamagedStockName] = useState('');
    const [damagedStockCategory, setDamagedStockCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [updatedDate, setUpdatedDate] = useState('');
    const [value, setValue] = useState('');
    var [totalValue, setTotalValue] = useState('');
    const [usability, setUsability] = useState('');

    const { id } = useParams(); //get the id from the url
    var date = new Date().toISOString().split('T')[0];

    const getDamagedStock = () => {
        axios.get(`http://localhost:8070/damagedStock/${id}`)
            .then((res) => {
                setStockCode(res.data.stockCode);
                setDamagedStockName(res.data.damagedStockName);
                setDamagedStockCategory(res.data.damagedStockCategory);
                setUpdatedDate(res.data.updatedDate)
                setQuantity(res.data.quantity)
                setValue(res.data.value);
                setTotalValue(res.data.totalValue);
                setUsability(res.data.usability);
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    useEffect(() => { //this will run when the page is loaded
        getDamagedStock();
    }, []);


    return (
        <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white '>
            <Header category="Form" title="Update Stock" />
            <div className=" flex items-center justify-center">

                <form onSubmit={async (e) => {
                    e.preventDefault();


                    var total = quantity * value;
                    { totalValue = total }

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

                    await axios.put("http://localhost:8070/damagedStock/update/" + id, newDamagedStock)
                        .then((res) => {
                            alert("Data updated successfully");
                            //navigate to the stock view page
                            navigate('/DamagedStockView');
                        })
                        .catch((err) => {
                            console.log(err);
                            alert("ERROR: Could not update stock");
                            navigate('/DamagedStockUpdate');
                        })
                }}>

                    <div className="mb-3">
                        <label for="stockCode" className="form-label">Stock Code: </label>
                        <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" value={stockCode} id="stockCode" readOnly />
                    </div>

                    <div className="mb-3">
                        <label for="stockName" className="form-label">Stock Name: </label>
                        <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" value={damagedStockName} id="damagedStockName" readOnly />
                    </div>

                    <div className="mb-3">
                        <label for="category" className="form-label">Category: </label>
                        <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" value={damagedStockCategory} id="category" readOnly />
                    </div>

                    <div className="mb-3">
                        <label for="quantity" className="form-label">Quantity: </label>
                        <input type="number" required title="If there is no stock please input 0" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="quantity" value={quantity} min="0"
                            onChange={(e) => {
                                setQuantity(e.target.value);
                            }} />
                    </div>

                    <div className="mb-3">
                        <label for="date" className="form-label">Date: </label>
                        <input type="date" min="2010-01-01" max={date} value={updatedDate} className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="date"
                            required onChange={(e) => {
                                setUpdatedDate(e.target.value);
                            }} />
                    </div>
                    <div className="mb-3">
                        <label for="value" className="form-label">Value: </label>
                        <input type="number" min="0" title="If the unit price is not avilable please enter 0" step="0.01" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="value" value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                            }} />
                    </div>

                    <div className="mb-3">
                        <label for="totalValue" className="form-label">Total Value: </label>
                        <input type="number" min="0" step="0.01" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="totalCost" value={quantity * value} readOnly
                            onChange={(e) => {
                                setTotalValue(e.target.value);
                            }} />
                    </div>

                    <div className="mb-3">
                        <label for="usability" className="form-label">Usability: </label>
                        < select class="form-select" id="usability" title="Please choose a valid option" required value={usability} onChange={(e) => {
                            setUsability(e.target.value);
                        }}>
                            <option selected  >Select option...</option>
                            <option value="Usable">Usable</option>
                            <option value="Not usable">Not usable</option>
                        </select>
                    </div>

                    <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Submit</button>
                </form>
            </div>
        </div>

    )
}

export default DamagedStockUpdate