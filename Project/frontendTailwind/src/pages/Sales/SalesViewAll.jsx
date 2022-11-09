import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Header, Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import {jsPDF} from "jspdf";
import { useStateContext } from '../../contexts/ContextProvider';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import Swal from "sweetalert2";

const SalesViewAll = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

  const [sales, setSale] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const navigate = useNavigate();

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
    const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const deleteSale = async (id) => {
    await axios
      .delete(`http://localhost:8070/sales/delete/${id}`)
      .then((res) => {
        getSale();
      })
      .catch((err) => {
        alert(err.message);
      })
  }

  const toDateRange = () => {
    navigate('/SalesDateRange',{state:{DS:dateStart,DE:dateEnd}});
  }

    const confirmFunc = (id) => {

        Swal.fire({
          title: 'Confirm Delete?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Delete it!'})
          .then((result) => {
            if (result.isConfirmed) {
                deleteSale(id);
                Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
                )
            } else {
                navigate('/SalesViewAll');
            }
        })
      }

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
                      
                          <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
                              <Header category="Table" title="Sales Invoices" />
                              
                              <div className=" flex items-center mb-5 ">
                              <div>
                                  <input type="text" className=" block w-400 rounded-md bg-gray-100 focus:bg-white dark:text-black" placeholder="Search Here" 
                                  onChange={(e) => {
                                  setSearchTerm(e.target.value);
                                  }} />
                              </div>

                              <div>
                                <input type="date" className=" block w-100 rounded-md bg-gray-100 focus:bg-white dark:text-black mx-3" placeholder="Start Date" 
                                    onChange={(e) => {
                                    setDateStart(e.target.value);
                                    }} />
                              </div>

                              <div>
                                <input type="date" className=" block w-100 rounded-md bg-gray-100 focus:bg-white dark:text-black mr-3" placeholder="End Date" 
                                    onChange={(e) => {
                                    setDateEnd(e.target.value);
                                    }} />
                              </div>

                              <div className=" mx-1">
                                  <button type="button" className = "py-2 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" onClick={()=>{toDateRange()}}>Filter by Date</button>
                              </div>

                              <div className="mr-0 ml-auto">
                                  {/* change this link your preview page */}
                                  <Link to={"/SalesPreview"}>
                                  <button type="button" className="py-2 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" >Generate Report</button>
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
                                          }else if(
                                          (data.invoiceNo.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
                                          (data.orderDate.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                          (data.itemName.toLowerCase().includes(searchTerm.toLowerCase())))
                                          {     
                                          return data;
                                          }
                                      }).map((data, key) => {
                                        let formattedAmount = formatter.format(data.totalAmount)

                                          return( 
                                              <tr className="text-sm h-10 border dark:border-slate-600" key={key}>

                                                  <TableData value={data.invoiceNo} />
                                                  <TableData value={new Date(data.orderDate).toISOString().split('T')[0]} />
                                                  <TableData value={data.customerDetailss.map((data3) => {
                                                      return (
                                                      <div>
                                                          {data3.customerName}
                                                      </div>
                                                      )
                                                  
                                                  })} />
                                                  <TableData value={data.itemName} />
                                                  <TableData value={data.quantity} />
                                                  <TableData value={formattedAmount} />
                                                  <TableData value={data.status} />

                                      <td className="text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">
                                          <Link to={`/SalesUpdate/${data._id}`}>
                                          <button
                                              type="button"
                                              className="font-bold py-1 px-4 rounded-full mx-3  text-white"
                                              style={{ background: currentColor }}
                                          >
                                              <i className="fas fa-edit" />
                                          </button>
                                          </Link>

                                          <Link to={`/SalesInvoice/${data._id}`}>
                                          <button
                                              type="button"
                                              className="font-bold py-1 px-4 rounded-full mx-3  text-white"
                                              style={{ background: currentColor }}
                                          >
                                              <i className="fa-regular fa-file-lines" />
                                          </button>
                                          </Link>

                                          <button
                                          type="button"
                                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 ml-2 rounded-full"
                                          onClick={() => {
                                              confirmFunc(data._id);
                                          }}
                                          >
                                          <i className="fas fa-trash" />
                                          </button>
                                      </td>
                                      </tr>
                                  )})}
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

export default SalesViewAll;
