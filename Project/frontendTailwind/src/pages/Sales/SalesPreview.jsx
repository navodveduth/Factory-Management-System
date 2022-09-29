import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {jsPDF} from "jspdf";
import TableHeader from "../../components/Table/TableHeader";
import TableData from '../../components/Table/TableData';
import Header from "../../components/Header";
import { useStateContext } from '../../contexts/ContextProvider';

export default function SalesPreview(){
const { currentColor } = useStateContext();

const [sales, setSale] = useState([]);


const getSale = async () => {
  axios
    .get(`http://localhost:8070/sales/`)
    .then((res) => {
      setSale(res.data);
    })
    .catch((err) => {
      alert(err.message);
    });
};

useEffect(() => {
  getSale();
}, []);

const createPDF = () => {
    const toDayte = new Date(Date.now()).toISOString().split('T')[0];
    const pdf = new jsPDF("landscape", "px", "a1",false);
    const data = document.querySelector("#tableContainer");
    pdf.html(data).then(() => {
        pdf.save("SalesInvoices-" + toDayte +".pdf");
       });
};

return (
    <div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
        <Header category="Table" title="Sales Invoices" />
        
        <button onClick={createPDF} type="button"  className="font-bold py-1 px-4 rounded-full m-3 text-white absolute top-40 right-20 hover:bg-slate-700 bg-slate-500" >Download Report</button>


        
        <div className="block w-full overflow-x-auto rounded-lg" id="tableContainer">
          <table className="w-full rounded-lg">
            <thead>
              <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                <TableHeader value="Invoice No." />
                <TableHeader value="Date of Order" />
                <TableHeader value="Customer Name" />
                <TableHeader value="Contact No." />
                <TableHeader value="Total Amount" />
                <TableHeader value="Status" />
                <TableHeader value="Materials" />
              </tr>
            </thead>
            <tbody>

           { sales.map((data) => {
                    return(

                <tr className="text-sm h-10 border dark:border-slate-600" >

                  <TableData value={data.invoiceNo} />
                  <TableData value={new Date(data.orderDate).toISOString().split('T')[0]} />
                  <TableData value={data.customerName} />
                  <TableData value={data.customerContactNo} />
                  <TableData value={data.totalAmount} />
                  <TableData value={data.status} />
                  <TableData value={data.materialsSupplied} />
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

