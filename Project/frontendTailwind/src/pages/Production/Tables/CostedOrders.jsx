import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link ,useNavigate} from "react-router-dom";
import {jsPDF} from "jspdf";
import TableHeader from "../../../components/Table/TableHeader";
import TableData from '../../../components/Table/TableData';
import Header from "../../../components/Header";
import { useStateContext } from '../../../contexts/ContextProvider';

import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import Swal from 'sweetalert2';
import {DateRangePickerComponent} from '@syncfusion/ej2-react-calendars' // this code needed for the datesort function

export default function CostedOrders(){
    const navigate = useNavigate();
    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings,  } = useStateContext();
    const [Order,setOrder] = useState([])
    const [searchTerm, setSearchTerm] = useState(""); 

    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");

    const toDateRange=()=>{
        navigate('/CompletedOrdersDateRange',{state:{DS:dateStart,DE:dateEnd}});
      }

        async function getOrders(){
            await axios.get("http://localhost:8070/production/order/allOrders").then((res)=>{
                setOrder(res.data);
            }).catch((err)=>{
                alert(err.message);
            })
        }

        useEffect(()=>{
            getOrders();
            const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
            const currentThemeMode = localStorage.getItem('themeMode');
            if (currentThemeColor && currentThemeMode) {
              setCurrentColor(currentThemeColor);
              setCurrentMode(currentThemeMode);
            }
        },[]);

        let dateRangeRef = (dateRange) => {
          dateRangeRef = dateRange; // dateRangeRef is a reference to the DateRangePickerComponent
        };
      
        const filterDate = () => {
          if (dateRangeRef.value && dateRangeRef.value.length > 0) {
      
              const start = (dateRangeRef.value[0]);
              const end = (dateRangeRef.value[1]);
      
              setDateStart(start);
              setDateEnd(end);
              navigate('/costedDateRange',{state:{DS:start,DE:end}});
      
          } else {
            alert("Please select a date range")
            setDateStart('');
            setDateEnd('');
          }
      
      };

        // const createPDF = () => {
        //     const pdf = new jsPDF("landscape", "px", "a1",false);
        //     const data = document.querySelector("#tableContainer");
        //     pdf.html(data).then(() => {
        //         pdf.save("orders.pdf");
        //        });
        // };

        async function deletesOrder(id){
            await axios.delete(`http://localhost:8070/production/order/delete/${id}`).then((res)=>{
                //alert("Production cost data deleted Successfully");
               getOrders();
            }).catch((err)=>{
              //  alert(err.message);
            })
        }

        async function updateSales(id){
            const salesStatus = "Pending"
            //  const statusPass = {salesStatus}
              await axios.put('http://localhost:8070/Production/order/updateStatus/'+id,{"status":salesStatus}).then((res)=>{
                 // alert("Sale Status Changed");
              }).catch((error)=>{
                  console.log(error)
                  //alert("Sale Status Change Unsuccessful");
              })
            }

        async function confirmFunc(id,invoiceNo,stat){
            if(stat == "Yeehaw"){
                const { value: password } =  await Swal.fire({
                    title: 'Enter the Master Password',
                    input: 'password',
                    inputLabel: 'Password',
                    inputPlaceholder: 'Enter your password',
                    inputAttributes: {
                      maxlength: 10,
                      autocapitalize: 'off',
                      autocorrect: 'off'
                    }
                  })
                  if (password != "12345") {
                    Swal.fire(`Invalid Password`)
                    navigate('/costedOrders');
                  }else{
                    Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Proceed'
                      }).then((result) => {
                        if (result.isConfirmed) {
                          deletesOrder(id);
                          updateSales(invoiceNo);
                          Swal.fire({  
                            icon: 'success',
                            title: 'Invoice Status Changed and Data Successfully Deleted',
                            color: '#f8f9fa',
                            background: '#6c757d',
                            showConfirmButton: false,
                            timer: 2000
                          })
                        }else {
                          navigate('/costedOrders');
                        }
                      })
                  }
            }else{
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      deletesOrder(id);
                      updateSales(invoiceNo);
                      Swal.fire({  
                        icon: 'success',
                        title: 'Data Succesfully deleted',
                        color: '#f8f9fa',
                        background: '#6c757d',
                        showConfirmButton: false,
                        timer: 2000
                      })
                    }else {
                      navigate('/costedOrders');
                    }
                })
            }
          };

        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'LKR',
            minimumFractionDigits: 2,
            currencyDisplay: 'symbol'
          })


        return(
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
                             <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
                                    <Header category="Table" title="Costed Orders" />
                                    <div className=" flex items-center mb-5 ">
                                <div className="flex items-center mb-5" >
                                    <input type="text" className=" block w-400 rounded-md bg-gray-100 focus:bg-white dark:text-black" placeholder="Search Here" 
                                    onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    }} />
                                </div>
                                
                                <div className=" flex items-center ml-5 mb-5 "> {/* this code needed for the datesort function*/}
                                  <div className=" bg-slate-100 pt-1 rounded-lg px-5 w-56">
                                      <DateRangePickerComponent ref={dateRangeRef}  placeholder="Select a date range"/>
                                  </div>
                                  <div className="ml-5">
                                      <button type="button"  className="py-2 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" onClick={() => filterDate()}>Filter</button>
                                  </div>
                              </div>
                                <div className="mr-0 ml-auto">
                                    <Link to={"/CostedPreview"}> {/* change this link your preview page */}
                                    <button type="button" value = "Generate Report" className="py-1 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" > Generate Report</button>
                                    </Link>
                                </div>


                                </div>
                                    <div className="block w-full overflow-x-auto rounded-lg" id="tableContainer">
                                    <table className="w-full rounded-lg">
                                        <thead>
                                            <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                                            <TableHeader value ="Invoice No"></TableHeader>
                                            <TableHeader value ="Product"></TableHeader>
                                            <TableHeader value ="Quantity"></TableHeader>
                                            <TableHeader value ="Costed Date"></TableHeader>
                                            <TableHeader value ="Budgeted Total Cost"></TableHeader>
                                            <TableHeader value ="Total Cost"></TableHeader>
                                            <TableHeader value ="Variance"></TableHeader>
                                            <TableHeader value ="Status"></TableHeader>
                                            <TableHeader value="Manage"/>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Order.filter((data)=>{
                                                if(searchTerm == ""){
                                                    return data;
                                                }else if((data.invoiceNo.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
                                                        (data.product.toLowerCase().includes(searchTerm.toLowerCase())) || 
                                                        (data.supervisor.toLowerCase().includes(searchTerm.toLowerCase()))){
                                                    return data;
                                                }
                                            }).map((data,key)=>{
                                                if(data.status == "Costed"){
                                                    var datacolor = "text-black";
                                                    if (data.budgetedtotalCost > data.totalCost) {
                                                        datacolor = "text-green-500 font-bold";
                                                    } else {
                                                        datacolor = "text-red-600 font-bold";
                                                    }
                                                    return ( 
                                                        <tr className="text-sm h-10 border dark:border-slate-600" key={key}>
                                                            <TableData value={data.invoiceNo}/>
                                                            <TableData value={data.product}/>
                                                            <TableData value={data.unitQty}/>
                                                            <TableData value={new Date(data.costedDate).toISOString().split('T')[0]}/>
                                                            <TableData value={formatter.format(data.budgetedtotalCost)}/>
                                                            <TableData value={formatter.format(data.totalCost)}/>
                                                            <td className={`${datacolor} text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3`}><TableData value={formatter.format(data.budgetedtotalCost - data.totalCost)}/></td>
                                                            <TableData value={data.status}/>
                                                            <td className="text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">
                                                                <Link to={"/costingOrder/" +data._id }>
                                                                    <button 
                                                                        type="button" 
                                                                        className="font-bold py-1 px-4 rounded-full mx-3 text-white" 
                                                                        style={{ background: currentColor }}><i className="fas fa-edit"/>
                                                                    </button>
                                                                </Link>
                                                            
                                                                <button onClick={()=>{
                                                                confirmFunc(data._id,data.invoiceNo,data.status);
                                                                }}
                                                                type="button" 
                                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 ml-2 rounded-full">
                                                                <i className="fas fa-trash" />
                                                                </button>
                                                        </td>
                                                     </tr>
                                                    )
                                                }

                                            })}
                                        </tbody>
                                    </table>
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
