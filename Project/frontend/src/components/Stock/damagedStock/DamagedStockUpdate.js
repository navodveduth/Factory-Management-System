import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
// import "../../styles/Shafa/StockForms.css";

function DamagedStockUpdate() {

    //useNavigate is a hook that is used to navigate to another page
    const navigate = useNavigate();

    const [stockCode, setStockCode] = useState('');
    const [damagedStockName, setDamagedStockName] = useState('');
    const [damagedStockCategory, setDamagedStockCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [updatedDate, setUpdatedDate] = useState('');
    const [value, setValue] = useState('');
    var [totalValue, setTotalValue] = useState('');
    const [usability, setUsability] = useState('');

    const { id } = useParams(); //get the id from the url

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
        <>
            <div className='addDamagedstock'></div>
            <div id="stockform">
                <h1>Damaged Stock Update Form</h1>
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
                            navigate('/damagedStock');
                        })
                        .catch((err) => {
                            console.log(err);
                            alert("ERROR: Could not update stock");
                            navigate('/damagedStock/updateStock');
                        })

                }}>

                    <div className="mb-3">
                        <label className="form-label">Stock Code: </label>
                        <input type="text" className="form-control" value={stockCode} id="stockCode" readOnly />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Stock Name: </label>
                        <input type="text" className="form-control" value={damagedStockName} id="damagedStockName" readOnly />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Category: </label>
                        <input type="text" className="form-control" value={damagedStockCategory} id="category" readOnly />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Quantity: </label>
                        <input type="number" className="form-control" id="quantity" value={quantity} min="0"
                            onChange={(e) => {
                                setQuantity(e.target.value);
                            }} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Date: </label>
                        <input type="date" value={updatedDate} className="form-control" id="date" 
                            required onChange={(e) => {
                                setUpdatedDate(e.target.value);
                            }} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Value: </label>
                        <input type="number" className="form-control" id="value" value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                            }} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Total Value: </label>
                        <input type="number" className="form-control" id="totalCost" value={quantity * value} readOnly
                            onChange={(e) => {
                                setTotalValue(e.target.value);
                            }} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Usability: </label>
                        < select class="form-select" id="usability" value={usability} onChange={(e) => {
                            setUsability(e.target.value);
                        }}>
                            <option selected  >Select option...</option>
                            <option value="Usable">Usable</option>
                            <option value="Not usable">Not usable</option>
                        </select>
                    </div>

                    <Link to={'/damagedStock'}>
                        <button type="button" class="btn btn-primary">No</button>
                    </Link>
                    <button type="submit" className="btn btn-light" style={{ backgroundColor: '#FF5A5F', marginLeft: "2%" }}>Submit</button>
                </form>
            </div>
        </>
    )
}

export default DamagedStockUpdate;