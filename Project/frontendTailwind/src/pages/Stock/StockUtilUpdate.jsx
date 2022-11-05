import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';

function StockUtilUpdate() {
    //useNavigate is a hook that is used to navigate to another page
    const navigate = useNavigate()

    const [stockCode, setStockCode] = useState('');
    const [stockName, setStockName] = useState('');
    const [stockCategory, setStockCategory] = useState('');
    const [date,setDate] = useState('');
    const [type,setType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [supplier, setSupplier] = useState('');
    var [totalValue, setTotalValue] = useState('');

    const { id } = useParams();

    const getStockUtil = () => {
        axios.get("http://localhost:8070/stockUtilisation/" + id).then((res) => {
            setStockCode(res.data.stockCode);
            setStockName(res.data.stockName);
            setStockCategory(res.data.stockCategory);
            setDate(res.data.date);
            setQuantity(res.data.quantity);
            setType(res.data.type);
            setUnitPrice(res.data.unitPrice);
            setSupplier(res.data.supplier);
        }).catch((err) => {
            alert(err);
        })
    }

    useEffect(() => { getStockUtil() }, []);
    var formDate = date.split('T')[0];

    // var displayM = true;
    // if (stockCategory == ''){
    //     displayM = true;
    // }
    // else if (stockCategory != "Finished goods") {
    //     displayM = false;
    // } else
    //     displayM = true;

    return (

        <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white '>
            <Header category="Form" title="Update Stock" />
            <div className=" flex items-center justify-center">

                <form onSubmit={async (e) => {
                    e.preventDefault();

                   
                    var total = quantity * unitPrice;
                    { totalValue = total }

                    const newStockUtil = {
                        stockCode,
                        date,
                        type,
                        supplier,
                        unitPrice,
                        quantity,
                        totalValue
                    }

                    await axios.put("http://localhost:8070/stockUtilisation/update/" + id, newStockUtil)
                        .then((res) => {
                            alert("Data updated successfully");
                            console.log(newStockUtil);
                            //navigate to the stock view page
                            navigate('/StockUtilisation');
                        })
                        .catch((err) => {
                            console.log(err);
                            alert("ERROR: Could not update stock");
                            navigate('/StockUtilUpdate');
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
                        <label htmlFor="date" className="form-label">Date: </label>
                        <input type="text"  value={formDate} className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="date" readOnly />

                    </div>

                    <div className="mb-3">
                        <label htmlFor="type" className="form-label">Type: </label>
                        <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" value={type} id="type" readOnly />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">Quantity: </label>
                        <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="quantity" value={quantity} min="0"
                            required title="If there is no stock please enter 0" onChange={(e) => {
                                setQuantity(e.target.value);
                            }} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="unitPrice" className="form-label">Unit price: </label>
                        <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="unitPrice" value={unitPrice}
                            onChange={(e) => {
                                setUnitPrice(e.target.value);
                            }} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="supplier" className="form-label">Supplier: </label>
                        <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white
                         dark:text-black"  id="supplier" value={supplier}
                            readOnly />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="totalValue" className="form-label">Total Value: </label>
                        <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white
                         dark:text-black" value={quantity * unitPrice} id="totalValue" readOnly />
                    </div>

                    <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Submit</button>
                </form>
            </div>
        </div>

    )
}

export default StockUtilUpdate