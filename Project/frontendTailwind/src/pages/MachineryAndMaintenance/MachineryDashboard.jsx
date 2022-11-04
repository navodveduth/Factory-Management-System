import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GiSewingMachine } from 'react-icons/gi';
import { GiMoneyStack } from 'react-icons/gi';
import { FaChartBar } from 'react-icons/fa';
import { useStateContext } from '../../contexts/ContextProvider';
import { DashTopBox, DashTopButton, MachineryPieChart, ChartsHeader } from '../../components';


const MachineryDashboard = () => {
  const { currentColor, currentMode } = useStateContext();

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
    
    useEffect(() => { //useEffect is used to call the function getMachinery
        getMachinery();
    }, [])

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
    <div className="mt-5">

      <div className="flex flex-wrap lg:flex-nowrap justify-left ml-10 mt-5">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* top buttons in the dashboard */} {/* use for navigation buttons*/}
          <Link to="/MachineryViewAll">
            <DashTopButton value="View All Machines" />
          </Link>
          <Link to="/MachineryCreate">
            <DashTopButton value="Add new Machine" />
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
  
          <DashTopBox icon={<GiMoneyStack />} label="Total Depreciation" data={"Rs. " + prototal} />
          <DashTopBox icon={<GiMoneyStack />} label="Total Machiery Cost" data={"Rs. " + total+".00"} />
          <DashTopBox icon={<FaChartBar />} label="Average Depreciation rate" data={rate + " %"} />  
          
        </div>
      </div>








    
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
          <MachineryPieChart />
      </div>
    </div>
  );
};

export default MachineryDashboard;

