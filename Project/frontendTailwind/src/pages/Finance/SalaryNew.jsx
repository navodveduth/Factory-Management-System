import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useStateContext } from '../../contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';
import { Header, Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

function SalaryCreateForm() {
  const navigate = useNavigate(); //useNavigate hook to redirect to another page after form submission is successful 
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

  const [employeeNumber, setEmpNumber] = useState('');
  const [employeeBasicSalary, setEmpBasic] = useState('');
  const [employeeAllowance, setEmpAllowance] = useState('');
  const [employeeIncentive, setEmpIncentive] = useState('');

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
                          {/* YOUR COMPONENT IMPLEMENTATION GOES HERE */}
                          <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
                          <Header category="Form" title=" New Salary Entry" />
                          <div className=" flex items-center justify-center "> 
                          <form onSubmit={async(e)=>{
                              e.preventDefault();
                              
                              const newSalary = {
                                employeeNumber,
                                employeeBasicSalary,
                                employeeAllowance,
                                employeeIncentive,
                              }

                              await axios.post("http://localhost:8070/salary/SalaryNew", newSalary)
                                  .then((res)=>{
                                      alert("Data saved successfully");
                                        
                                  navigate('/SalaryViewAll');
                                  })
                                  .catch((err)=>{
                                      console.log(err);
                                      alert("Error occured");
                                  })
                                  
                              
                          }}>

                            <div className="mb-3">
                              <label for="employeeNumber" className="form-label">Employee Number : </label>
                              <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                              id="employeeNumber" placeholder="Enter the Employee Number" title="Employee ID must be a 4 Digit Numeric value" pattern="[0-9]{4}" required 
                              onChange={(e)=>{
                                setEmpNumber(e.target.value);
                              }}/>
                            </div>

                            <div className="mb-3">
                              <label for="employeeBasicSalary" className="form-label">Basic Salary : </label>
                              <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                              id="employeeBasicSalary" placeholder="Enter a Basic Salary" min="1" title="Please enter a valid amount" required 
                              onChange={(e)=>{
                                setEmpBasic(e.target.value);
                              }}/>
                            </div>

                            <div className="mb-3">
                              <label for="employeeAllowance" className="form-label">Allowance : </label>
                              <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                              id="employeeAllowance" placeholder="Enter the Allowance" min="1" title="Please enter a valid amount" required 
                              onChange={(e) =>{
                                setEmpAllowance(e.target.value);
                              }}/>
                            </div>

                            <div className="mb-3">
                              <label for="employeeIncentive" className="form-label">Incentive : </label>
                              <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                              id="employeeIncentive" placeholder="Enter the Incentive" min="1" title="Please enter a valid amount"  required 
                              onChange={(e) =>{
                                setEmpIncentive(e.target.value);
                              }}/>

                            </div>
                            <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Submit Salary</button>
                          </form>
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
}
  export default SalaryCreateForm;