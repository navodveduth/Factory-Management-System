import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';

function TransactionUpdate() {
    //useNavigate is a hook that is used to navigate to another page
    const navigate = useNavigate();

    const [trnID, setTransactionNumber] = useState('');
    const [trnDesc, setDescription] = useState('');
    const [trnAmount, setAmount] = useState('');
    const [trnType, setTransactionType] = useState('');
    const [trnRecordedDate, setTransactionDate] = useState('');

    const {id} = useParams(); //get the id from the url

    const getTransaction = () => {
        axios.get(`http://localhost:8070/finance/viewTransaction/${id}`)
        .then((res) => {
            const date = new Date(res.data.trnRecordedDate).toISOString().split('T')[0];
            setTransactionNumber(res.data.trnID);
            setDescription(res.data.trnDesc);
            setAmount(res.data.trnAmount);
            setTransactionType(res.data.trnType);
            setTransactionDate(date)
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    useEffect(() => {
        getTransaction();
    }, [])


  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white '>
        <Header category="Form" title="Update Cash Transaction Entry" />
                <div className=" flex items-center justify-center">

                    <form className="" onSubmit={async(e)=>{
                        e.preventDefault();
                        
                        
                        const newTransaction = {
                          trnID,
                          trnDesc,
                          trnAmount,
                          trnType,
                          trnRecordedDate,   
                        }

                        await axios.put("http://localhost:8070/finance/updateTransaction/"+ id, newTransaction)
                            .then((res)=>{
                                alert("Data updated successfully");
                            navigate('/FinanceViewAll');
                            })
                            .catch((err)=>{
                                console.log(err);
                                alert("Error 404");
                            })
                            
                    }}>

                        <div className="mb-3">
                            <label htmlFor="trnNumber" className="text-md">Transaction Number : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="trnNumber" defaultValue={trnID} placeholder="Enter Transaction ID" required 
                                onChange={(e)=>{
                                    setTransactionNumber(e.target.value);
                                }}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="trnDescription" className="form-label">Description : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="trnDescription" defaultValue={trnDesc} placeholder="Enter Transaction Description" required 
                                onChange={(e)=>{
                                    setDescription(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="trnAmount" className="form-label">Amount : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="trnAmount" defaultValue={trnAmount} placeholder="Enter Amount" required 
                                onChange={(e) =>{
                                    setAmount(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="trnType" className="form-label">Type of Transaction: </label>
                            <select className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="trnType" defaultValue={trnType} aria-label="Default select example" required
                                onChange={(e) =>{
                                  setTransactionType(e.target.value);
                                }}>
                                    <option value="Expenses">Expenses</option>
                                    <option value="Revenue">Revenue</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="trnDate" className="form-label">Transaction Date : </label>
                            <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="trnDate" defaultValue={trnRecordedDate} placeholder="Enter your birthday"required 
                                onChange={(e) =>{
                                    setTransactionDate(e.target.value);
                                }}/>
                        </div>


                    <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Submit</button>
                    </form>
                </div>
    </div>
  )
}

export default TransactionUpdate;