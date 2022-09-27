import React from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'



function StockView() {
    const [stock, setStock] = useState([]); //stock is the state variable and setStock is the function to update the state variable

    const getStock = async () => {  //getStock is the function to get the data from the backend
        axios.get("http://localhost:8070/stock")
            .then((res) => {
                setStock(res.data); //setStock is used to update the state variable
                console.log(res.data);
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    const deleteStock = async (id) => {
        await axios.delete('http://localhost:8070/stock/delete/' + id)
            .then(() => {
                alert("Data deleted successfully");
                getStock();
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    useEffect(() => { //useEffect is used to call the function getStock
        getStock();
    }, [])

    return (
        <div className='container' style={{ marginTop: "6%" }}>
            <Link to={'/generatePDF'}>
                <button type="button" class="btn btn-secondary" style={{ marginLeft: "89%" }}>Generate PDF</button>
            </Link>
            <h1>Stocks Details</h1>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">Code</th>
                        <th scope="col">Name </th>
                        <th scope="col">Category</th>
                        <th scope="col">Last stock updated on </th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Reorder level</th>
                        <th scope="col">Unit price</th>
                        <th scope="col">Supplier</th>
                        <th scope="col">Total Value</th>
                        <th scope="col">Availability</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {stock.map((data) => {
                        const date = new Date(data.lastUpdated).toLocaleDateString();

                        return (
                            <tr>
                                <td>{data.stockCode}</td>
                                <td>{data.stockName}</td>
                                <td>{data.stockCategory}</td>
                                <td>{date}</td>
                                <td>{data.quantity}</td>
                                <td>{data.reorderLevel}</td>
                                <td>{data.unitPrice}</td>
                                <td>{data.supplier}</td>
                                <td>{data.totalValue}</td>
                                <td >{data.sufficientStock}</td>
                                <td>
                                    <Link to={'/stock/updateStock/' + data._id}>
                                        <button type="button" className="btn btn-primary">Edit</button>
                                    </Link>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-danger"
                                        onClick={() => deleteStock(data._id)
                                        }>Delete</button>

                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <br />
            <br />
        </div>
    )
}

export default StockView;