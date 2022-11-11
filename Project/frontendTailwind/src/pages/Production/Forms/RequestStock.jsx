import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams,useNavigate} from "react-router-dom";
import Header from "../../../components/Header";
import { useStateContext } from '../../../contexts/ContextProvider';
import { FiUser } from 'react-icons/fi';
import { DashTopBox, DashTopButton,  } from '../../../components';
import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import Swal from 'sweetalert2';

export default function UpdateOrder(){
    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();
    const navigate = useNavigate();

//values for the order to be posted 
    const [invoiceNo, setInvoice] =useState('');
    const [product, setItemName] =useState('');
    const [unitQty, setQuantity] =useState('');
    const [materialCost,setMatCost] = useState('');
    const [requestDate,setOrderDate] = useState('');
    const [supervisor,setSupervisor] =useState('');
    const [teamLead, setTeamLead] = useState('');
    const [member1,setMember1] = useState('');
    const [member2,setMember2] = useState('');
    const [budgetedoverHeadCost,setBudgetOH] = useState('');
    //const [status,setStatus] = useState('');  
    const status = "Stock Requested"  
    const [saleDate, setSaleDate] = useState('');
   // const [totalCost, setTotalCost] =useState('');

   console.log(saleDate);
    
    //Determinant values 

    var currentDate = new Date().toISOString().split('T')[0];
    var minDate = saleDate.split('T')[0];
    
    //auxiliary content to pass the value
    const [Days, setDays] = useState('');
    const [rate,setRate] = useState('');
    //const status =  "Stock Requested"
    const costedDate = requestDate;
    const overHeadCost = 0;
    
    const intDates = parseInt(Days);
    const floatRate = parseFloat(rate);
       //Handling budgets
    const budgetedMatCost = unitQty * materialCost;
    const totalMatCost = 0;

    const budgetedLabCost = (Days * rate * 8 * 4);
    const totalLabCost = 0;
    
    const budgetedtotalCost = (budgetedLabCost + budgetedMatCost + parseFloat(budgetedoverHeadCost));
 //   
    const totalCost = 0;

    const {id} = useParams(); //get the id from the url

    const getSale = () => {
       // http://localhost:8070/Production/order/pending/:invoiceNo
       // http://localhost:8070/sales/${id}
        axios.get(`http://localhost:8070/Production/order/pending/${id}`)
        .then((res) => {
            
            setInvoice(res.data.invoiceNo);
            setItemName(res.data.itemName);
            setQuantity(res.data.quantity);
            setSaleDate(res.data.orderDate);
            })
            .catch((err) => {
                alert(err.message);
            })
        }

    //View Employee Names in the Drop Down
   // const {id} = useParams();   // gets the id from the url
    const [employee,setEmployee] = useState([]);
    const getEmployees = async () => {
        axios
          .get('http://localhost:8070/employee/viewEmployee')
          .then((res) => {
            setEmployee(res.data);
          })
          .catch((err) => {
            alert(err.message);
          });
      };
    

        useEffect(()=>{ //This will run the page when loaded
        getSale();
        getEmployees();
    },[]);

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
                           {/* Paste your content Here */} 
                           <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white '>
                                <Header category="Form" title="Request Stocks" />
                                <div className=" flex items-center justify-center">
                                    <form onSubmit={async(e)=>{
                                        
                                                e.preventDefault();
                                
                                            const newOrder = {
                                                invoiceNo,
                                                product,
                                                materialCost,
                                                unitQty,
                                                requestDate,
                                                costedDate,
                                                supervisor,
                                                teamLead,
                                                member1,
                                                member2,
                                                totalMatCost,
                                                budgetedMatCost,
                                                totalLabCost,
                                                budgetedLabCost,
                                                overHeadCost,
                                                budgetedoverHeadCost,
                                                totalCost,
                                                budgetedtotalCost,
                                                status,
                                        }
                                        console.log(newOrder)
                                        const salesStatus = "In Production"
                                      //  const statusPass = {salesStatus}
                                        await axios.put('http://localhost:8070/Production/order/updateStatus/'+id,{"status":salesStatus}).then((res)=>{
                                            console.log("Sale Status Changed");
                                        }).catch((error)=>{
                                            console.log(error)
                                            console.log("Sale Status Change Unsuccessful");
                                        })
                                        console.log(newOrder);
                                        await axios.post("http://localhost:8070/production/order/orderCreate",newOrder).then(()=>{
                                            //alert("Order Created");

                                            Swal.fire({  
                                                icon: 'success',
                                                title: 'Data Saved Successfully',
                                                color: '#f8f9fa',
                                                background: '#6c757d',
                                                showConfirmButton: false,
                                                timer: 2000
                                              })
                                            navigate('/viewRequested');

                                        }).catch((error)=>{
                                            console.log(error);
                                            Swal.fire({  
                                                icon: 'success',
                                                title: 'This Production Voucher Already Exists',
                                                color: '#f8f9fa',
                                                background: '#6c757d',
                                                showConfirmButton: false,
                                                timer: 2000
                                              })
                                        })
                                    }}>
                                        <div className="mb-3">
                                            <label for="name" className="text-md">Invoice Number</label>
                                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="name" placeholder={invoiceNo} onChange={(e)=>{
                                                setInvoice(e.target.value);    //event has to be created in any onclick. event has to be passed down to get the values
                                            }}
                                            readOnly/>
                                        </div>
                                        <div className="mb-3">
                                            <label for="name" className="text-md">Quantity</label>
                                            <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="name" placeholder={unitQty} onChange={(e)=>{
                                                setQuantity(unitQty);    //event has to be created in any onclick. event has to be passed down to get the values
                                            }}
                                            readOnly/>
                                        </div>
                                        <div className="mb-3">
                                            <label for="name" className="text-md">Product</label>
                                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="name" placeholder={product} onChange={(e)=>{
                                                setItemName(e.target.value);
                                            }}
                                            readOnly/>
                                        </div>
                                        <div className="mb-3">
                                            <label for="name" className="text-md">Material Cost</label>
                                            <input type="Number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="name" placeholder={materialCost} onChange={(e)=>{
                                                setMatCost(e.target.value);
                                            }}/>
                                        </div>

                                        <div className="mb-3">
                                            <label for="name" className="text-md">Request Date</label>
                                            <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="name" placeholder={materialCost} onChange={(e)=>{
                                                setOrderDate(e.target.value);
                                            }} max={currentDate}
                                                min = {minDate}/>
                                        </div>

                                        <div className="mb-3">
                                                <label for="category" className="form-label">Select The Supervisor </label>
                                                    < select class="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"  id="category" onChange={(e) => {
                                                        setSupervisor(e.target.value);
                                                }}
                                                placeholder={"Select The Supervisor"}>

                                                    {employee.filter((data)=>{
                                                        return(
                                                            data.employeeType == "Executive" && data.employeeDepartment == "Production"
                                                        );
                                                        
                                                    }).map((data)=>{
                                                        return(
                                                                <option value={data.employeeFullName} label={data.employeeFullName}>{data.employeeFullName} </option>
                                                            )
                                                    })}

                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label for="category" className="form-label">Select The Team Lead</label>
                                                    < select class="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"  id="category" required onChange={(e) => {
                                                        setTeamLead(e.target.value);
                                                }}>

                                                    {employee.filter((data)=>{
                                                        return(
                                                            data.employeeType == "Non-Executive" && data.employeeDepartment == "Production"
                                                        );
                                                        
                                                    }).map((data)=>{
                                                        return(
                                                                <option value={data.employeeFullName} label={data.employeeFullName}>{data.employeeFullName} </option>
                                                            )
                                                    })}

                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label for="category" className="form-label">Select Technical Member</label>
                                                    < select class="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"  id="category" required onChange={(e) => {
                                                        setMember1(e.target.value);
                                                }}>

                                                    {employee.filter((data)=>{
                                                        return(
                                                            data.employeeType == "Non-Executive" && data.employeeDepartment == "Production"
                                                        );
                                                        
                                                    }).map((data)=>{
                                                        return(
                                                                <option value={data.employeeFullName} label={data.employeeFullName}>{data.employeeFullName} </option>
                                                            )
                                                    })}
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label for="category" className="form-label">Select Production Member</label>
                                                    < select class="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"  id="category" required onChange={(e) => {
                                                        setMember2(e.target.value);
                                                }}>

                                                    {employee.filter((data)=>{
                                                        return(
                                                            data.employeeType == "Non-Executive" && data.employeeDepartment == "Production"
                                                        );
                                                        
                                                    }).map((data)=>{
                                                        return(
                                                                <option value={data.employeeFullName} label={data.employeeFullName}>{data.employeeFullName} </option>
                                                            )
                                                    })}

                                                </select>
                                            </div>
                                            <div className="mb-3">
                                            <label for="name" className="text-md">Enter the Estimated Labour Rate</label>
                                            <input type="Number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="name"  onChange={(e)=>{
                                                setRate(e.target.value);
                                            }}/>
                                        </div>
                                            <div className="mb-3">
                                            <label for="name" className="text-md">Enter the Estimated Days (8 hours a day)</label>
                                            <input type="Number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="name"  onChange={(e)=>{
                                                setDays(e.target.value);
                                            }}/>
                                        </div>
                                                        
                                        <div className="mb-3">
                                            <label for="address" className="text-md">Estimated Labour Cost</label>
                                            <input type="Number" placeholder={budgetedLabCost} className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="address"   onChange={(e)=>{
                                                //setTotalLabCost(); 
                                            }} readOnly/>
                                        </div>
                                        
                                        <div className="mb-3">
                                            <label for="address" className="text-md">Estimated Material Cost</label>
                                            <input type="Number" placeholder={budgetedMatCost} className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="address"   onChange={(e)=>{
                                                //setTotalLabCost();
                                            }} readOnly/>
                                        </div>
                                        <div className="mb-3">
                                            <label for="address" className="text-md">Estimated Overhead Cost</label>
                                            <input type="Number" placeholder="Enter the expected overhead cost" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="address"   onChange={(e)=>{
                                                setBudgetOH(e.target.value);
                                            }}/>
                                        </div>

                                        <div className="mb-3">
                                            <label for="address" className="text-md">Estimated Total Production Cost</label>
                                            <input type="Number" placeholder={budgetedtotalCost} className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="address"   onChange={(e)=>{
                                                //setTotalLabCost();
                                            }} readOnly/>
                                        </div>

                                        {/* <div className="mb-3">
                                            <label for="name" className="text-md">Set Status</label>
                                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="name" placeholder="Enter the Status" onChange={(e)=>{
                                                setStatus(e.target.value);
                                            }}
                                            />
                                        </div> */}
                                        

                                        <div>
                                        <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Request Stock</button>
                                        </div>
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
