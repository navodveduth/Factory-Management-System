import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';
import { FiUser } from 'react-icons/fi';
import { DashTopBox, DashTopButton,  } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import Swal from "sweetalert2";
import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';


function PurchaseOrderUpdate() {

    const navigate = useNavigate()
    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

    const [orderID, setOrderID] = useState('');
    const [supplierID, setSupplierID] = useState('');
    const [qty, setQty] = useState('');
    const [productDetails, setProductDetails] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [cost, setCost] = useState('');
    const [orderStatus, setStatus] = useState('');

    const { id } = useParams();

    const getPurchaseOrder = async () => {
    axios.get(`http://localhost:8070/purchaseOrder/${id}`)
        .then((res) => {
            setOrderID(res.data.orderID);
            setSupplierID(res.data.supplierID);
            setQty(res.data.qty);
            setProductDetails(res.data.productDetails);
            setDeliveryDate(res.data.deliveryDate);
            setCost(res.data.cost);
            setStatus(res.data.orderStatus);
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    

    useEffect(() => {
        getPurchaseOrder()
        const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
          setCurrentColor(currentThemeColor);
          setCurrentMode(currentThemeMode);
        }}, []);

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
            <Header category="Form" title="Update Purchase Order Details" />
                    <div className=" flex items-center justify-center">
        
                    <form className="" onSubmit={async(e)=>{
                    e.preventDefault();  
                    
                    const updatedPurchaseOrdr = {
                        orderID,
                        supplierID,
                        qty,
                        productDetails,
                        deliveryDate,
                        cost,
                        orderStatus
                    }

                    await axios.put(`http://localhost:8070/purchaseOrder/update/${id}`, updatedPurchaseOrdr)
                    .then((res) => {
                        Swal.fire({  
                            icon: 'success',
                            title: 'Purchase Order Updated Successfully',
                            color: '#f8f9fa',
                            background: '#6c757d',
                            showConfirmButton: false,
                            timer: 2000
                          })
                        navigate('/PurchaseOrderView')
                    }).catch((err) => {
                        alert(err)
                    }
                    )
                    }}>

{/* <div className="mb-3">
                            <label htmlFor="supplierId" className="form-label">Supplier ID</label>
                             <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                             id="supplierId" defaultValue={supplierId} placeholder="Enter the Supplier ID" required 
                                onChange={(e) => {
                                setSupplierId(e.target.value);
                            }}/>
                        </div>      */}

                        <div className="mb-3">
                            <label htmlFor="orderID" className="form-label">Order ID</label>
                                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                id="orderID" defaultValue={orderID} placeholder="Enter the Order ID" required
                                onChange={(e) => {
                                setOrderID(e.target.value);
                            }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="supplierID" className="form-label">Supplier ID</label>
                                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                id="supplierID" defaultValue={supplierID} placeholder="Enter the Supplier ID" required
                                onChange={(e) => {
                                setSupplierID(e.target.value);
                            }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="qty" className="form-label">Quantity</label>
                                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                id="qty" defaultValue={qty} placeholder="Enter the Quantity" required
                                onChange={(e) => {
                                setQty(e.target.value);
                            }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="productDetails" className="form-label">Product Details</label>
                                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                id="productDetails" defaultValue={productDetails} placeholder="Enter the Product Details" required
                                onChange={(e) => {
                                setProductDetails(e.target.value);
                            }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="deliveryDate" className="form-label">Delivery Date</label>
                                <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                id="deliveryDate" defaultValue={deliveryDate} placeholder="Enter the Delivery Date" required
                                onChange={(e) => {
                                setDeliveryDate(e.target.value);
                            }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="cost" className="form-label">Cost</label>
                                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                id="cost" defaultValue={cost} placeholder="Enter the Cost" required
                                onChange={(e) => {
                                setCost(e.target.value);
                            }}/>
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

export default PurchaseOrderUpdate;

        


