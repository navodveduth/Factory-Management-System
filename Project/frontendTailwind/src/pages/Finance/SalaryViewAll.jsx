import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';

import Swal from 'sweetalert2';
import { useStateContext } from '../../contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';
import { Header, Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

const FinanceViewAll = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

  const [Salary, setSalary] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");  

  const getSalary = async () => {
    axios
      .get('http://localhost:8070/salary/SalaryView')
      .then((res) => {
        setSalary(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getSalary();
    const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const deleteFinance = async (id) => {
    await axios
      .delete(`http://localhost:8070/salary/deleteSalary/${id}`)
      .then((res) => {
        getSalary();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const confirmFunc = (id)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      color: '#f8f9fa',
      background: '#6c757d',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFinance(id);
        Swal.fire({  
          icon: 'success',
          title: 'Data Successfully Deleted',
          color: '#f8f9fa',
          background: '#6c757d',
          showConfirmButton: false,
          timer: 2000
        })
      }else {
        navigate('/SalaryViewAll');
      }
    })
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
                            {/* YOUR COMPONENT IMPLEMENTATION GOES HERE */}
                            <div>
                              <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">

                                <Header category="Table" title="Salary List" />

                                <div className=" flex items-center mb-5 ">
                                  <div>
                                    <input type="text" className=" block w-400 rounded-md bg-gray-100 focus:bg-white dark:text-black" placeholder="Search Here" 
                                    onChange={(e) => {
                                      setSearchTerm(e.target.value);
                                    }} />
                                  </div>
                                  <div className="mr-0 ml-auto">
                                    <Link to={"/SalaryPreview"}> {/* change this link your preview page */}
                                      <button type="button"  className="py-1 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" >Generate Report</button>
                                    </Link>
                                  </div>

                                  </div>

                                <div className="block w-full overflow-x-auto rounded-lg">
                                  <table className="w-full rounded-lg">
                                    <thead>
                                      <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                                        <TableHeader value="Emp. ID" />
                                        <TableHeader value="Emp. Name" />
                                        <TableHeader value="Designation" />
                                        <TableHeader value="Basic Salary" />
                                        <TableHeader value="Allowance" />
                                        <TableHeader value="Incentives" />
                                        <TableHeader value="Nett Salary" />
                                        <TableHeader value="Modify" />
                                      </tr>
                                    </thead>
                                    <tbody>
                                    {Salary.filter((data) => {
                                            if(searchTerm == ""){
                                                return data;
                                            }else if((data.employeeNumber.toString().toLowerCase().includes(searchTerm.toLowerCase()))||
                                            (data.employeeInfo.employeeNameWithInitials.toString().toLowerCase().includes(searchTerm.toLowerCase()))||
                                            (data.employeeInfo.employeeDesignation.toString().toLowerCase().includes(searchTerm.toLowerCase()))){
                                                return data;
                                            }
                                        }).map((data) => (
                                        <tr className="text-sm h-10 border dark:border-slate-600">

                                            <TableData value={data.employeeNumber}/>
                                            <TableData value={data.employeeInfo.employeeNameWithInitials}/>
                                            <TableData value={data.employeeInfo.employeeDesignation}/>
                                            <TableData value={formatter.format(data.employeeBasicSalary)} />
                                            <TableData value={formatter.format(data.employeeAllowance)} />
                                            <TableData value={formatter.format(data.employeeIncentive)} />
                                            <TableData value={formatter.format(data.employeeIncentive + data.employeeAllowance + data.employeeBasicSalary)}/>

                                          <td className="text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">
                                            <Link to={`/SalaryUpdate/${data._id}`}>
                                              <button
                                                type="button"
                                                className="font-bold py-1 px-4 rounded-full mx-3 text-white"
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
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                            {/* PART AFTER THE RETURN STATEMENT */}
                            
                        </div>
                        <Footer />
                    </div>  
                </div>
            </div>
        </div>
    </div>
  );
};

export default FinanceViewAll;
