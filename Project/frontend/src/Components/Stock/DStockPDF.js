//import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import axios from "axios"
import {useState, useEffect } from "react";
// import "../styles/Shafa/pdf.css"

//import Barcode from "./barcode.png";


function DStockPDF  ()  {

    const [damagedStock, setDamagedStock] = useState([]); //damaged stock is the state variable and setDamagedStock is the function to update the state variable

    const getdamagedStock = async () => {  //getdamagedStock is the function to get the data from the backend
        axios.get("http://localhost:8070/damagedStock/")
            .then((res) => {
                setDamagedStock(res.data); //setStock is used to update the state variable
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    useEffect(() => { //useEffect is used to call the function getdamagedStock
        getdamagedStock();
    }, [])

    const createPDF = async () => {
        const pdf = new jsPDF("landscape", "px", "a2",false);
        const data = await document.querySelector("#table");
        pdf.html(data).then(() => {
            pdf.save("damaged_Stocks.pdf");
           });
    };

    return (
        <>
        <h2 style={{backgroundColor:"lightgray"}}>PREVIEW</h2>
        <button type="button" class="btn btn-secondary" style={{marginLeft:"1000px",marginTop:"10px"}} onClick={createPDF} >
            DOWNLOAD 
        </button>
        <div id="table" className="pdf">
            <h3 style={{position:"center"}}>Damaged Stocks Details</h3>
            <table >
                {/* <div > */}
                <thead>
                    <tr>
                    <th scope="col">Code</th>
                        <th scope="col">Name </th>
                        <th scope="col">Category</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Last updated on</th>
                        <th scope="col">Unit price</th>
                        <th scope="col">Total value</th>
                        <th scope="col">Usability</th>
                    </tr>
                </thead>
                <tbody>
                    {damagedStock.map((data) => {
                        const date = new Date(data.lastUpdated).toLocaleDateString();

                        return (
                            <tr>
                                <td>{data.stockCode}</td>
                                <td>{data.damagedStockName}</td>
                                <td>{data.damagedStockCategory}</td>
                                <td>{data.quantity}</td>
                                <td>{date}</td>
                                <td>{data.value}</td>
                                <td>{data.totalValue}</td>
                                <td>{data.usability}</td>
                            </tr>
                        )
                    })}
                </tbody>
                {/* </div> */}
            </table>
            </div>     
        </>
    );

};

export default DStockPDF;