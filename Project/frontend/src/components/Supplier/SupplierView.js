import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';

function SupplierView(){
    const[supplier, setSupplier] = useState([]);
    const getSupplier = async () => {
        axios.get("http://localhost:8070/supplier/")
        .then((res) => { 
            setSupplier(res.data); 
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    useEffect(() => { 
        getSupplier();
    }, [])

    const deleteSupplier = async (id) => {
        await axios.delete(`http://localhost:8070/supplier/delete/${id}`)
        .then((res) => {
            alert("Data deleted successfully");
            getSupplier();
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    return(
        <div>
            <h1>Supplier View</h1>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                    <th scope="col">Company Name</th>
                    <th scope="col">Contact Person</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Address</th>
                    <th scope="col">Product Details</th>
                    <th scope="col">Lead Time</th>
                    <th scope="col">Order Capacity</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    { supplier.map((data)=>{

                        return ( 
                            <tr>
                                <td>{ data.companyname}</td>
                                <td>{data.contactPerson}</td>
                                <td>{data.email}</td>
                                <td>{data.phone}</td>
                                <td>{data.address}</td>
                                <td>{data.productDetails}</td>
                                <td>{data.leadTime}</td>
                                <td>{data.orderCapacity}</td>
                                <td><Link to={'/supplier/supplierUpdate/'+ data._id}><button type="button" class="btn btn-primary">Edit</button></Link></td>
                                <td><button onClick={
                                    ()=>{
                                        deleteSupplier(data._id);
                                    }
                                } type="button" class="btn btn-danger">Remove</button></td>
                            </tr>
                        )
                    }

                    )}
                </tbody>
            </table>
        </div>
               

    )
}

export default SupplierView