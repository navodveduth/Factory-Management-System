import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';
import { FiUser } from 'react-icons/fi';
import { DashTopBox, DashTopButton, } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';

import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';


function PurchaseOrderAdd() {

    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

    const navigate = useNavigate(); //useNavigate hook to redirect to another page after form submission is successful

    const [orderID, setOrderID] = useState('');
    const [supplierID, setSupplierID] = useState('');
    const [qty, setQty] = useState('');
    const [productDetails, setProductDetails] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [cost, setCost] = useState('');
    const [orderStatus, setStatus] = useState('');

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
                <Header category="Form" title=" Create New Purchase Order" />
                <div className=" flex items-center justify-center "> 
                <form onSubmit={async(e)=>{
                    e.preventDefault();

                    const newPurchaseOrder = {
                        orderID,
                        supplierID,
                        qty,
                        productDetails,
                        deliveryDate,
                        cost,
                        orderStatus
                    }

                    console.log(newPurchaseOrder);

                    await axios.post('http://localhost:8070/purchaseOrder/create', newPurchaseOrder)
                    .then((res)=>{
                        alert("Purchase order details added successfully");
                        navigate("/PurchaseOrderView");
                      })
                        .catch((err)=>{
                            alert(err);
                        })
                }
                }>
                        {/* <div className="mb-3">         
                    <label for="supplierId" className="form-label">Supplier ID : </label>
                    <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                    id="supplierId" placeholder="Enter the supplier ID" required 
                    onChange={(e)=>{
                        setSupplierId(e.target.value);
                    }}/>
                </div> */}

                <div className="mb-3">
                    <label for="orderID" className="form-label">Order ID : </label>
                    <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                    id="orderID" placeholder="Enter the order ID" required
                    onChange={(e)=>{
                        setOrderID(e.target.value);
                    }
                    }/>
                </div>

                <div className="mb-3">
                    <label for="supplierID" className="form-label">Supplier ID : </label>
                    <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                    id="supplierID" placeholder="Enter the supplier ID" required
                    onChange={(e)=>{
                        setSupplierID(e.target.value);
                    }
                    }/>

                </div>

                <div className="mb-3">
                    <label for="qty" className="form-label">Quantity : </label>
                    <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                    id="qty" placeholder="Enter the quantity" required
                    onChange={(e)=>{
                        setQty(e.target.value);
                    }
                    }/>

                </div>

                <div className="mb-3">
                    <label for="productDetails" className="form-label">Product Details : </label>
                    <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                    id="productDetails" placeholder="Enter the product details" required
                    onChange={(e)=>{
                        setProductDetails(e.target.value);
                    }
                    }/>

                </div>

                <div className="mb-3">
                    <label for="deliveryDate" className="form-label">Delivery Date : </label>
                    <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                    id="deliveryDate" placeholder="Enter the delivery date" required
                    onChange={(e)=>{
                        setDeliveryDate(e.target.value);
                    }
                    }/>

                </div>

                <div className="mb-3">
                    <label for="cost" className="form-label">Cost : </label>
                    <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                    id="cost" placeholder="Enter the cost" required
                    onChange={(e)=>{
                        setCost(e.target.value);
                    }
                    }/>

                </div>

                <div className="mb-3">
                            <label htmlFor="orderStatus" className="form-label">Order Status</label>
                            < select class="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                            id="orderStatus" placeholder="Enter the Order Status" required = "required"
                            onChange={(e) => {
                            setStatus(e.target.value);
                        }}>
                            <option value = "">Select Transaction Type</option>
                            <option value="Order Placed">Order Placed</option>
                            <option value="Order Completed">Order Completed</option>
                
                            </select>
                        </div>

                
<button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Submit</button>

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

export default PurchaseOrderAdd;





