//import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import axios from "axios"
import {useState, useEffect } from "react";


//import Barcode from "./barcode.png";


function MachineryReport  ()  {

    const [machinery, setMachinery] = useState([]); //stock is the state variable and setStock is the function to update the state variable
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

    const createPDF = async () => {
        const pdf = new jsPDF("landscape", "px", "a2",false);
        const data = await document.querySelector("#table");
        pdf.html(data).then(() => {
            pdf.save("Machinery_dets.pdf");
           });
    };

    

    return (
        <>
        <h2>PREVIEW</h2>
        <button type="button" class="btn btn-secondary" style={{marginLeft:"1000px",marginTop:"10px"}} onClick={createPDF} >
            DOWNLOAD 
        </button>
        <div id="table" className='MachUpdateFormContainer' >
            <h3 style={{position:"center"}}>Machinery Details</h3>
            <table className="table table-striped table-hover"  >
                {/* <div > */}
                <thead>
                    <tr>
                    <th scope="col" >ID</th>
                <th scope="col">Name and model</th>
                <th scope="col">Purchased date</th>
                <th scope="col">Cost of the machine</th>
                <th scope="col">Estimated Salvage value</th>
                <th scope="col">Estimated useful life</th>
                <th scope="col">Depreciation</th>
                <th scope="col">Availibility</th>
                    </tr>
                </thead>
                <tbody>
                    {machinery.map((data) => {
                        const purchasedDate = new Date(data.dateOfPurchased ).toLocaleDateString();
                        const  depreciation = parseFloat((data.machineryCost-data.salvage)/data.numberOfYrs).toFixed(2);
                        TotalDepreciation = TotalDepreciation + parseFloat(depreciation);
                        TotalCost = TotalCost + parseFloat(data.machineryCost);

                        return (
                            <tr>
                            <td>{ data.machineID}</td>
                            <td>{ data.name}</td>
                            <td>{purchasedDate}</td>
                            <td>{data.machineryCost+".00"}</td>
                            <td>{data.salvage+".00"}</td>
                            <td>{data.numberOfYrs}</td>
                            <td>{depreciation+"%"}</td>
                            <td>{data.others}</td>
                            </tr>
                        )
                    })}
                </tbody>
                {/* </div> */}
            </table>
            <div style={{marginLeft:"80%", marginTop:"3%"}}>
            <h5 style={{color: "#FF3300"}}>Total depreciation : {TotalDepreciation+"%"}</h5>
            <h5 style={{color: "#FF3300"}}>Total Cost : {TotalCost+".00"}</h5>
        </div>
            </div>     
        </>
    );

};

export default MachineryReport;