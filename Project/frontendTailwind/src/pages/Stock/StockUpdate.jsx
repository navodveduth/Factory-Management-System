import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';

function StockUpdate() {
    //useNavigate is a hook that is used to navigate to another page
    const navigate = useNavigate()

    const [stockCode, setStockCode] = useState('');
    const [stockName, setStockName] = useState('');
    const [stockCategory, setStockCategory] = useState('');
    const [lastUpdated, setLastUpdated] = useState('');
    const [quantity, setQuantity] = useState('');
    const [reorderLevel, setReorderLevel] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [supplier, setSupplier] = useState('');
    var [totalValue, setTotalValue] = useState('');
    var [sufficientStock, setSufficientStock] = useState('');

    const { id } = useParams();

    const getStock = () => {
        axios.get("http://localhost:8070/stock/" + id).then((res) => {
            setStockCode(res.data.stockCode);
            setStockName(res.data.stockName);
            setStockCategory(res.data.stockCategory);
            setLastUpdated(res.data.lastUpdated);
            setQuantity(res.data.quantity);
            setReorderLevel(res.data.reorderLevel);
            setUnitPrice(res.data.unitPrice);
            setSupplier(res.data.supplier);
        }).catch((err) => {
            alert(err);
        })
    }

    useEffect(() => { getStock() }, []);
 
    var date = new Date().toISOString().split('T')[0];

    return (

        <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white '>
            <Header category="Form" title="Update Stock" />
            <div className=" flex items-center justify-center">

                <form onSubmit={async (e) => {
                    e.preventDefault();

                    var checkStock = reorderLevel - quantity;
                    if (checkStock > 0) {
                        { sufficientStock = "Need " + checkStock.toString() }
                    } else {
                        { sufficientStock = "Available" }
                    }

                    var total = quantity * unitPrice;
                    { totalValue = total }

                    const newStock = {
                        stockCode,
                        stockName,
                        stockCategory,
                        lastUpdated,
                        quantity,
                        reorderLevel,
                        unitPrice,
                        supplier,
                        totalValue,
                        sufficientStock
                    }

                    await axios.put("http://localhost:8070/stock/update/" + id, newStock)
                        .then((res) => {
                            alert("Data updated successfully");
                            console.log(newStock);
                            //navigate to the stock view page
                            navigate('/StockView');
                        })
                        .catch((err) => {
                            console.log(err);
                            alert("ERROR: Could not update stock");
                            navigate('/StockUpdate');
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
                        <input type="date" min="2010-01-01" max={date} value={lastUpdated} className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="date" required onChange={(e) => {
                            setLastUpdated(e.target.value);
                        }} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">Quantity: </label>
                        <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="quantity" value={quantity} min="0"
                            required title="If there is no stock please input 0" onChange={(e) => {
                                setQuantity(e.target.value);
                            }} />
                    </div>

                    {/* <div className="mb-3">
                        <label htmlFor="reorderLevel" className="form-label">Reorder Level: </label>
                        <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="reorder" value={reorderLevel} min="0"
                            onChange={(e) => {
                                setReorderLevel(e.target.value);
                            }} />
                    </div> */}

                    <div className="mb-3">
                        <label htmlFor="unitPrice" className="form-label">Unit price: </label>
                        <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="unitPrice" value={unitPrice}
                            required min="0" title="If the unit price is not avilable please enter 0" step="0.01" onChange={(e) => {
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
                        <input type="number" min="0" step="0.01" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white
                         dark:text-black" value={quantity * unitPrice} id="totalValue" readOnly />
                    </div>

                    <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Submit</button>
                </form>
            </div>
        </div>

    )
}

export default StockUpdate