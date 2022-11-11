import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings, Header } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useStateContext } from '../../contexts/ContextProvider';
import Swal from "sweetalert2";

function CustomerUpdate() {

    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();
    
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
        const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
            setCurrentColor(currentThemeColor);
            setCurrentMode(currentThemeMode);
    }
    }, [id])


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
                                Swal.fire({  
                                    icon: 'success',
                                    title: 'Data Successfully Updated',
                                    color: '#f8f9fa',
                                    background: '#6c757d',
                                    showConfirmButton: false,
                                    timer: 2000
                                  })
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
                            
                        </div>
                        <Footer />
                    </div>  
                </div>
            </div>
        </div>
    </div>
  );
};

export default CustomerUpdate;