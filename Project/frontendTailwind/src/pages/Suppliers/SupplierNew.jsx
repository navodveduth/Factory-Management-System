import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';

function AddSupplierDetails() {
    const navigate = useNavigate(); //useNavigate hook to redirect to another page after form submission is successful 
    
    const [supplierId, setSupplierId] = useState('');
    const [companyname, setCompanyname] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [productDetails, setProductDetails] = useState('');
    const [leadTime, setLeadTime] = useState('');
    const [orderCapacity, setOrderCapacity] = useState('');
    
    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
                <Header category="Form" title=" Create New Supplier" />
                <div className=" flex items-center justify-center "> 
                <form onSubmit={async(e)=>{
                    e.preventDefault();
                    
                    const newSupplier = {
                        supplierId,
                        companyname,
                        contactPerson,
                        email,
                        phone,
                        address,
                        productDetails,
                        leadTime,
                        orderCapacity
                    }
    
                    await axios.post("http://localhost:8070/supplier/create", newSupplier)
                        .then((res)=>{
                            alert("Supplier details added successfully");
                            navigate("/SupplierViewAll");
                          })
                          .catch((err) => {
                            alert(err);
                          });
                        
                     
                }}>

    <div className="mb-3">         
                    <label for="supplierId" className="form-label">Supplier ID : </label>
                    <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                    id="supplierId" placeholder="Enter the supplier ID" required 
                    onChange={(e)=>{
                        setSupplierId(e.target.value);
                    }}/>
                </div>
    
    <div className="mb-3">
                  <label for="companyname" className="form-label">Company Name : </label>
                  <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="companyname" placeholder="Enter the company name" required 
                  onChange={(e)=>{
                    setCompanyname(e.target.value);
                  }}/>
                </div>

                <div className="mb-3">
                    <label for="contactPerson" className="form-label">Contact Person : </label>
                    <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                    id="contactPerson" placeholder="Enter the contact person" required
                    onChange={(e)=>{
                        setContactPerson(e.target.value);
                    }
                    }/>
                </div>

                <div className="mb-3">
                    <label for="email" className="form-label">Email : </label>
                    <input type="email" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                    id="email" placeholder="Enter the email" required
                    onChange={(e)=>{
                        setEmail(e.target.value);
                    }
                    }/>
                </div>

                <div className="mb-3">
                    <label for="phone" className="form-label">Phone : </label>
                    <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                    id="phone" placeholder="Enter the phone number" required
                    onChange={(e)=>{
                        setPhone(e.target.value);
                    }
                    }/>
                </div>

                <div className="mb-3">
                    <label for="address" className="form-label">Address : </label>
                    <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                    id="address" placeholder="Enter the address" required
                    onChange={(e)=>{
                        setAddress(e.target.value);
                    }
                    }/>
                </div>

                <div className="mb-3">
                    <label for="productDetails" className="form-label">Product Details : </label>
                    <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                    id="productDetails" placeholder="Enter the product details" required
                    onChange={(e)=>{
                        setProductDetails(e.target.value);
                    }
                    }/>
                </div>

                <div className="mb-3">
                    <label for="leadTime" className="form-label">Lead Time : </label>
                    <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                    id="leadTime" placeholder="Enter the lead time" required
                    onChange={(e)=>{
                        setLeadTime(e.target.value);
                    }
                    }/>
                </div>
                    
                <div className="mb-3">
                    <label for="orderCapacity" className="form-label">Order Capacity : </label>
                    <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                    id="orderCapacity" placeholder="Enter the order capacity" required
                    onChange={(e)=>{
                        setOrderCapacity(e.target.value);
                    }
                    }/>
                </div>

                
                    <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Submit</button>
                
                </form>
                </div>
            </div>
    );
}

export default AddSupplierDetails;

