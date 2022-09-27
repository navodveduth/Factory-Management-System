//import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import axios from "axios"
import {useState, useEffect } from "react";
// import "../styles/Shafa/pdf.css"

//import Barcode from "./barcode.png";


function StockPDF  ()  {

    const [stock, setStock] = useState([]); //stock is the state variable and setStock is the function to update the state variable

    const getStock = async () => {  //getStock is the function to get the data from the backend
        axios.get("http://localhost:8070/stock/")
            .then((res) => {
                setStock(res.data); //setStock is used to update the state variable
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    useEffect(() => { //useEffect is used to call the function getStock
        getStock();
    }, [])

    const createPDF = async () => {
        const pdf = new jsPDF("landscape", "px", "a2",false);
        const data = await document.querySelector("#table");
        pdf.html(data).then(() => {
            pdf.save("stocks.pdf");
           });
    };

    /*const createPDF = async () => {   
      const pdf = new jsPDF("portrait", "pt", "a4"); 
      const data = await html2canvas(document.querySelector("#pdf"));
      const img = data.toDataURL("image/png");
      const imgProperties = pdf.getImageProperties(img);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
      pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("shipping_label.pdf");
    };*/

    // const tblStyle = {
    //     width: 1000,
    //     height:400,
    //     marginLeft:100
    // };

    return (
        <>
        <h2 style={{backgroundColor:"lightgray"}}>PREVIEW</h2>
        <button type="button" class="btn btn-secondary" style={{marginLeft:"1000px",marginTop:"10px"}} onClick={createPDF} >
            DOWNLOAD 
        </button>
        <div id="table" className="pdf">
            <h3 style={{position:"center"}}>Stocks Details</h3>
            <table >
                {/* <div > */}
                <thead>
                    <tr>
                        <th scope="col">Code</th>
                        <th scope="col">Name </th>
                        <th scope="col">Category</th>
                        <th scope="col">Last stock updated on </th>
                        <th scope="col">Reorder level</th>
                        <th scope="col">Unit price</th>
                        <th scope="col">Supplier</th>
                        <th scope="col">Total Value</th>
                        <th scope="col">Availability</th>
                    </tr>
                </thead>
                <tbody>
                    {stock.map((data) => {
                        const date = new Date(data.lastUpdated).toLocaleDateString();

                        return (
                            <tr>
                                <td>{data.stockCode}</td>
                                <td>{data.stockName}</td>
                                <td>{data.stockCategory}</td>
                                <td>{date}</td>
                                <td>{data.reorderLevel}</td>
                                <td>{data.unitPrice}</td>
                                <td>{data.supplier}</td>
                                <td>{data.totalValue}</td>
                                <td>{data.sufficientStock}</td>
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

export default StockPDF;