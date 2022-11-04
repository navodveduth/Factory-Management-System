import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';

function NewCustomerForm() {
const navigate = useNavigate();    //useNavigate hook to redirect to another page after form submission is successful 

  const [customerName, setCustomerName] =useState('');
  const [customerContactNo, setCustomerContactNo] =useState('');
  const [customerAddress, setCustomerAddress] =useState('');
  const [customerID, setCustomerID] =useState('');


  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
              <Header category="Form" title="Add New Customer" />
              <div className=" flex items-center justify-center "> 
              <form onSubmit={async(e)=>{
                  e.preventDefault();
                  
                 
                  const newCustomer = {
                    customerID,
                    customerName,     
                    customerAddress,
                    customerContactNo
                  }

                  await axios.post("http://localhost:8070/customer/create", newCustomer)
                  .then((res)=>{
                      alert("Customer Registered successfully");
                         //navigate to the sales view page
                  navigate('/CustomerViewAll');
                  })
                  .catch((err)=>{
                      console.log(err);
                      alert("Error Occured!")
                  }) 
                }}>


                <div className="mb-3">
                  <label for="customerID" className="form-label">Customer ID</label>
                  <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="customerID" placeholder="Customer's ID" required 
                  onChange={(e)=>{
                    setCustomerID(e.target.value);
                  }}/>
                </div>

                <div className="mb-3">
                  <label for="customerName" className="form-label">Customer Name</label>
                  <input type="text" placeholder="Enter Name" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="customerName" required 
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
                  <label for="customerAddress" className="form-label">Customer Address</label>
                  <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="customerAddress" required
                  onChange={(e) =>{
                    setCustomerAddress(e.target.value);
                  }}/>
                </div>

                <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Add Customer</button>
              </form>
              </div>
              
    </div>

  );
}
  export default NewCustomerForm;