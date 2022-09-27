import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SalesView() {
    const [sales, setSale] = useState([]); ////sales is the state variable and setSales is the function to update the state variable
   
    const getSale = async () => {       //getSale is the function to get the data from the backend
            axios.get("http://localhost:8070/sales/")
            .then((res) => {
                    setSale(res.data);  //setSale is used to update the state variable
        })
        .catch((err) => {
                alert(err.message);
        })
    }

    useEffect(() => {       //useEffect is used to call the function getSale
        getSale();
    }, [])

    const deleteSale = async (id) => {
        await axios.delete(`http://localhost:8070/sales/delete/${id}`)
        .then((res) => {
            alert("Deleted Successfully");
            getSale();
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    return (
        <div className="SalesFormContainer">
            <h1>Sales View</h1>
            <table className=" table table-striped table-hover">
                <thead>
                    <tr>
                    <th scope="col">Invoice No.</th>
                    <th scope="col">Date of Order</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Contact No.</th>
                    <th scope="col">Total Amount</th>
                    <th scope="col">Status</th>
                    <th scope="col">Materials Supplied</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    { sales.map((data)=>{
                        
                        return ( 
                            <tr>
                                <td>{data.invoiceNo}</td>
                                <td>{data.orderDate}</td>
                                <td>{data.customerName}</td>
                                <td>{data.customerContactNo}</td>
                                <td>{data.totalAmount}</td>
                                <td>{data.status}</td>
                                <td>{data.materialsSupplied}</td>
                                <td><Link to={'/sales/salesUpdate/' + data._id}><button type="button" className="btn btn-primary">Edit</button></Link></td>
                                <td><Link to={'/sales/invoiceView/' + data._id}><button type="button" className="btn btn-primary">Invoice</button></Link></td>
                                <td><button onClick={
                                    ()=>{
                                        deleteSale(data._id);
                                    }
                                } type="button" className="btn btn-danger">Delete</button></td>
                            </tr>
                        )
                    })}
                    
                    
                </tbody>
            </table>
        </div>
      )
}

export default SalesView;




