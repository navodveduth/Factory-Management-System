import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';

function FinanceCreateForm() {
  const navigate = useNavigate(); //useNavigate hook to redirect to another page after form submission is successful 

  const [trnID, setTransactionNumber] = useState('');
  const [trnDesc, setDescription] = useState('');
  const [trnAmount, setAmount] = useState('');
  const [trnType, setTransactionType] = useState('');
  const [trnRecordedDate, setTransactionDate] = useState('');

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
              <Header category="Form" title=" New Cash Transaction" />
              <div className=" flex items-center justify-center "> 
              <form onSubmit={async(e)=>{
                  e.preventDefault();
                  
                  const newTransaction = {
                    trnID,
                    trnDesc,
                    trnAmount,
                    trnType,
                    trnRecordedDate,
                  }

                  await axios.post("http://localhost:8070/finance/createTransaction", newTransaction)
                      .then((res)=>{
                          alert("Data saved successfully");
                             
                      navigate('/FinanceViewAll');
                      })
                      .catch((err)=>{
                          console.log(err);
                          alert("Error occured");
                      })
                      
                   
              }}>

                <div className="mb-3">
                  <label for="transactionID" className="form-label">Transaction ID : </label>
                  <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="transactionID" placeholder="Enter the Transaction ID" required 
                  onChange={(e)=>{
                    setTransactionNumber(e.target.value);
                  }}/>
                </div>

                <div className="mb-3">
                  <label for="TransactionDescription" className="form-label">Description : </label>
                  <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="TransactionDescription" placeholder="Enter a Description for the Transaction" required 
                  onChange={(e)=>{
                    setDescription(e.target.value);
                  }}/>
                </div>

                <div className="mb-3">
                  <label for="trnAmount" className="form-label">Amount : </label>
                  <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="trnAmount" placeholder="Enter the Amount" required 
                  onChange={(e) =>{
                    setAmount(e.target.value);
                  }}/>
                </div>

                <div className="mb-3">
                  <label for="trnType" className="form-label">Type : </label>
                  <select class="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="trnType" aria-label="Default select example" required
                   onChange={(e) =>{
                    setTransactionType(e.target.value);
                  }}>
                      <option selected>Select Transaction Type</option>
                      <option value="Expense">Expense</option>
                      <option value="Revenue">Revenue</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label for="trnDate" className="form-label">Date of Transaction : </label>
                  <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="trnDate" placeholder="Enter the Date of Transaction" required 
                  onChange={(e) =>{
                    setTransactionDate(e.target.value);
                  }}/>
                </div>

                
                
                <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Submit Transaction</button>
              </form>
              </div>
              
    </div>

  );
}
  export default FinanceCreateForm;