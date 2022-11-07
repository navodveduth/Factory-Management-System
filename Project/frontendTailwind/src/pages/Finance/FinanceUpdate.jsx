import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useStateContext } from '../../contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';
import { Header,  Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

function TransactionUpdate() {
    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

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
        const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
            setCurrentColor(currentThemeColor);
            setCurrentMode(currentThemeMode);
    }
    }, [])


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
                            {/* YOUR COMPONENT IMPLEMENTATION GOES HERE */}
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
                                                id="trnNumber" defaultValue={trnID} placeholder="Enter Transaction ID"
                                                pattern="[A-Z]{1}[0-9]{3}" title="The Transaction ID must start with one uppercase character, followed by 3 Numeric digits"  
                                                required 
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
                                                id="trnAmount" defaultValue={trnAmount} placeholder="Enter Amount" min="1" title="Please enter a valid amount"
                                                required 
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
                            {/* PART AFTER THE RETURN STATEMENT */}
                            
                        </div>
                        <Footer />
                    </div>  
                </div>
            </div>
        </div>
    </div>
  )
}

export default TransactionUpdate;