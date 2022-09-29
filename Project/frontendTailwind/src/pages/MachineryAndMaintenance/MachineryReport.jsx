import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from "jspdf";
import { Header } from '../../components';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';


const MachineryReport = () => {

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
    
    const createPDF = () => {
        const date = new Date(Date.now()).toISOString().split('T')[0];
        const pdf = new jsPDF("landscape", "px", "a1",false);
        const data = document.querySelector("#tableContainer");
        pdf.html(data).then(() => {
            pdf.save("MachineryReport-" + date+ ".pdf");
           });
    };

    return (
        <div>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">

                <Header category="Report" title="Machinery" />

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
                            <TableHeader value="Name" />
                            <TableHeader value="Purchased date" />
                            <TableHeader value="Purchased Cost" />
                            <TableHeader value="Salvage value" />
                            <TableHeader value="Useful life" />
                            <TableHeader value="Depreciation" />
                            <TableHeader value="Availibility" />
                            
                            </tr>
                        </thead>

                        <tbody>
                            {machinery.map((data, key) => {
                                return(

                                    TotalDepreciation = TotalDepreciation + parseFloat(parseFloat((data.machineryCost-data.salvage)/data.numberOfYrs).toFixed(2)),
                                    TotalCost = TotalCost + parseFloat(data.machineryCost),
                   
                                    <tr className="text-sm h-10 border dark:border-slate-600" key={key}>
                                         <TableData value={data.machineID} />
                                        <TableData value={data.name} />
                                        <TableData value={data.dateOfPurchased.toString().split('T')[0]} />
                                        <TableData value={data.machineryCost+".00"} />
                                        <TableData value={data.salvage+".00"} />
                                        <TableData value={data.numberOfYrs +"yrs"} />
                                        <TableData value={parseFloat((data.machineryCost-data.salvage)/data.numberOfYrs).toFixed(2)} /> 
                                            <TableData value={data.others} />
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table><br></br>
                    <span className="text-xs font-semibold inline-block py-2 px-2 uppercase rounded text-red-600 bg-white-200 uppercase last:mr-0 mr-1">
            Total Depreciation : {TotalDepreciation.toFixed(2)}
            
          </span><br></br>

          <span className="text-xs font-semibold inline-block py-2 px-2 uppercase rounded text-red-600 bg-white-200 uppercase last:mr-0 mr-1">
            
            TotalCost : {"Rs.  "+TotalCost.toFixed(2)}
          </span>
                </div>
            </div>      
        </div>
    );
}

export default MachineryReport