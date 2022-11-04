import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { VscSymbolProperty } from 'react-icons/vsc';
import { MdOutlineDirectionsBusFilled } from 'react-icons/md';
import { BiBuildingHouse } from 'react-icons/bi';
import { GiSewingMachine } from 'react-icons/gi';
import { GiMoneyStack } from 'react-icons/gi';
import { DashTopBox, DashTopButton, MaintainChart, ChartsHeader } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';

//property

const MaintenanceDashboard = () => {
  const { currentColor, currentMode } = useStateContext();

  const [maintainence, setMaintainence] = useState([]);

  const getMaintainence = async () => {  //getMaintainence is the function to get the data from the backend
    axios.get("http://localhost:8070/maintainence/")
    .then((res) => { 
        setMaintainence (res.data); //setMaintainence  is used to update the state variable
      
    })
    .catch((err) => {
        alert(err.message);
    })
}

useEffect(() => { //useEffect is used to call the function getMaintainence 
    getMaintainence ();
}, [])

//vehicles
const [maintainenceVehi, setMaintainenceVehi] = useState([]);
    
    const [searchTerm, setSearchTerm] = useState("");

  const getVMaintainence = async () => {  //getMaintainence is the function to get the data from the backend
      axios.get("http://localhost:8070/maintainenceVehicle/")
      .then((res) => { 
        setMaintainenceVehi (res.data); //setMaintainence  is used to update the state variable
        
      })
      .catch((err) => {
          alert(err.message);
      })
  }

  useEffect(() => { //useEffect is used to call the function getMaintainence 
      getVMaintainence ();
  }, [])



//machines
  const [maintainenceMachine, setMaintainenceMachine] = useState([]);
   
  const getMMaintainence = async () => {  //getMaintainence is the function to get the data from the backend
      axios.get("http://localhost:8070/maintainenceMachine/")
      .then((res) => { 
        setMaintainenceMachine (res.data); //setMaintainence  is used to update the state variable
        
      })
      .catch((err) => {
          alert(err.message);
      })
  }

  useEffect(() => { //useEffect is used to call the function getMaintainence 
    getMMaintainence ();
  }, [])



const maintCount = maintainence.length;
const vehiMaintCount = maintainenceVehi.length;
const machineMaintCount = maintainenceMachine.length;
const maintprog = maintainence.filter((maint) => maint.status === "In progress").length;
const maintainenceVehip = maintainenceVehi.filter((maint) => maint.status === "In progress").length;
const maintainenceMachinep = maintainenceMachine.filter((maint) => maint.status === "In progress").length;

var prototal = 0;
   for (let index = 0; index < maintCount; index++) {
      prototal = prototal + maintainence[index].totalValue; 
 }


 var vehitotal = 0;
   for (let index = 0; index < vehiMaintCount; index++) {
    vehitotal = vehitotal + maintainenceVehi[index].totalValue; 
 }


 var machtotal = 0;
   for (let index = 0; index < machineMaintCount; index++) {
    machtotal = machtotal + maintainenceMachine[index].totalValue; 
 }

  return (
    <div className="mt-5">

      <div className="flex flex-wrap lg:flex-nowrap justify-left ml-10 mt-5">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* top buttons in the dashboard */} {/* use for navigation buttons*/}
          <Link to="/VehiMaintenanceViewAll">
            <DashTopButton value="Vehicles" />
          </Link>
          <Link to="/MachMaintenanceViewAll">
            <DashTopButton value="Machines" />
          </Link>
          <Link to="/MaintenanceViewAll">
            <DashTopButton value="Property" />
          </Link>
          <Link to="/MachMaintenanceNew">
            <DashTopButton value="Add machinery maintenance" />
          </Link>
          <Link to="/VehiMaintenanceNew">
            <DashTopButton value="Add Vehicle maintenance" />
          </Link>
          <Link to="/MaintenanceCreate">
            <DashTopButton value="Add property maintenance" />
          </Link>
          {/* <Link to="/MaintainenceTask">
            <DashTopButton value="Tasks For today" />
          </Link> */}
        </div>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* small top boxes in the dashboard */} {/* use minimum 3, maximum 5 */}
          <DashTopBox icon={<VscSymbolProperty />} label="Total Maintenances records" data={maintCount+machineMaintCount+vehiMaintCount} />
          <DashTopBox icon={<MdOutlineDirectionsBusFilled />} label="Vehicles under maintenance" data={maintainenceVehip} />
          <DashTopBox icon={<BiBuildingHouse />} label="Property under maintenance" data={maintprog} />
          <DashTopBox icon={<GiSewingMachine />} label="Machines under maintenance" data={maintainenceMachinep} />
          <DashTopBox icon={<GiMoneyStack />} label="Total cost" data={prototal} /> 
               
        </div>
      </div>

      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
          < MaintainChart/>
      </div>

    </div>

  
  );
};

export default MaintenanceDashboard;
