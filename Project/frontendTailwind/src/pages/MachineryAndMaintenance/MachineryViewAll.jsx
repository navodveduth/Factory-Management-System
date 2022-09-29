import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Header } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider.js';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';

const MachineryViewAll = () => {
  const { currentColor } = useStateContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [machinery, setMachinery] = useState([]);

   var TotalDepreciation = 0;
    var TotalCost = 0;

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

const deleteMachinery = async (id) => {
    await axios.delete(`http://localhost:8070/machinery/delete/${id}`)
    .then((res) => {
        alert("Data deleted successfully");
        getMachinery();
    })
    .catch((err) => {
        alert(err.message);
    })
}

  return (
    <div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
        <Header category="Table" title="Machinery Details" />

        <div className=" flex items-center mb-5 ">
          <div>
            <input type="text" className=" block w-400 rounded-md bg-gray-100 focus:bg-white dark:text-black" placeholder="Search Here" 
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }} />
          </div>
          <div className="mr-0 ml-auto">
            <Link to={"/MachineryReport"}> {/* change this link your preview page */}
              <button type="button"  className="py-1 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" >Generate Report</button>
            </Link>
          </div>

          </div>







        <div className="block w-full overflow-x-auto rounded-lg">
          <table className="w-full rounded-lg" >
            <thead>
              <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                <TableHeader value="ID" />
                <TableHeader value="Name" />
                <TableHeader value="Purchased date" />
                <TableHeader value="Purchased Cost" />
                {/* <TableHeader value="Salvage value" />
                <TableHeader value="Useful life" /> */}
                <TableHeader value="Depreciation" />
                <TableHeader value="Availibility" />
                <TableHeader value="Manage" />
              </tr>
            </thead>
            <tbody>
              {machinery.filter((data) => {
                    if(searchTerm == ""){
                        return data;
                    }else if((data.machineID.toLowerCase().toLowerCase().includes(searchTerm.toLowerCase())) ||
                      (data.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                      (data.others.toLowerCase().includes(searchTerm.toLowerCase())))
      
                      {
                      return data;
                      }
                  }).map((data, key) => {

                    return(

                // const purchasedDate = new Date(data.dateOfPurchased ).toLocaleDateString();
                TotalDepreciation = TotalDepreciation + parseFloat(parseFloat((data.machineryCost-data.salvage)/data.numberOfYrs).toFixed(2)),
                 TotalCost = TotalCost + parseFloat(data.machineryCost),


                <tr className="text-sm h-10 border dark:border-slate-600">
                  <TableData value={data.machineID} />
                  <TableData value={data.name} />
                  <TableData value={data.dateOfPurchased.toString().split('T')[0]} />
                  <TableData value={data.machineryCost+".00"} />
                  {/* <TableData value={data.salvage+".00"} />
                  <TableData value={data.numberOfYrs +"yrs"} /> */}
                  <TableData value={parseFloat((data.machineryCost-data.salvage)/data.numberOfYrs).toFixed(2)} /> 
                    <TableData value={data.others} />
                    

                  <td className="text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">
                  <Link to={`/MachineryUpdate/${data._id}`}>
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
                        deleteMachinery(data._id);
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
            Total Depreciation : {TotalDepreciation.toFixed(2)}
            
          </span><br></br>

          <span className="text-xs font-semibold inline-block py-2 px-2 uppercase rounded text-red-600 bg-white-200 uppercase last:mr-0 mr-1">
            
            TotalCost : {"Rs  "+TotalCost.toFixed(2)}
          </span>
                
        </div>
      </div>


      
    </div>


  );
};

export default MachineryViewAll;
