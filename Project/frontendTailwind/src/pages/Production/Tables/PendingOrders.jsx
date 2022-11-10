import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Header } from '../../../components';
import {jsPDF} from "jspdf";
import { useStateContext } from '../../../contexts/ContextProvider';
import TableData from '../../../components/Table/TableData';
import TableHeader from '../../../components/Table/TableHeader';
import Swal from 'sweetalert2';

import { FiUser } from 'react-icons/fi';
import { DashTopBox, DashTopButton,  } from '../../../components';
import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

const PendingOrders = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

  const [sales, setSale] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getSale = async () => {
    axios
      .get(`http://localhost:8070/sales/`)
      .then((res) => {
        setSale(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getSale();
  }, []);

  const deleteSale = async (id) => {
    await axios
      .delete(`http://localhost:8070/sales/delete/${id}`)
      .then((res) => {
        console.log('Deleted Successfully');
        getSale();
      })
      .catch((err) => {
        alert(err.message);
      });
  };


  async function confirmFunc(id,stat){
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
                  deleteSale(id)
                  Swal.fire({  
                    icon: 'success',
                    title: 'Invoice Status Changed and Data Successfully Deleted',
                    color: '#f8f9fa',
                    background: '#6c757d',
                    showConfirmButton: false,
                    timer: 2000
                  })
                }else {
                  navigate('/pendingOrders');
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
                deleteSale(id)
              Swal.fire({  
                icon: 'success',
                title: 'Data Succesfully deleted',
                color: '#f8f9fa',
                background: '#6c757d',
                showConfirmButton: false,
                timer: 2000
              })
            }else {
              navigate('/pendingOrders');
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
                  <div>
                          <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
                              <Header category="Table" title="Pending Sale Orders" />
                              
                              <div className=" flex items-center mb-5 ">
                              <div>
                                  <input type="text" className=" block w-400 rounded-md bg-gray-100 focus:bg-white dark:text-black" placeholder="Search Here" 
                                  onChange={(e) => {
                                  setSearchTerm(e.target.value);
                                  }} />
                              </div>
                              <div className="mr-0 ml-auto">
                                  {/* change this link your preview page */}
                                  <Link to={"/SalesPreview"}>
                                  <button type="button" className="py-1 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" >Generate Report</button>
                                  </Link>
                              </div>

                              </div>

                              
                              <div className="block w-full overflow-x-auto rounded-lg" id="tableContainer">
                              <table className="w-full rounded-lg">
                                  <thead>
                                  <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                                      <TableHeader value="Invoice No." />
                                      <TableHeader value="Date of Order" />
                                      <TableHeader value="Customer Name" />
                                      <TableHeader value="Item Name" />
                                      <TableHeader value="Quantity" />
                                      <TableHeader value="Total Amount" />
                                      <TableHeader value="Status" />
                                      <TableHeader value="Manage" />
                                  </tr>
                                  </thead>
                                  <tbody>
                                          {sales.filter((data) => {
                                          if(searchTerm == ""){
                                              return data;
                                          }else if((data.invoiceNo.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
                                              (data.orderDate.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                              (data.itemName.toLowerCase().includes(searchTerm.toLowerCase())))
                                          {     
                                              return data;
                                          }
                                      }).map((data, key) => {

                                        let formattedAmount = formatter.format(data.totalAmount);
                                          if(data.status == "Pending"){
                                              return( 
                                                  <tr className="text-sm h-10 border dark:border-slate-600" key={key}>
                      
                                                  <TableData value={data.invoiceNo} />
                                                  <TableData value={new Date(data.orderDate).toISOString().split('T')[0]} />
                                                  <TableData value={data.customerDetailss.map((data3) => {
                                                      return (
                                                          <div>
                                                          <TableData value = {data3.customerName} /> 
                                                          </div>
                                                      )
                                                      
                                                  })} />
                                  
                                                  <TableData value={data.itemName} />
                                                  <TableData value={data.quantity} />
                                                  <TableData value={formattedAmount} />
                                                  <TableData value={data.status} />
                      
                                          <td className="text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">
                                          <Link to={"/requestStock/" +data.invoiceNo }>
                                              <button
                                              type="button"
                                              className=" bg-green-500 hover:bg-green-700 font-bold py-1 px-4 rounded-full mx-3  text-white"
                                              
                                              >
                                              Process Order
                                              </button>
                                          </Link>
                      
                                          <button
                                              type="button"
                                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 ml-2 rounded-full"
                                              onClick={() => {
                                              confirmFunc(data._id,data.invoiceNo);
                                              }}
                                          >
                                              <p>Revert Order</p>
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
                      </div>
                      <Footer />
                  </div>  
              </div>
          </div>
      </div>
  </div>
  );
};

export default PendingOrders;
