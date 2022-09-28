import React from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'



function StockView() {
    const [stock, setStock] = useState([]); //stock is the state variable and setStock is the function to update the state variable
    const [searchTerm, setSearchTerm] = useState("");

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
            <div class="" style={{ width: "20%", marginRight: "85%", marginTop: "5%" }}>
                <input type="search" class="form-control rounded" placeholder="Type here ...." aria-label="Search" aria-describedby="search-addon" onChange={(e) => {
                    setSearchTerm(e.target.value);
                }} />
                {/* <button type="button" style={{marginLeft:"120%", marginTop:"-22%"}} class="btn btn-outline-secondary">search</button> */}
            </div>
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
                    {stock.filter((data) => {
                        if (searchTerm == "") {
                            return data;
                        } else if (data.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return data;
                        }
                    }).map((data, key) => {//map is used to iterate the array
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
                                    {/* {<button type="button" className="btn btn-danger"
                                        onClick={() => deleteStock(data._id)
                                        }>Delete</button>} */}

                                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        Delete
                                    </button>

                                    {/* {<!-- Modal -->} */}
                                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" style={{color: "#03C9D7"}} id="exampleModalLabel">Are you sure to delete?</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    You are about to delete a stock item. Once deleted it cannot be undone!
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                                                        onClick={
                                                            
                                                            () => deleteStock(data._id)
                                                           
                                                        }>Confirm</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

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