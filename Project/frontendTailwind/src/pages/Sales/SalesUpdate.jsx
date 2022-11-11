import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header,Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useStateContext } from '../../contexts/ContextProvider';
import Swal from "sweetalert2";

function SalesUpdate() {
    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();
    
    const navigate = useNavigate();

    const [invoiceNo, setInvoice] =useState('');
    const [orderDate, setOrderDate] =useState('');
    const [customerID, setCustomerID] =useState('');
    const [itemName, setItemName] =useState('');
    const [quantity, setQuantity] =useState('');
    const [totalAmount, setTotalAmount] =useState('');
    const [status, setStatus] =useState('');

    const {id} = useParams(); //get the id from the url

    const getSale = () => {
        axios.get(`http://localhost:8070/sales/${id}`)
        .then((res) => {
            
            setInvoice(res.data.invoiceNo);
            setOrderDate(res.data.orderDate);
            setCustomerID(res.data.customerID);
            setItemName(res.data.itemName);
            setQuantity(res.data.quantity);
            setTotalAmount(res.data.totalAmount);
            setStatus(res.data.status);
            })
            .catch((err) => {
                alert(err.message);
            })
        }

    useEffect(() => {
        getSale();
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
                          <Header category="Form" title="Update Invoice" />
                                  <div className=" flex items-center justify-center">

                                      <form className="" onSubmit={async(e)=>{
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

                                          await axios.put(`http://localhost:8070/sales/update/` + id, newOrder)
                                              .then((res)=>{
                                                Swal.fire({  
                                                    icon: 'success',
                                                    title: 'Data Successfully Updated',
                                                    color: '#f8f9fa',
                                                    background: '#6c757d',
                                                    showConfirmButton: false,
                                                    timer: 2000
                                                  })
                                              navigate('/SalesViewAll');
                                              })
                                              .catch((err)=>{
                                                  console.log(err);
                                                  alert("Error Occured!");
                                              })   
                                      }}>

                                          <div className="mb-3">
                                              <label htmlFor="invoiceNo" className="text-md">Invoice Number</label>
                                              <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                                  id="invoiceNo" value={invoiceNo}  disabled
                                                  onChange={(e)=>{
                                                      setInvoice(e.target.value);
                                                  }}/>
                                          </div>

                                          <div className="mb-3">
                                              <label htmlFor="orderDate" className="form-label">Date of Order</label>
                                              <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                                  id="orderDate" value={orderDate}  
                                                  onChange={(e)=>{
                                                      setOrderDate(e.target.value);
                                                  }}/>
                                          </div>

                                          <div className="mb-3">
                                              <label htmlFor="customerID" className="form-label">Customer ID</label>
                                              <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                                  id="customerID" value={customerID}  disabled
                                                  onChange={(e) =>{
                                                      setCustomerID(e.target.value);
                                                  }}/>
                                          </div>

                                          <div className="mb-3">
                                              <label htmlFor="itemName" className="form-label">Item Name</label>
                                              <select type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                                  id="itemName" value={itemName}  
                                                  onChange={(e) =>{
                                                      setItemName(e.target.value);
                                                  }}>
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
                                              <label htmlFor="quantity" className="form-label">Quantity</label>
                                              <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                                  id="quantity" value={quantity} required 
                                                  onChange={(e) =>{
                                                      setQuantity(e.target.value);
                                                  }}/>
                                          </div>

                                          <div className="mb-3">
                                              <label htmlFor="totalAmount" className="form-label">Total Amount of Invoice</label>
                                              <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                                  id="totalAmount" value={totalAmount} required
                                                  onChange={(e) =>{
                                                      setTotalAmount(e.target.value);
                                                  }}/>
                                          </div>

                                      

                                          <div className="mb-3">
                                          <label htmlFor="status" className="form-label">Status</label>
                                              <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                                  id="status" value={status} 
                                                  onChange={(e) =>{
                                                      setStatus(e.target.value);
                                                  }}/>
                                          </div>

                                                  {/* <option value='Pending'>Pending</option>
                                                  <option value='Pending'>Processing</option>
                                                  <option value='Finished'>Finished</option> */}

                                      <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Update Order</button>
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
  )
}

export default SalesUpdate;