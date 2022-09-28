import React from 'react'
import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function SupplierUpdate () {

    const navigate = useNavigate();

    const [companyname, setCompanyname] = useState("");
    const [contactPerson, setContactPerson] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [productDetails, setProductDetails] = useState("");
    const [leadTime, setLeadTime] = useState("");
    const [orderCapacity, setOrderCapacity] = useState("");   

    const {id} = useParams();

    const getSupplier = () => {

        axios.get(`http://localhost:8070/supplier/${id}`)
        .then((res) => {
            setCompanyname(res.data.companyname);
            setContactPerson(res.data.contactPerson);
            setEmail(res.data.email);
            setPhone(res.data.phone);
            setAddress(res.data.address);
            setProductDetails(res.data.productDetails);
            setLeadTime(res.data.leadTime);
            setOrderCapacity(res.data.orderCapacity);
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    useEffect(() => {

        getSupplier();

    }, [])

    return (
        <div>
            <h1>Update Supplier Details</h1>
            <form onSubmit={async (e) => {

                e.preventDefault();

                const updatedSupplier = {
                    companyname,
                    contactPerson,
                    email,
                    phone,
                    address,
                    productDetails,
                    leadTime,
                    orderCapacity,
                }

                await axios.put("http://localhost:8070/supplier/update/" + id, updatedSupplier)
                .then((res) => {
                    alert("Supplier details updated successfully");
                    navigate("/supplier");
                })
                .catch((err) => {
                    alert(err.message);
                })

            }}>

                <div className="mb-3">
                <label className="form-label">Company Name</label>
                <input type="text" className="form-control" value={companyname} id="companyname" aria-describedby="Enter Company Name" 
                onChange={(e)=>{
                    setCompanyname(e.target.value);
                }}/>

                </div>

                <div className="mb-3">
                <label className="form-label">Contact Person</label>
                <input type="text" className="form-control" value={contactPerson} id="contactPerson" aria-describedby="Enter Contact Person"
                onChange={(e)=>{
                    setContactPerson(e.target.value);
                }
                }/>
                </div>

                <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="text" className="form-control" value={email} id="email" aria-describedby="Enter Email"
                onChange={(e)=>{
                    setEmail(e.target.value);
                }
                }/>
                </div>

                <div className="mb-3">
                <label className="form-label">Phone</label>
                <input type="text" className="form-control" value={phone} id="phone" aria-describedby="Enter Phone"
                onChange={(e)=>{
                    setPhone(e.target.value);
                }
                }/>
                </div>

                <div className="mb-3">
                <label className="form-label">Address</label>
                <input type="text" className="form-control" value={address} id="address" aria-describedby="Enter Address"
                onChange={(e)=>{
                    setAddress(e.target.value);
                }
                }/>
                </div>

                <div className="mb-3">
                <label className="form-label">Product Details</label>
                <input type="text" className="form-control" value={productDetails} id="productDetails" aria-describedby="Enter Product Details"
                onChange={(e)=>{
                    setProductDetails(e.target.value);
                }
                }/>
                </div>

                <div className="mb-3">
                <label className="form-label">Lead Time</label>
                <input type="text" className="form-control" value={leadTime} id="leadTime" aria-describedby="Enter Lead Time"
                onChange={(e)=>{
                    setLeadTime(e.target.value);
                }
                }/>
                </div>

                <div className="mb-3">
                <label className="form-label">Order Capacity</label>
                <input type="text" className="form-control" value={orderCapacity} id="orderCapacity" aria-describedby="Enter Order Capacity"
                onChange={(e)=>{
                    setOrderCapacity(e.target.value);
                }
                }/>
                </div>

                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    ) 
}

export default SupplierUpdate

