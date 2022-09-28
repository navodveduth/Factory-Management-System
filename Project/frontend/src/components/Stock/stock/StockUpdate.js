import { useNavigate, useParams, Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from "axios"
import "../../styles/Stock/StockForms.css";

function StockUpdate() {

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
    const navigate = useNavigate();

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


    return (
        <>
            <div className="updatestock"></div>
            <div id="stockform">
                <h1>Stock Update Form</h1>
                <form onSubmit={async (e) => {
                    e.preventDefault();

                    var checkStock = reorderLevel - quantity;
                    if (checkStock > 0) {
                        { sufficientStock = "Need " + checkStock.toString() }
                    } else {
                        { sufficientStock = "Available" }
                    }

                    var total = quantity * unitPrice;
                    {totalValue = total}

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
                            navigate('/stock');
                        })
                        .catch((err) => {
                            console.log(err);
                            alert("ERROR: Could not update stock");
                            navigate('stock/updateStock');
                        })

                }}>
                    <div className="mb-3">
                        <label className="form-label">Stock Code: </label>
                        <input type="text" className="form-control" value={stockCode} id="stockCode" readOnly />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Name: </label>
                        <input type="text" className="form-control" value={stockName} id="stockName" readOnly />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Category: </label>
                        <input type="text" className="form-control" value={stockCategory} id="category" readOnly />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Date: </label>
                        <input type="date" value={lastUpdated} className="form-control" id="date"  required onChange={(e) => {
                                setLastUpdated(e.target.value);
                            }} />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Quantity: </label>
                        <input type="number" className="form-control" id="quantity" value={quantity} min="1"
                            onChange={(e) => {
                                setQuantity(e.target.value);
                            }} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Reorder Level: </label>
                        <input type="number" className="form-control" id="reorder" value={reorderLevel} min="0"
                            onChange={(e) => {
                                setReorderLevel(e.target.value);
                            }} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Unit price: </label>
                        <input type="number" className="form-control" id="unitPrice" value={unitPrice}
                            onChange={(e) => {
                                setUnitPrice(e.target.value);
                            }} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Supplier: </label>
                        <input type="text" className="form-control" id="supplier" value={supplier}
                            readOnly />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Total Value: </label>
                        <input type="number" className="form-control" id="totalCost" value={quantity * unitPrice} readOnly />
                    </div>

                    <button type="submit" className="btn btn-light" style={{ backgroundColor: '#FF5A5F', marginLeft: "2%" }}>Submit</button>
                </form>
            </div>
        </>
    )
}

export default StockUpdate;