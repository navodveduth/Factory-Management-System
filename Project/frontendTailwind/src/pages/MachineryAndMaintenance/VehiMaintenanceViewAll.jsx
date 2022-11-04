import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Header } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider.js';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';

const VehiMaintenanceViewAll = () => {
    const [maintainenceVehi, setMaintainenceVehi] = useState([]);
    const { currentColor } = useStateContext();
    const [searchTerm, setSearchTerm] = useState("");


  var TotalCost = 0;
  

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

  const deleteVMaintainence  = async (id) => {
      await axios.delete(`http://localhost:8070/maintainenceVehicle/delete/${id}`)
      .then((res) => {
          alert("Data deleted successfully");
          getVMaintainence ();
      })
      .catch((err) => {
          alert(err.message);
      })
  }

  const confirmFunc = (id)=>{

		if (confirm("Do you want to delete?") == true) {
            deleteVMaintainence(id);
		} else {
			navigate('/VehiMaintenanceViewAll');
		}

    }
  
  return (
    <div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
        <Header category="Table" title="Vehicle Maintenance " />

        <div className=" flex items-center mb-5 ">
          <div>
            <input type="text" className=" block w-400 rounded-md bg-gray-100 focus:bg-white dark:text-black" placeholder="Search Here" 
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }} />
          </div>
          <div className="mr-0 ml-auto">
            <Link to={"/MaintainenceReport"}> {/* change this link your preview page */}
              <button type="button"  className="py-1 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" >Generate Report</button>
            </Link>
          </div>

          </div>



        <div className="block w-full overflow-x-auto rounded-lg">
          <table className="w-full rounded-lg" >
            <thead>
              <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                <TableHeader value="vehicle No" />
                <TableHeader value="Vehicle model" />
                <TableHeader value="Mileage at service" />
                <TableHeader value="Service schedule" />
                <TableHeader value="Last Maintained Date" />
                <TableHeader value="Next Service Date" />
                <TableHeader value="performed By" />
                <TableHeader value="status" />
                <TableHeader value="Total Cost" />
                <TableHeader value="Manage" />
              </tr>
            </thead>
            <tbody>
              {maintainenceVehi.filter((data) => {
                    if(searchTerm == ""){
                        return data;
                    }else if((data.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase())) ||
                      (data.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                      (data.Description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        (data.performedBy.toLowerCase().includes(searchTerm.toLowerCase())) ||
                      (data.status.toLowerCase().includes(searchTerm.toLowerCase())))
                      
                      {
                      return data;
                      }
                  }).map((data, key) => {

                    var datacolor = "text-black";
                    if (data.status === "In progress") {
                      datacolor = "text-red-600 font-bold";

                    } else {
                      datacolor = "text-green-500 font-bold";
                    }
                  
                  return (

                    // const LMdate = new Date(data.lastMaintainedDate).toLocaleDateString();
                    // const NSdate = new Date(data.nextServiceDate).toLocaleDateString();
                TotalCost = TotalCost + data.others,
                

                <tr className="text-sm h-10 border dark:border-slate-600" key={key}>


                  <TableData value={data.vehicleDetails.map((data2)=>{
                        return(
                            <div>
                                <TableData value={data2.vehicleNo} />
                            </div>
                        )

                  })} />
                  <TableData value={data.vehicleDetails.map((data2)=>{
                    return(
                        <div>
                            <TableData value={data2.vehicleModel} />
                        </div>
                    )
                  })} />
                  <TableData value={data.mileage}/>
                  <TableData value={data.Description} />
                  <TableData value={data.lastMaintainedDate.toString().split('T')[0]} />
                  <TableData value={data.nextServiceDate.toString().split('T')[0]} />
                  <TableData value={data.performedBy} />
                    
                    <td className={`${datacolor} text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3`}>{data.status} </td>
                    <TableData value={data.others} />
                    
                  
                  <td className="text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">
                   
                  <Link to={`/MaintenanceUpdate/${data._id}`}>
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
                    )
                    })}
            </tbody>
          </table><br></br><br></br>
          <span className="text-xs font-semibold inline-block py-2 px-2 uppercase rounded text-red-600 bg-white-200 uppercase last:mr-0 mr-1">
            Total Cost of Maintenance : {"Rs.  "+TotalCost.toFixed(2)}
            
          </span>

        </div>
      </div>
    </div>
  );
};

export default VehiMaintenanceViewAll;