import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';

import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';



/* IMPORT ALL YOUR IMPORTS AS USUAL ABOVE HERE, REMOVE UNNECESSARY ONES*/

function MachineryUpdate() { // <== THIS IS THE COMPONENT NAME, CHANGE IT TO YOUR COMPONENT NAME

  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

  const navigate = useNavigate();

  const [machineID, setMachineID] = useState("");
  const [name, setName] = useState('');
  const [dateOfPurchased, setPurchasedDate] = useState('');
  const [machineryCost, setMachineryCosts] = useState('');
  const [salvage, setSalvage] = useState('');
  const [numberOfYrs, setNumberOfYrs] = useState('');
  const [others, setOthers] = useState('');

  const {id} = useParams(); //get the id from the url

  const getMachinery = () => {
      axios.get(`http://localhost:8070/machinery/${id}`)//get the data from the backend
      .then((res) => {
          const dateOfPurchased = new Date(res.data.dateOfPurchased).toISOString().split('T')[0];
          
          setMachineID(res.data.machineID);
          setName(res.data.name);
          setPurchasedDate(dateOfPurchased);
          setMachineryCosts(res.data.machineryCost);
          setSalvage(res.data.salvage);
          setNumberOfYrs(res.data.numberOfYrs);
          setOthers(res.data.others);
      })
      .catch((err) => {
          alert(err.message);
      })
  }


  useEffect(() => {
    getMachinery(); // <== CHANGE ACCORDING TO YOUR OWN FUNCTIONS, YOU CAN REMOVE THIS LINE IF YOU DON'T NEED IT
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
                            {/* COPY YOUR ORIGINAL COMPONENT CODE HERE */}
                            {/* PART AFTER THE RETURN STATEMENT */}
                            <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white '>
        <Header category="Form" title="Update Machinery" />
                <div className=" flex items-center justify-center">

                    <form className="" onSubmit={async(e)=>{
                        e.preventDefault();
                        
                        
                        const newMachine = {
                            machineID,
                            name,     
                            dateOfPurchased,
                            machineryCost,
                            salvage,
                            numberOfYrs,
                            others
                        }

                        await axios.put("http://localhost:8070/machinery/update/"+ id, newMachine)
                        .then((res)=>{
                            alert("Data updated successfully");
                            //navigate to the machinery view page
                        navigate('/MachineryViewAll');
                        })
                        .catch((err)=>{
                            console.log(err);
                            alert("Error occured");
                        })
                            
                    }}>

                        <div className="mb-3">
                            <label htmlFor="employeeNumber" className="text-md">Machine ID : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeNumber" defaultValue={machineID} placeholder="Enter the Machine ID" required 
                                onChange={(e)=>{
                                    setMachineID(e.target.value);
                                }}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="employeeFullName" className="form-label">Name and Model : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeFullName" defaultValue={name} placeholder="Enter the Machine name and model" required 
                                onChange={(e)=>{
                                    setName(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="employeeNameWithInitials" className="form-label">Purchased date : </label>
                            <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeNameWithInitials" defaultValue={dateOfPurchased} placeholder="Enter the date of purchased" required 
                                onChange={(e) =>{
                                    setPurchasedDate(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="employeeNIC" className="form-label">Machinery Cost: </label>
                            <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeNIC" defaultValue={machineryCost} placeholder="Enter the machinery cost" required 
                                onChange={(e) =>{
                                    setMachineryCosts(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="employeeDOB" className="form-label">Estimated Salvage value : </label>
                            <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeDOB" defaultValue={salvage} placeholder="Enter the estiamted salvage value"required 
                                onChange={(e) =>{
                                    setSalvage(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="employeeDOB" className="form-label">Estimated life years : </label>
                            <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeDOB" defaultValue={numberOfYrs} placeholder="Enter the estimated life years"required 
                                onChange={(e) =>{
                                    setNumberOfYrs(e.target.value);
                                }}/>
                        </div>

                      

                        <div className="mb-3">
                            <label for="employeeType" className="form-label">Availibility : </label>
                            <select class="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                            id="employeeType" aria-label="Default select example" defaultValue={others} required
                            onChange={(e) =>{
                                setOthers(e.target.value);
                            }}>
                                <option value="Available">Available</option>
                                <option value="Unavailable">Unavailable</option>
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

export default MachineryUpdate;
