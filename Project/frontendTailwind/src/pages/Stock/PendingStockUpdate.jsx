import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';

function PendingStockUpdate() {
    //useNavigate is a hook that is used to navigate to another page
    const navigate = useNavigate()

    const [stockCode, setStockCode] = useState('');
    const [stockName, setStockName] = useState('');
    const [stockCategory, setStockCategory] = useState('');
    const [description, setDescription] = useState('');
    const [quantity,setQuantity] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');

    const { id } = useParams();

    const getPendingStock = () => {
        axios.get("http://localhost:8070/pendingStock/" + id).then((res) => {
            setStockCode(res.data.stockCode);
            setStockName(res.data.stockName);
            setStockCategory(res.data.stockCategory);
            setDescription(res.data.description);
            setQuantity(res.data.quantity);
            setDate(res.data.date);
            setStatus(res.data.status);
        }).catch((err) => {
            alert(err);
        })
    }

    useEffect(() => { getPendingStock() }, []);
 
    var currentDate = new Date().toISOString().split('T')[0];

    return (

        <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white '>
            <Header category="Form" title="Update Stock" />
            <div className=" flex items-center justify-center">

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

                    await axios.put("http://localhost:8070/pendingStock/update/" + id, newStock)
                        .then((res) => {
                            alert("Data updated successfully");
                            console.log(newStock);
                            //navigate to the stock view page
                            navigate('/PendingStockView');
                        })
                        .catch((err) => {
                            console.log(err);
                            alert("ERROR: Could not update stock");
                            navigate('/PendingStockUpdate');
                        })}}>

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
                        <label for="status" className="form-label">Status: </label>
                        < select class="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="status" title="Please choose one of the options" value={status} required onChange={(e) => {
                            setStatus(e.target.value);
                            //myFunction();
                        }}>
                            <option selected  >Select option...</option>
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    </div>

                    <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Submit</button>
                </form>
            </div>
        </div>

    )
}

export default PendingStockUpdate