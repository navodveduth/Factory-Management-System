import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header, Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { FiSettings } from 'react-icons/fi';
import { useStateContext } from '../../contexts/ContextProvider';
import Swal from "sweetalert2";

function SalesCreateForm() {

  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

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

              <Header category="Form" title=" Create New Invoice" />

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
                      //alert("Invoice saved successfully");
                      Swal.fire({  
                        icon: 'success',
                        title: 'Invoice saved successfully',
                        color: '#f8f9fa',
                        background: '#6c757d',
                        showConfirmButton: false,
                        timer: 2000
                      })
                  navigate('/SalesViewAll');
                  })
                  .catch((err)=>{
                      console.log(err);
                      alert("Invoice Number Exists");
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
                  <select className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="itemName" placeholder="Enter Item Name" required = "required"
                  onChange={(e)=>{
                    setItemName(e.target.value);
                  }}>
                    <option value=''>Select Item</option>
                    <option value='Shirts'>Shirts</option>
                    <option value='T-Shirts'>T-Shirts</option>
                    <option value='Blouse'>Blouse</option>
                    <option value='Jeans'>Jeans</option>
                    <option value='Pants'>Pants</option>
                    <option value='Shorts'>Shorts</option>
                    <option value='Skirts'>Skirts</option>
                    <option value='Caps'>Caps</option>
                  </select>
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
                  id="totalAmount" placeholder='Enter Total Amount' required min = {0}
                  onChange={(e)=>{
                    setTotalAmount(e.target.value);
                  }}  
                  />
                </div>


                <div className="mb-3">
                  <label for="status" className="form-label">Order Status</label>
                  <select class="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="status"   required="required"
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
                            
                        </div>
                        <Footer />
                    </div>  
                </div>
            </div>
        </div>
    </div>
  );
}
  export default SalesCreateForm;