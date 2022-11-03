import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GrVmMaintenance } from 'react-icons/gr';
import { DashTopBox, DashTopButton, MaintainChart, ChartsHeader } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';



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

const maintCount = maintainence.length;
const maintprog = maintainence.filter((maint) => maint.status === "In progress").length;
const maintcomp = maintainence.filter((maint) => maint.status === "Completed").length;



  return (
    <div className="mt-5">

      <div className="flex flex-wrap lg:flex-nowrap justify-left ml-10 mt-5">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* top buttons in the dashboard */} {/* use for navigation buttons*/}
          <Link to="/VehiMaintenancViewAll">
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
          <DashTopBox icon={<GrVmMaintenance />} label="Maintenances records" data={maintCount} />
          <DashTopBox icon={<GrVmMaintenance />} label="Completed Maintenances" data={maintcomp} />
          <DashTopBox icon={<GrVmMaintenance />} label="Maintenances in progress" data={maintprog} />      
        </div>
      </div>

      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
          < MaintainChart/>
      </div>

    </div>

  
  );
};

export default MaintenanceDashboard;
