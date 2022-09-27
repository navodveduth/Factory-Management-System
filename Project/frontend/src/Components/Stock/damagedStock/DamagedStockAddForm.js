import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
// import "../../styles/Shafa/StockForms.css";

function DamagedStockAddForm() {
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

    return (
        <>
            <div className='addDamagedstock'></div>
            <div id="stockform">
                <h1>Damaged Stock Form</h1>
                <form onSubmit={async (e) => {
                    e.preventDefault();

                    totalValue = quantity * value;

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
                    await axios.post("http://localhost:8070/damagedStock/create", newDamagedStock).then((res) => {
                        alert("Data saved successfully");
                        navigate('/damagedStock');

                    }).catch((err) => {
                        console.log(err);
                        alert("ERROR: Could not add stock");
                        navigate('/damagedStock/addDamagedStock');
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
                                setDamagedStockName(e.target.value);
                            }} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Category: </label>
                        < select class="form-select" id="category" onChange={(e) => {
                            setDamagedStockCategory(e.target.value);
                        }}>
                            <option selected  >Select option...</option>
                            <option value="Raw materials">Raw materials</option>
                            <option value="Work in progress">Work in progress</option>
                            <option value="Finished goods">Finished goods</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Quantity: </label>
                        <input type="number" className="form-control" id="quantity" min="1"
                            required onChange={(e) => {
                                setQuantity(e.target.value);
                            }} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Date: </label>
                        <input type="date" className="form-control" id="date" 
                            required onChange={(e) => {
                                setUpdatedDate(e.target.value);
                            }} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Value: </label>
                        <input type="number" className="form-control" id="value" placeholder="Enter value..."
                            required onChange={(e) => {
                                setValue(e.target.value);
                            }} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Total Value: </label>
                        <input type="number" className="form-control" id="totalCost" value={quantity * value} readOnly
                            />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Usability: </label>
                        < select class="form-select" id="usability" onChange={(e) => {
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

export default DamagedStockAddForm;