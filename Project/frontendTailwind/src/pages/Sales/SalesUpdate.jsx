import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';

function SalesUpdate() {
    //useNavigate is a hook that is used to navigate to another page
    const navigate = useNavigate();

    const [invoiceNo, setInvoice] =useState('');
    const [orderDate, setOrderDate] =useState('');
    const [customerName, setCustomerName] =useState('');
    const [customerContactNo, setCustomerContactNo] =useState('');
    const [materialsSupplied, setMaterialsSupplied] =useState('');
    const [totalAmount, setTotalAmount] =useState('');
    const [status, setStatus] =useState('');

    const {id} = useParams(); //get the id from the url

    const getSale = () => {
        axios.get(`http://localhost:8070/sales/${id}`)
        .then((res) => {
            const ordDate = new Date(res.data.orderDate).toISOString().split('T')[0];

            setInvoice(res.data.invoiceNo);
            setOrderDate(res.data.ordDate);
            setCustomerName(res.data.customerName);
            setCustomerContactNo(res.data.customerContactNo);
            setMaterialsSupplied(res.data.materialsSupplied);
            setTotalAmount(res.data.totalAmount);
            setStatus(res.data.status);
            })
            .catch((err) => {
                alert(err.message);
            })
        }

    useEffect(() => {
        getSale();
    }, [id])


  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white '>
        <Header category="Form" title="Update Order" />
                <div className=" flex items-center justify-center">

                    <form className="" onSubmit={async(e)=>{
                        e.preventDefault();
                        
                        
                        const newOrder = {
                            invoiceNo, orderDate,
                            customerName, customerContactNo, 
                            materialsSupplied, totalAmount, status
                            
                        }

                        await axios.put(`http://localhost:8070/sales/update/` + id, newOrder)
                            .then((res)=>{
                                alert("Order Details Updated!");
                            navigate('/SalesViewAll');
                            })
                            .catch((err)=>{
                                console.log(err);
                                alert("Error Occured!");
                            })
                            
                    }}>

                        <div className="mb-3">
                            <label htmlFor="invoiceNo" className="text-md">Invoice Number</label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="invoiceNo" value={invoiceNo} required disabled
                                onChange={(e)=>{
                                    setInvoice(e.target.value);
                                }}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="orderDate" className="form-label">Date of Order</label>
                            <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="orderDate" value={orderDate}  
                                onChange={(e)=>{
                                    setOrderDate(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="customerName" className="form-label">Customer Name</label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="customerName" value={customerName} required 
                                onChange={(e) =>{
                                    setCustomerName(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="customerContactNo" className="form-label">Contact Number</label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="customerContactNo" value={customerContactNo} required pattern="[0-9]{10}"
                                onChange={(e) =>{
                                    setCustomerContactNo(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="materialsSupplied" className="form-label">Materials</label>
                            <select className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="materialsSupplied" value={materialsSupplied} aria-label="Default select example" required
                                onChange={(e) =>{
                                    setMaterialsSupplied(e.target.value);
                                }}>
                                    <option value=''>Select...</option>
                                    <option value='With Materials'>With Materials</option>
                                    <option value='Without Materials'>Without Materials</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="totalAmount" className="form-label">Total Amount of Order</label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="totalAmount" value={totalAmount} required 
                                onChange={(e) =>{
                                    setTotalAmount(e.target.value);
                                }}/>
                        </div>

                       

                        <div className="mb-3">
                            <label for="status" className="form-label">Order Status</label>
                            <select className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                            id="status" aria-label="Default select example" value={status} required
                            onChange={(e) =>{
                                setStatus(e.target.value);
                            }}>
                                <option value=''>Select...</option>
                                <option value='Placed'>Placed</option>
                                <option value='Pending'>Pending</option>
                                <option value='Finished'>Finished</option>
                            </select>
                        </div>

                    <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Update Order</button>
                    </form>
                </div>
    </div>
  )
}

export default SalesUpdate;