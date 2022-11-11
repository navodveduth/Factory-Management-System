import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Header, Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';
import { FiSettings, FiFilePlus } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import Swal from "sweetalert2";

const CustomerViewAll = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

  const [customer, setCustomer] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getCustomer = async () => {
    axios
      .get(`http://localhost:8070/customer/all`)
      .then((res) => {
        setCustomer(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getCustomer();
    const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const deleteCustomer = async (id) => {
    await axios
      .delete(`http://localhost:8070/customer/delete/${id}`)
      .then((res) => {
        getCustomer();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const confirmFunc = (id) => {

    Swal.fire({
      title: 'Confirm Delete?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      background: '#6c757d',
      color: '#f8f9fa',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!'})
      .then((result) => {
        if (result.isConfirmed) {
            deleteCustomer(id);
            Swal.fire({
              icon: 'success',
              title: 'Data Successfully Deleted!',
              color: '#f8f9fa',
              background: '#6c757d',
              showConfirmButton: false,
              timer: 2000
            })
        } else {
            navigate('/CustomerViewwAll');
        }
    })
  }

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
                              <div>
                              <Link to="/SalesCreate">
                              <button type="button" icon = {<FiFilePlus/>} className="font-bold py-1 px-4 rounded-full m-3 text-white absolute top-40 right-20 hover:bg-slate-700 bg-slate-500" >New Invoice</button>                              </Link>
                             <br></br></div>

                              <Header  title="Customers" />
                              
                              <div className=" flex items-center mb-5 ">
                                <div>
                                  <input type="text" className=" block w-400 rounded-md bg-gray-100 focus:bg-white dark:text-black" placeholder="Search Here" 
                                  onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                  }} />
                                </div>
                              
                              </div>

                              
                              <div className="block w-full overflow-x-auto rounded-lg" id="tableContainer">
                                <table className="w-full rounded-lg">
                                  <thead>
                                    <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                                      <TableHeader value="Customer ID" />
                                      <TableHeader value="Customer Name" />
                                      <TableHeader value="Contact No." />
                                      <TableHeader value="Customer Address" />
                                      <TableHeader value="Invoices" />
                                      <TableHeader value="Manage" />
                                    </tr>
                                  </thead>
                                  <tbody>

                                  {customer.filter((data) => {
                                          if(searchTerm == ""){
                                              return data;
                                          }else if(
                                            (data.customerContactNo.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                            (data.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                            (data.customerID.toLowerCase().includes(searchTerm.toLowerCase())))
                                            {
                                            return data;
                                            }
                                        }).map((data, key) => {

                                          return(  
                                              <tr className="text-sm h-10 border dark:border-slate-600" key={key}>
                                                  <TableData value={data.customerID} />
                                                  <TableData value={data.customerName} />
                                                  <TableData value={data.customerContactNo} />
                                                  <TableData value={data.customerAddress} />
                                                  <TableData value={data.customerDetails.map((data2) => {
                                                    
                                                      return(
                                                        <div>
                                                          {data2.invoiceNo}
                                                        </div>
                                                      )
                                                    })} />
                            
                                                    <td className="text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">
                                                      <Link to={`/CustomerUpdate/${data._id}`}>
                                                        <button
                                                          type="button"
                                                          className="font-bold py-1 px-4 rounded-full mx-3  text-white"
                                                          style={{ background: currentColor }}
                                                        >
                                                          <i className="fas fa-edit" />
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
                                            )
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

export default CustomerViewAll;
