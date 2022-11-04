import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';

function CustomerUpdate() {
    //useNavigate is a hook that is used to navigate to another page
    const navigate = useNavigate();

    const [customerID, setCustomerID] =useState('');
    const [customerName, setCustomerName] =useState('');
    const [customerContactNo, setCustomerContactNo] =useState('');
    const [customerAddress, setCustomerAddress] =useState('');

    const {id} = useParams(); //get the id from the url

    const getCustomer = () => {
        axios.get(`http://localhost:8070/customer/view/${id}`)
        .then((res) => {
            setCustomerID(res.data.customerID)
            setCustomerName(res.data.customerName);
            setCustomerContactNo(res.data.customerContactNo);
            setCustomerAddress(res.data.customerAddress);
            })
            .catch((err) => {
                alert(err.message);
            })
        }

    useEffect(() => {
        getCustomer();
    }, [id])


  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white '>
        <Header category="Form" title="Update Customer Details" />
                <div className=" flex items-center justify-center">

                    <form className="" onSubmit={async(e)=>{
                        e.preventDefault();
                        
                        
                        const newCustomer = {
                            customerID,
                            customerName, 
                            customerContactNo,
                            customerAddress
                        }

                        await axios.put(`http://localhost:8070/customer/update/` + id, newCustomer)
                            .then((res)=>{
                                alert("Customer Details Updated!");
                            navigate('/CustomerViewAll');
                            })
                            .catch((err)=>{
                                console.log(err);
                                alert("Error Occured!");
                            })
                            
                    }}>

                        <div className="mb-3">
                            <label htmlFor="customerID" className="form-label">Customer ID</label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="customerID" placeholder={customerID} disabled
                                onChange={(e)=>{
                                    setCustomerID(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="customerName" className="form-label">Customer Name</label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="customerName" value={customerName}  
                                onChange={(e) =>{
                                    setCustomerName(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="customerContactNo" className="form-label">Contact Number</label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="customerContactNo" value={customerContactNo} pattern="[0-9]{10}"
                                onChange={(e) =>{
                                    setCustomerContactNo(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="customerAddress" className="text-md">Address</label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="customerAddress" value={customerAddress}  
                                onChange={(e)=>{
                                    setCustomerAddress(e.target.value);
                                }}/>
                        </div>

                    <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Update Customer</button>
                    </form>
                </div>
    </div>
  )
}

export default CustomerUpdate;