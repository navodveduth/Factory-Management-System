import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GiSewingMachine } from 'react-icons/gi';
import { GiMoneyStack } from 'react-icons/gi';
import { FaChartBar } from 'react-icons/fa';
import {BiAddToQueue} from 'react-icons/bi';
import { DashTopBox, DashTopButton, MachineryPieChart, ChartsHeader } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';

import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';



/* IMPORT ALL YOUR IMPORTS AS USUAL ABOVE HERE, REMOVE UNNECESSARY ONES*/

const MachineryDashboard = () => { // <== THIS IS THE COMPONENT NAME, CHANGE IT TO YOUR COMPONENT NAME

  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();


  const [machinery, setMachinery] = useState([]);

    const getMachinery = async () => {  //getMachinery is the function to get the data from the backend
        axios.get("http://localhost:8070/machinery/")
        .then((res) => { 
            setMachinery(res.data); //setMachinery is used to update the state variable
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

  const machCount = machinery.length;
    const machAvailable = machinery.filter((mach) => mach.others === "Available").length;
   
    var prototal = 0;
    for (let index = 0; index < machCount; index++) {
       prototal = prototal +(machinery[index].machineryCost-machinery[index].salvage)/machinery[index].numberOfYrs;
       prototal = Math.round(prototal * 100) / 100;

       
  }

  var total = 0;
    for (let index = 0; index < machCount; index++) {
      total = total + machinery[index].machineryCost;
      total = Math.round(total * 100) / 100;

       
  }

  var  rate = prototal/total*100;
  rate = Math.round(rate * 100) / 100;

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
                            <div className="mt-5">

      <div className="flex flex-wrap lg:flex-nowrap justify-left ml-5 mt-5">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* top buttons in the dashboard */} {/* use for navigation buttons*/}
          <Link to="/MachineryViewAll">
            <DashTopButton value="All Machines" icon={<GiSewingMachine/>}/>
          </Link>
          <Link to="/MachineryCreate">
            <DashTopButton value="New Machinary" icon={<BiAddToQueue/>} />
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* small top boxes in the dashboard */} {/* use minimum 3, maximum 5 */}
  
          <DashTopBox icon={<GiSewingMachine />} label="Total Machines" data={machCount} />
          <DashTopBox icon={<GiSewingMachine />} label="Avalable Machines" data={machAvailable} /> 
        </div>
        
      </div>


      <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
        
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* small top boxes in the dashboard */} {/* use minimum 3, maximum 5 */}
  
         
          <DashTopBox icon={<GiMoneyStack />} label="Total Machiery purchase Cost          " data={"Rs." + total+".00"} />
          <DashTopBox icon={<GiMoneyStack />} label="Total Machinery Depreciation " data={"Rs." + prototal} />
          <DashTopBox icon={<FaChartBar />} label="Average Depreciation rate" data={rate + " %"} />  
          
        </div>
      </div>








    
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
          <MachineryPieChart />
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

export default MachineryDashboard;
