import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';

function SalesCreateForm() {
const navigate = useNavigate();    //useNavigate hook to redirect to another page after form submission is successful 

  const [invoiceNo, setInvoice] =useState('');
  const [orderDate, setOrderDate] =useState('');
  const [customerID, setCustomerID] =useState('');
  const [itemName, setItemName] =useState('');
  const [quantity, setQuantity] =useState('');
  const [totalAmount, setTotalAmount] =useState('');
  const [status, setStatus] =useState('');

  var currentDate = new Date().toISOString().split('T')[0];

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
              <Header category="Form" title=" Create New Sale" />
              <div className=" flex items-center justify-center "> 
              <form onSubmit={async(e)=>{
                  e.preventDefault();
                  
                 
                  const newOrder = {
                    invoiceNo,     
                    orderDate,
                    customerID,
                    itemName,
                    quantity,
                    totalAmount,
                    status
                  }

                  await axios.post("http://localhost:8070/sales/create", newOrder)
                  .then((res)=>{
                      alert("Invoice saved successfully");
                         //navigate to the sales view page
                  navigate('/SalesViewAll');
                  })
                  .catch((err)=>{
                      console.log(err);
                      alert("Error Occured!")
                  }) 
                }}>

                <div className="mb-3">
                  <label for="invoiceNo" className="form-label">Invoice No</label>
                  <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="invoiceNo" maxLength={8} defaultValue='INV' required 
                  onChange={(e)=>{
                    setInvoice(e.target.value);
                  }}/>
                </div>

                <div className="mb-3">
                  <label for="orderDate" className="form-label">Invoice Date</label>
                  <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="orderDate" max={currentDate} required
                  onChange={(e) =>{
                    setOrderDate(e.target.value);
                  }}/>
                </div>

                <div className="mb-3">
                  <label for="customerID" className="form-label">Customer ID</label>
                  <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="customerID" placeholder = "Customer ID" required maxLength={5}
                  onChange={(e)=>{
                    setCustomerID(e.target.value);
                  }}/>
                </div>

                <div className="mb-3">
                  <label for="itemName" className="form-label">Item Name</label>
                  <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="itemName" placeholder="Enter Item Name" required 
                  onChange={(e)=>{
                    setItemName(e.target.value);
                  }}/>
                </div>

                <div className="mb-3">
                  <label for="quantity" className="form-label">Quantity</label>
                  <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="quantity" placeholder="Enter Item Quantity" required 
                  onChange={(e)=>{
                    setQuantity(e.target.value);
                  }}/>
                </div>

                <div className="mb-3">
                  <label for="totalAmount" className="form-label">Total Amount</label>
                  <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="totalAmount" placeholder="Enter Total Amount"  required 
                  onChange={(e) =>{
                    setTotalAmount(e.target.value);
                  }}/>
                </div>


                <div className="mb-3">
                  <label for="status" className="form-label">Order Status</label>
                  <select class="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="status"   
                   onChange={(e) =>{
                    setStatus(e.target.value);
                  }}
                  >
                    <option selected>Select Status</option>
                    <option value='Pending'>Pending</option>
                    </select>
                </div>

                <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Save Invoice</button>
              </form>
              </div>
              
    </div>

  );
}
  export default SalesCreateForm;