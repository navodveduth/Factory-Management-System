import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header, Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';

import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';


function FinanceCreateForm() {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();
  const navigate = useNavigate(); //useNavigate hook to redirect to another page after form submission is successful 

  const [trnID, setTransactionNumber] = useState('');
  const [trnDesc, setDescription] = useState('');
  const [trnAmount, setAmount] = useState('');
  const [trnType, setTransactionType] = useState('');
  const [trnRecordedDate, setTransactionDate] = useState('');

  var date = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div>

      {/* DON'T CHANGE ANYTHING HERE */}

        <div className={currentMode === 'Dark' ? 'dark' : ''}>

            <div className="flex relative dark:bg-main-dark-bg">

                <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}> {/* THEME SETTINGS BUTTON */}
                    <TooltipComponent content="Settings" position="Top">
                    <button
                        type="button"
                        onClick={() => setThemeSettings(true)}
                        style={{ background: currentColor, borderRadius: '50%' }}
                        className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                    >
                        <FiSettings />
                    </button>
                    </TooltipComponent>
                </div>


                {activeMenu ? ( // SIDEBAR IMPLEMENTATION
                    <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                    <Sidebar />
                    </div>
                ) : (
                    <div className="w-0 dark:bg-secondary-dark-bg">
                    <Sidebar />
                    </div>
                )}

                <div
                    className={ // MAIN BACKGROUND IMPLEMENTATION
                    activeMenu
                        ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                        : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                    }
                >
                    
                    {/* NAVBAR IMPLEMENTATION */}
                    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                        <Navbar />
                    </div>

                    <div>
                        {themeSettings && <ThemeSettings />}
                        <div>
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
                                          alert("Conflicting Transaction ID! Please enter a unique Transaction ID");
                                      })
                                      
                                  
                              }}>

                                <div className="mb-3">
                                  <label for="transactionID" className="form-label">Transaction ID : </label>
                                  <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                  id="transactionID" placeholder="Enter the Transaction ID" pattern="[A-Z]{1}[0-9]{3}"
                                  title="The Transaction ID must start with one uppercase character, followed by 3 Numeric digits" required 
                                  onChange={(e)=>{
                                    setTransactionNumber(e.target.value);
                                  }}/>
                                </div>

                                <div className="mb-3">
                                  <label for="TransactionDescription" className="form-label">Description : </label>
                                  <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                  id="TransactionDescription" placeholder="Enter a Description for the Transaction" Zrequired 
                                  onChange={(e)=>{
                                    setDescription(e.target.value);
                                  }}/>
                                </div>

                                <div className="mb-3">
                                  <label for="trnAmount" className="form-label">Amount : </label>
                                  <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                  id="trnAmount" placeholder="Enter the Amount"  min="1" title="Please enter a valid amount" required 
                                  onChange={(e) =>{
                                    setAmount(e.target.value);
                                  }}/>
                                </div>

                                <div className="mb-3">
                                  <label for="trnType" className="form-label">Type : </label>
                                  <select class="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                  id="trnType" aria-label="Default select example" required = "required"
                                  onChange={(e) =>{
                                    setTransactionType(e.target.value);
                                  }}>
                                      <option value = "">Select Transaction Type</option>
                                      <option value="Expense">Expense</option>
                                      <option value="Revenue">Revenue</option>
                                  </select>
                                </div>

                                <div className="mb-3">
                                  <label for="trnDate" className="form-label">Date of Transaction : </label>
                                  <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                  id="trnDate" placeholder="Enter the Date of Transaction"  min="2010-01-01" max={date}
                                  required 
                                  onChange={(e) =>{
                                    setTransactionDate(e.target.value);
                                  }}/>
                                </div>

                                
                                
                                <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Submit Transaction</button>
                              </form>
                              </div>
                                      
                            </div>
                            {/* PART AFTER THE RETURN STATEMENT */}
                            
                        </div>
                        <Footer />
                    </div>  
                </div>
            </div>
        </div>
    </div>

  );
}
  export default FinanceCreateForm;