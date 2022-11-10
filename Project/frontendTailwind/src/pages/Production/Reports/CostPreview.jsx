import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {jsPDF} from "jspdf";
import TableHeader from "../../../components/Table/TableHeader";
import TableData from '../../../components/Table/TableData';
import Header from "../../../components/Header";
import { useStateContext } from '../../../contexts/ContextProvider';

export default function PreviewOrder(){
    const { currentColor } = useStateContext();
    const [Order,setOrder] = useState([])

        async function getOrders(){
            await axios.get("http://localhost:8070/production/order/allOrders").then((res)=>{
                setOrder(res.data);
            }).catch((err)=>{
                alert(err.message);
            })
        }

        useEffect(()=>{
            getOrders();
        })

        const createPDF = () => {
            const pdf = new jsPDF("landscape", "px", "B2",false);
            const data = document.querySelector("#tableContainer");
            pdf.html(data).then(() => {
                pdf.save("orders.pdf");
               });
        };
        
        return(
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
            <Header category="Table" title="Detailed Production Report" />
            {/* <div className="w-full h-5"> */}
                <button onClick={createPDF} type="button"  className="font-bold py-1 px-4 rounded-full m-3 text-white absolute top-40 right-20 hover:bg-slate-700 bg-slate-500" >Download Report</button>
            {/* </div> */}
    
            <div className="block w-full overflow-x-auto rounded-lg" id="tableContainer">
            <table className="w-full rounded-lg">
                <thead>
                    <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                    <TableHeader value ="Invoice No"></TableHeader>
                    <TableHeader value ="Product"></TableHeader>
                    <TableHeader value ="Date"></TableHeader>
                    <TableHeader value ="Material Cost"></TableHeader>
                    <TableHeader value ="Quantity"></TableHeader>
                    <TableHeader value ="Total Material Cost"></TableHeader>
                    <TableHeader value ="Overhead Cost"></TableHeader>
                    <TableHeader value="Total Cost"></TableHeader>
                    </tr>
                </thead>
                <tbody>
                    { Order.map((data)=>{
                        return ( 
                            <tr className="text-sm h-10 border dark:border-slate-600">
                                <TableData value={data.invoiceNo}/>
                                <TableData value={data.orderName}/>
                                <TableData value={data.costDate}/>
                                <TableData value={"Rs." + data.materialCost}/>
                                <TableData value={data.unitQty}/>
                                <TableData value={"Rs." + data.totalMatCost}/>
                                <TableData value={"Rs." + data.overHeadCost}/>
                                <TableData value={"Rs." + data.totalCost}/>
                            </tr>
                        )
                    })}
                    
                </tbody>
            </table>
            </div>
        </div>
        );
}