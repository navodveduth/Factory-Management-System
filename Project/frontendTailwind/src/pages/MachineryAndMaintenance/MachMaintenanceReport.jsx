import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from "jspdf";
import { Header } from '../../components';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';


const MachMaintenanceReport = () => {

    const [maintainenceMachine, setMaintainenceMachine] = useState([]);
    var TotalCost = 0;

    const getMaintainence = async () => {  //getMaintainence is the function to get the data from the backend
        axios.get("http://localhost:8070/maintainenceMachine/")
        .then((res) => { 
          setMaintainenceMachine (res.data); //setMaintainence  is used to update the state variable
          
        })
        .catch((err) => {
            alert(err.message);
        })
    }
  
    useEffect(() => { //useEffect is used to call the function getMaintainence 
        getMaintainence ();
    }, [])
    
    const createPDF = () => {
        const date = new Date(Date.now()).toISOString().split('T')[0];
        const pdf = new jsPDF("landscape", "px", "a1",false);
        const data = document.querySelector("#tableContainer");
        pdf.html(data).then(() => {
            pdf.save("Machinery-Maintenance-Report-" +date + ".pdf");
           });
    };

    return (
        <div>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">

                <Header category="Report" title="Machinery Maintainenece" />

                <div className=" flex items-center mb-5 ">
                    <div className="mr-0 ml-auto">
                        <button onClick={createPDF} type="button"  className="py-1 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" >Download</button>
                    </div>
                </div>

                <div className="block w-full overflow-x-auto rounded-lg" id="tableContainer">
                    <table className="w-full rounded-lg">
                        <thead>
                            <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                            <TableHeader value="ID" />
                            <TableHeader value="Item" />
                            <TableHeader value="Repair needed" />
                            <TableHeader value="Last Maintained Date" />
                            <TableHeader value="Next due" />
                            <TableHeader value="Repair company" />
                            <TableHeader value="R.C ContactNO" />
                            <TableHeader value="Status" />
                            <TableHeader value="Total Cost" />
                                        
                            </tr>
                        </thead>

                        <tbody>
                            {maintainenceMachine.map((data, key) => {

                                    var datacolor = "text-black";
                                    if (data.status === "In progress") {
                                      datacolor = "text-red-600 font-bold";

                                    } else {
                                      datacolor = "text-green-500 font-bold";
                                    }
                                return(
                                    TotalCost = TotalCost + data.others,
                                    <tr className="text-sm h-10 border dark:border-slate-600" key={key}>
                                        <TableData value={data.machineDetails.map((data1)=>{
                                              return(
                                                  <div>
                                                      <TableData value={data1.machineID} />
                                                  </div>
                                              )
                                            })} />
                                            <TableData value={data.machineDetails.map((data1)=>{
                                              return(
                                                  <div>
                                                      <TableData value={data1.name} />
                                                  </div>
                                              )
                                            })} />
                                            <TableData value={data.Description} />
                                            <TableData value={data.lastMaintainedDate.toString().split('T')[0]} />
                                            <TableData value={data.nextServiceDate.toString().split('T')[0]} />
                                            <TableData value={data.Location} />
                                              <TableData value={data.contactNo} />
                                              
                                              
                                              
                                              <td className={`${datacolor} text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3`}>{data.status} </td>
                                              <TableData value={data.others} />
                   
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table><br></br><br></br>
          <span className="text-xs font-semibold inline-block py-2 px-2 uppercase rounded text-red-600 bg-white-200 uppercase last:mr-0 mr-1">
            Total Cost of Machinery Maintenance : {"Rs.  "+TotalCost.toFixed(2)}
            
          </span>
                </div>
            </div>      
        </div>
    );
}

export default MachMaintenanceReport