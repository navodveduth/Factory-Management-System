import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Header } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider.js';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';

const MaintenanceViewAll = () => {
    const [maintainence, setMaintainence] = useState([]);
    const { currentColor } = useStateContext();


  var TotalCost = 0;
  

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

  const deleteMaintainence  = async (id) => {
      await axios.delete(`http://localhost:8070/maintainence/delete/${id}`)
      .then((res) => {
          alert("Data deleted successfully");
          getMaintainence ();
      })
      .catch((err) => {
          alert(err.message);
      })
  }

  
  
  return (
    <div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
        <Header category="Table" title="Maintenance Details" />
        <div className="block w-full overflow-x-auto rounded-lg">
          <table className="w-full rounded-lg" >
            <thead>
              <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                <TableHeader value="Type" />
                <TableHeader value="Name" />
                <TableHeader value="Service task & Shedule" />
                <TableHeader value="Last Maintained Date" />
                <TableHeader value="Next due" />
                <TableHeader value="Total Cost" />
                <TableHeader value="Status" />
                <TableHeader value="Manage" />
              </tr>
            </thead>
            <tbody>
              {maintainence.map((data) => (

                    // const LMdate = new Date(data.lastMaintainedDate).toLocaleDateString();
                    // const NSdate = new Date(data.nextServiceDate).toLocaleDateString();
                // TotalCost = TotalCost + data.others;
                

                <tr className="text-sm h-10 border dark:border-slate-600">


                  <TableData value={data.Type} />
                  <TableData value={data.name} />
                  <TableData value={data.Description} />
                  <TableData value={data.lastMaintainedDate.toString().split('T')[0]} />
                  <TableData value={data.nextServiceDate.toString().split('T')[0]} />
                    <TableData value={data.others} />
                    <TableData value={data.status} />

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
                        deleteMaintainence(data._id);
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
  );
};

export default MaintenanceViewAll;
