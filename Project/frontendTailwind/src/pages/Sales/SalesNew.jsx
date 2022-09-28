import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';

function SalesCreateForm() {
const navigate = useNavigate();    //useNavigate hook to redirect to another page after form submission is successful 

  const [invoiceNo, setInvoice] =useState('');
  const [orderDate, setOrderDate] =useState('');
  const [customerName, setCustomerName] =useState('');
  const [customerContactNo, setCustomerContactNo] =useState('');
  const [materialsSupplied, setMaterialsSupplied] =useState('');
  const [totalAmount, setTotalAmount] =useState('');
  const [status, setStatus] =useState('');

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
              <Header category="Form" title=" Create New Sale" />
              <div className=" flex items-center justify-center "> 
              <form onSubmit={async(e)=>{
                  e.preventDefault();
                  
                 
                  const newOrder = {
                    invoiceNo,     
                    orderDate,
                    customerName,
                    customerContactNo,
                    materialsSupplied,
                    totalAmount,
                    status
                  }

                  await axios.post("http://localhost:8070/sales/create", newOrder)
                  .then((res)=>{
                      alert("Order saved successfully");
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
                  <label for="orderDate" className="form-label">Order Date</label>
                  <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="orderDate" required
                  onChange={(e) =>{
                    setOrderDate(e.target.value);
                  }}/>
                </div>

                <div className="mb-3">
                  <label for="customerName" className="form-label">Customer Name </label>
                  <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="customerName" placeholder="Customer's Name" required 
                  onChange={(e)=>{
                    setCustomerName(e.target.value);
                  }}/>
                </div>

                
                <div className="mb-3">
                  <label for="customerContactNo" className="form-label">Contact Number</label>
                  <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="customerContactNo" placeholder="Enter Customer's Contact Number" pattern="[0-9]{10}" required
                  onChange={(e) =>{
                    setCustomerContactNo(e.target.value);
                  }}/>
                </div>


                <div className="mb-3">
                  <label for="materialsSupplied" className="form-label">Materials</label>
                  <select class="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="materialsSupplied" aria-label="Default select example" required
                   onChange={(e) =>{
                    setMaterialsSupplied(e.target.value);
                  }}>
                      <option selected>Select..</option>
                      <option value="With Materials">With Materials</option>
                      <option value="Without Materials">Without Materials</option>
                  </select>
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
                  id="status" aria-label="Default select example" required
                   onChange={(e) =>{
                    setStatus(e.target.value);
                  }}>
                      <option selected>Select Order Status</option>
                      <option value="Placed">Placed</option>
                     {/* <option value='Pending'>Pending</option>
                    <option value='Finished'>Finished</option> */}
                  </select>
                </div>

                <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Save Order</button>
              </form>
              </div>
              
    </div>

  );
}
  export default SalesCreateForm;