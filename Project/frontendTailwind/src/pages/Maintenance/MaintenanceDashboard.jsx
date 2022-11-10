import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { VscSymbolProperty } from 'react-icons/vsc';
import { MdOutlineDirectionsBusFilled } from 'react-icons/md';
import { BiBuildingHouse, BiAddToQueue } from 'react-icons/bi';
import { GiSewingMachine } from 'react-icons/gi';
import { GiMoneyStack } from 'react-icons/gi';
import { MdAddBusiness, MdOutlineBusAlert } from 'react-icons/md';
import { DashTopBox, DashTopButton, MaintainChart, ChartsHeader, MaintainBarChart,MaintenanceCost } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';

import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import MachMaintenanceViewAll from './MachMaintenanceViewAll';
import VehiMaintenanceViewAll from './VehiMaintenanceViewAll';



/* IMPORT ALL YOUR IMPORTS AS USUAL ABOVE HERE, REMOVE UNNECESSARY ONES*/

const MaintenanceDashboard = () => { // <== THIS IS THE COMPONENT NAME, CHANGE IT TO YOUR COMPONENT NAME

  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

  const [maintainence, setMaintainence] = useState([]);

  const getMaintainence = async () => {  //getMaintainence is the function to get the data from the backend
    axios.get("http://localhost:8070/maintainence/")
      .then((res) => {
        setMaintainence(res.data); //setMaintainence  is used to update the state variable

      })
      .catch((err) => {
        alert(err.message);
      })
  }

  useEffect(() => {
    getMaintainence(); // <== CHANGE ACCORDING TO YOUR OWN FUNCTIONS, YOU CAN REMOVE THIS LINE IF YOU DON'T NEED IT
    const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  //vehicles
  const [maintainenceVehi, setMaintainenceVehi] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const getVMaintainence = async () => {  //getMaintainence is the function to get the data from the backend
    axios.get("http://localhost:8070/maintainenceVehicle/")
      .then((res) => {
        setMaintainenceVehi(res.data); //setMaintainence  is used to update the state variable

      })
      .catch((err) => {
        alert(err.message);
      })
  }

  useEffect(() => {
    getVMaintainence(); // <== CHANGE ACCORDING TO YOUR OWN FUNCTIONS, YOU CAN REMOVE THIS LINE IF YOU DON'T NEED IT
    const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  //machines
  const [maintainenceMachine, setMaintainenceMachine] = useState([]);

  const getMMaintainence = async () => {  //getMaintainence is the function to get the data from the backend
    axios.get("http://localhost:8070/maintainenceMachine/")
      .then((res) => {
        setMaintainenceMachine(res.data); //setMaintainence  is used to update the state variable

      })
      .catch((err) => {
        alert(err.message);
      })
  }

  useEffect(() => {
    getMMaintainence(); // <== CHANGE ACCORDING TO YOUR OWN FUNCTIONS, YOU CAN REMOVE THIS LINE IF YOU DON'T NEED IT
    const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const maintCount = maintainence.length;
  const vehiMaintCount = maintainenceVehi.length;
  const machineMaintCount = maintainenceMachine.length;
  const maintprog = maintainence.filter((maint) => maint.status === "In progress").length;
  const maintainenceVehip = maintainenceVehi.filter((maint) => maint.status === "In progress").length;
  const maintainenceMachinep = maintainenceMachine.filter((maint) => maint.status === "In progress").length;

  var prototal = 0;
  for (let index = 0; index < maintCount; index++) {
    prototal = prototal + maintainence[index].others;

  }


  var vehitotal = 0;
  for (let index = 0; index < vehiMaintCount; index++) {
    vehitotal = vehitotal + maintainenceVehi[index].others;
  }


  var machtotal = 0;
  for (let index = 0; index < machineMaintCount; index++) {
    machtotal = machtotal + maintainenceMachine[index].others;
  }

  var total = vehitotal + machtotal + prototal;
  total = Math.round(total * 100) / 100;


  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 2,
    currencyDisplay: 'symbol'
  })

  let formatTotal = formatter.format(total);

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


                      <Link to="/MaintenanceViewAll">
                        <DashTopButton value="Property Maintenance" icon={<BiBuildingHouse />} />
                      </Link>
                      <Link to="/MaintenanceCreate">
                        <DashTopButton value="+ Property" icon={<MdAddBusiness />} />
                      </Link>
                      <Link to="/MachMaintenanceViewAll">
                        <DashTopButton value="Machinery Maintenance" icon={<GiSewingMachine />} />
                      </Link>
                      <Link to="/MachMaintenanceNew">
                        <DashTopButton value="+ Machinery" icon={<BiAddToQueue />} />
                      </Link>
                      <Link to="/VehiMaintenanceViewAll">
                        <DashTopButton value="Vehicles Maintenance" icon={<MdOutlineDirectionsBusFilled />} />
                      </Link>
                      <Link to="/VehiMaintenanceNew">
                        <DashTopButton value="+ Vehicle" icon={<MdOutlineBusAlert />} />
                      </Link>
                      {/* <Link to="/MaintainenceTask">
            <DashTopButton value="Tasks For today" />
          </Link> */}
                    </div>
                  </div>


                  <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
                    <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                      {/* small top boxes in the dashboard */} {/* use minimum 3, maximum 5 */}
                      <DashTopBox icon={<VscSymbolProperty />} label="Total Maintenances Records" data={maintprog + machineMaintCount + vehiMaintCount} />
                      <DashTopBox icon={<GiMoneyStack />} label="Total Maintenance Cost" data={formatTotal} />

                    </div>
                  </div>

                  <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
                    <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                      {/* small top boxes in the dashboard */} {/* use minimum 3, maximum 5 */}

                      <Link to="/MaintenanceViewAll">
                      <DashTopBox icon={<BiBuildingHouse />} label="Property Under Maintenance" data={maintprog} />
                      </Link>
                      <Link to="/MachMaintenanceViewAll">
                      <DashTopBox icon={<GiSewingMachine />} label="Machines Under Maintenance" data={maintainenceMachinep} />
                      </Link>
                      <Link to="/VehiMaintenanceViewAll">
                      <DashTopBox icon={<MdOutlineDirectionsBusFilled />} label="Vehicles Under Maintenance" data={maintainenceVehip} />
                      </Link>
                    </div>
                  </div>


                

                  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
                    < MaintainBarChart />
                  </div>
                  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
                    < MaintenanceCost />
                  </div>
                  {/* <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
                    < MaintainChart />
                  </div> */}



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

export default MaintenanceDashboard;
