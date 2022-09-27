//import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import axios from "axios"
import {useState, useEffect } from "react";


//import Barcode from "./barcode.png";


function MaintaenanceReport  ()  {

    const [maintainence, setMaintainence] = useState([]); //stock is the state variable and setStock is the function to update the state variable
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

    const createPDF = async () => {
        const pdf = new jsPDF("landscape", "px", "a2",false);
        const data = await document.querySelector("#table");
        pdf.html(data).then(() => {
            pdf.save("Maintenance_dets.pdf");
           });
    };

    

    return (
        <>
        <h2>PREVIEW</h2>
        <button type="button" class="btn btn-secondary" style={{marginLeft:"1000px",marginTop:"10px"}} onClick={createPDF} >
            DOWNLOAD 
        </button>
        <div id="table" className="pdf">
            <h3 style={{position:"center"}}>Maintainence Details</h3>
            <table className="table table-striped table-hover"  >
                {/* <div > */}
                <thead>
                    <tr>
                    <th scope="col">Type</th>
                <th scope="col">Name</th>
                <th scope="col">Service task & Shedule</th>
                <th scope="col">Last Maintained Date</th>
                <th scope="col">Next due</th>
                <th scope="col">Total Cost</th>
                <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {maintainence.map((data) => {
                        const LMdate = new Date(data.lastMaintainedDate).toLocaleDateString();
                        const NSdate = new Date(data.nextServiceDate).toLocaleDateString();
                        TotalCost = TotalCost + data.others;

                        return (
                            <tr>
                            <td>{ data.Type}</td>
                            <td>{ data.name}</td>
                            <td>{data.Description}</td>
                            <td>{LMdate}</td>
                            <td>{NSdate}</td>
                            <td>{data.others+".00"}</td>
                            <td>{data.status}</td>
                            </tr>
                        )
                    })}
                </tbody>
                {/* </div> */}
            </table>
            <div style={{marginLeft:"80%", marginTop:"3%"}}>
        <h5 style={{color: "#FF3300"}}>Total Cost : {TotalCost+".00"}</h5>
        </div>
            </div>     
        </>
    );

};

export default MaintaenanceReport;