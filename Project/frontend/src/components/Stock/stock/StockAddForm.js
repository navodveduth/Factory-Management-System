import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "../../styles/Stock/StockForms.css";

function StockAddForm() {
    //useNavigate is a hook that is used to navigate to another page
    const navigate = useNavigate();

    const [stockCode, setStockCode] = useState('');
    const [stockName, setStockName] = useState('');
    const [stockCategory, setStockCategory] = useState('');
    const [lastUpdated, setLastUpdated] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [supplier, setSupplier] = useState('');
    var [totalValue, setTotalValue] = useState('');

    
    return (
        <>
            <div className='addstock'></div>
            <div id="stockform" >
                <h1>Add Stock Form</h1>
                <form onSubmit={async (e) => {
                    e.preventDefault();

                    totalValue = quantity * unitPrice;

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
                        navigate('/stock');

                    }).catch((err) => {
                        console.log(err);
                        alert("ERROR: Could not add stock");
                        navigate('/stock/addStock');
                    })
                }}>
                    <div className="mb-3">
                        <label className="form-label">Stock Code: </label>
                        <input type="text" className="form-control" id="code" placeholder="Enter stock code..." pattern="[A-Z][0-9]{3,7}"
                            required onChange={(e) => {
                                setStockCode(e.target.value);
                            }} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Stock Name: </label>
                        <input type="text" className="form-control" id="name" placeholder="Enter stock name..."
                            required onChange={(e) => {
                                setStockName(e.target.value);
                            }} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Category: </label>
                        < select class="form-select" id="category" onChange={(e) => {
                            setStockCategory(e.target.value);
                        }}>
                            <option selected  >Select option...</option>
                            <option value="Raw materials">Raw materials</option>
                            <option value="Work in progress">Work in progress</option>
                            <option value="Finished goods">Finished goods</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Date: </label>
                        <input type="date" className="form-control" id="date"
                            required onChange={(e) => {
                                setLastUpdated(e.target.value);
                            }} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Quantity: </label>
                        <input type="number" className="form-control" id="quantity" placeholder="Enter quantity..." min="1"
                            required onChange={(e) => {
                                setQuantity(e.target.value);
                            }} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Unit price: </label>
                        <input type="number" className="form-control" id="unitPrice" placeholder='Enter price per unit...'
                            min="0" onChange={(e) => {
                                setUnitPrice(e.target.value);
                            }} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Materials provided by: </label>
                        <input type="text" className="form-control" id="supplier" placeholder="Enter supplier name..."
                            required onChange={(e) => {
                                setSupplier(e.target.value);
                            }} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Total Value: </label>
                        <input type="number" className="form-control" id="totalCost" value={quantity * unitPrice} readOnly />
                    </div>

                    <Link to={'/stock'}>
                        <button type="button" class="btn btn-primary">No</button>
                    </Link>

                    <button type="submit" className="btn btn-light" style={{ backgroundColor: '#FF5A5F', marginLeft: "2%" }}>Submit</button>
                </form>
            </div>
        </>
    )
}

export default StockAddForm;