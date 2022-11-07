import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';

import { useStateContext } from '../../contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

function SupplierUpdate() {

    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

    const navigate = useNavigate();

    const [supplierId, setSupplierId] = useState('');
    const [companyname, setCompanyname] = useState("");
    const [contactPerson, setContactPerson] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [productDetails, setProductDetails] = useState("");
    const [leadTime, setLeadTime] = useState("");
    const [orderCapacity, setOrderCapacity] = useState("");   

    const {id} = useParams();

    const getSupplier = () => {

        axios.get(`http://localhost:8070/supplier/${id}`)
        .then((res) => {
            setSupplierId(res.data.supplierId);
            setCompanyname(res.data.companyname);
            setContactPerson(res.data.contactPerson);
            setEmail(res.data.email);
            setPhone(res.data.phone);
            setAddress(res.data.address);
            setProductDetails(res.data.productDetails);
            setLeadTime(res.data.leadTime);
            setOrderCapacity(res.data.orderCapacity);
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    useEffect(() => {
        getSupplier(); // <== CHANGE ACCORDING TO YOUR OWN FUNCTIONS, YOU CAN REMOVE THIS LINE IF YOU DON'T NEED IT
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

                            <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white '>
            <Header category="Form" title="Update Supplier Details" />
                    <div className=" flex items-center justify-center">
        
                    <form className="" onSubmit={async(e)=>{
                    e.preventDefault();

                    const updatedSupplier = {
                        supplierId,
                        companyname,
                        contactPerson,
                        email,
                        phone,
                        address,
                        productDetails,
                        leadTime,
                        orderCapacity,
                    }
    
                    await axios.put("http://localhost:8070/supplier/update/" + id, updatedSupplier)
                    .then((res) => {
                        alert("Supplier details updated successfully");
                        //navigate("/supplier");
                        navigate("/SupplierViewAll");
                       
                    })
                    .catch((err) => {
                        alert(err.message);
                    })
    
                }}>              

                        <div className="mb-3">
                            <label htmlFor="supplierId" className="form-label">Supplier ID</label>
                             <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                             id="supplierId" defaultValue={supplierId} placeholder="Enter the Supplier ID" required 
                                onChange={(e) => {
                                setSupplierId(e.target.value);
                            }}/>
                        </div>
                    
                            
                        <div className="mb-3">
                            <label htmlFor="companyname" className="text-md">Company Name : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="companyname" defaultValue={companyname} placeholder="Enter the Company name" required 
                                onChange={(e)=>{
                                    setCompanyname(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="contactPerson" className="text-md">Contact Person : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                id="contactPerson" defaultValue={contactPerson} placeholder="Enter the Contact Person" required
                                onChange={(e)=>{
                                    setContactPerson(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="text-md">Email : </label>
                            <input type="email" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                id="email" defaultValue={email} placeholder="Enter the Email" required
                                onChange={(e)=>{
                                    setEmail(e.target.value);
                                }
                            }/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="phone" className="text-md">Phone : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                id="phone" defaultValue={phone} placeholder="Enter the Phone Number" required
                                onChange={(e)=>{
                                    setPhone(e.target.value);
                                }
                            }/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="address" className="text-md">Address : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                id="address" defaultValue={address} placeholder="Enter the Address" required
                                onChange={(e)=>{
                                    setAddress(e.target.value);
                                }
                            }/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="productDetails" className="text-md">Product Details : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                id="productDetails" defaultValue={productDetails} placeholder="Enter the Product Details" required
                                onChange={(e)=>{
                                    setProductDetails(e.target.value);
                                }
                            }/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="leadTime" className="text-md">Lead Time : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                id="leadTime" defaultValue={leadTime} placeholder="Enter the Lead Time" required
                                onChange={(e)=>{
                                    setLeadTime(e.target.value);
                                }
                            }/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="orderCapacity" className="text-md">Order Capacity : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                id="orderCapacity" defaultValue={orderCapacity} placeholder="Enter the Order Capacity" required
                                onChange={(e)=>{
                                    setOrderCapacity(e.target.value);
                                }
                            }/>
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

export default SupplierUpdate;



