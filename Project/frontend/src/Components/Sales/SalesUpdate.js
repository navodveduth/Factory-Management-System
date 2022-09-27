import React from "react"
import {useParams, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function SalesUpdate() {
    const navigate = useNavigate();

    const [invoiceNo, setInvoice] =useState('');
    const [orderDate, setOrderDate] =useState('');
    const [customerName, setCustomerName] =useState('');
    const [customerContactNo, setCustomerContactNo] =useState('');
    const [materialsSupplied, setMaterialsSupplied] =useState('');
    const [totalAmount, setTotalAmount] =useState('');
    const [status, setStatus] =useState('');

    const {id} = useParams();    //get the id from the url

    useEffect(() => { 
      axios.get(`http://localhost:8070/sales/${id}`)
      .then(res => {
        setInvoice(res.data.invoiceNo);
        setOrderDate(res.data.orderDate);
        setCustomerName(res.data.customerName);
        setCustomerContactNo(res.data.customerContactNo);
        setMaterialsSupplied(res.data.materialsSupplied);
        setTotalAmount(res.data.totalAmount);
        setStatus(res.data.status);
      })
      .catch(err => {
        alert(err.message);
      });
    }, [id]);
      

    // const getSale = () => { 
    //   axios.get(`http://localhost:8070/sales/${id}`)
    //   .then(res => {
    //     setInvoice(res.data.invoice);
    //     setOrderDate(res.data.orderDate);
    //     setDescription(res.data.description);
    //     setTotalAmount(res.data.totalAmount);
    //     setCustomerName(res.data.customerName);
    //     setCustomerContactNo(res.data.customerContactNo);
    //     setMaterialsSupplied(res.data.materialsSupplied);
    //     setTotalAmount(res.data.totalAmount);
    //     setStatus(res.data.status);
    //   })
    //   .catch(err => {
    //     alert(err.message);
    //   })
    // }

    // useEffect(() => {       // this will run when the page is loaded
    //   getSale(); }, [])
   
  return (
    <div className='SalesFormContainer'>
              <h1>Sales Update Form</h1>
              <form onSubmit = {async(e) => {
                  e.preventDefault();
                  
                  const newOrder = {
                    invoiceNo,
                    orderDate,
                    customerName, customerContactNo, materialsSupplied, totalAmount, status
                    
                  };

                  await axios.put(`http://localhost:8070/sales/update/` + id, newOrder)
                      .then((res)=>{
                          alert("Order Details Updated!");
                          //navigate to the sales view page
                      navigate('/sales');
                      })
                      .catch((err)=>{
                          console.log(err);
                          alert("Error occured");
                      });
                      
              }}>

              <div className="mb-3">
                <label className="form-label">Invoice</label>
                <input type="text" className="form-control" value={invoiceNo} id="invoice" disabled
                onChange={(e)=>{
                    setInvoice(e.target.value);
                }}/>

              </div>
              <div className="mb-3">
                <label className="form-label">Date of Order</label>
                <input type="date" className="form-control" value={orderDate} id="orderDate"
                onChange={(e)=>{
                    setOrderDate(e.target.value);
              }}/>
              </div>

              <div className="mb-3">
                <label className="form-label">Customer Name</label>
                <input type="text" className="form-control" value={customerName} 
                onChange={(e)=>{
                    setCustomerName(e.target.value);
              }}/>
              </div>

              <div className="mb-3">
                <label className="form-label">Contact Number</label>
                <input type="text" className="form-control"  value={customerContactNo}  pattern="[0-9]{10}"
                onChange={(e)=>{
                    setCustomerContactNo(e.target.value);
              }}/>
              </div>

              <div className="mb-3">
                <label className="form-label">Supplied Materials</label>
                <select
                    id='materials'
                    name='materials'
                    className='form-control'                  
                    onChange={(e) => {
                      setMaterialsSupplied(e.target.value);
                    }}
                  >
                    <option value=''>Select...</option>
                    <option value='With Materials'>With Materials</option>
                    <option value='Without Materials'>Without Materials</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Total Amount of Order</label>
                <input type="text" className="form-control"  value={totalAmount} 
                onChange={(e)=>{
                    setTotalAmount(e.target.value);
              }}/>
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                    id='status'
                    name='status'
                    className='form-control'                    
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                  >
                    <option value=''>Select...</option>
                    <option value='Placed'>Placed</option>
                    <option value='Pending'>Pending</option>
                    <option value='Finished'>Finished</option>
                </select>
                
              </div>
              
              <button type="submit" className="btn btn-light" style={{backgroundColor:'#FF5A5F'}}>Update</button>
            </form>
          </div>
  )    
}

export default SalesUpdate;