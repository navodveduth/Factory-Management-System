import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link ,useNavigate} from "react-router-dom";
import {jsPDF} from "jspdf";
import TableHeader from "../../components/Table/TableHeader";
import TableData from '../../components/Table/TableData';
import Header from "../../components/Header";
import { useStateContext } from '../../contexts/ContextProvider';

export default function AllOrders(){
    const navigate = useNavigate();
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
            const pdf = new jsPDF("landscape", "px", "a1",false);
            const data = document.querySelector("#tableContainer");
            pdf.html(data).then(() => {
                pdf.save("orders.pdf");
               });
        };

        async function deletesOrder(id){
            await axios.delete(`http://localhost:8070/production/order/delete/${id}`).then((res)=>{
                alert("Order data deleted Successfully");
               getOrders();
            }).catch((err)=>{
                alert(err.message);
            })
        }


        return(
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
            <Header category="Table" title="Production Cost" />
            <Link to={"/costpreview"}>
                                        <button 
                                            type="button" 
                                            className="font-bold py-1 px-4 rounded-full mx-3 text-white" 
                                            style={{ background: currentColor,
                                                     margin:10 }}>Generate Report<i className="fas fa-edit"/>
                                        </button>
                                    </Link>
            <div className="block w-full overflow-x-auto rounded-lg" id="tableContainer">
            <table className="w-full rounded-lg">
                <thead>
                    <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                    <TableHeader value ="Invoice No"></TableHeader>
                    <TableHeader value ="Description"></TableHeader>
                    <TableHeader value ="Date"></TableHeader>
                    <TableHeader value ="Material Cost"></TableHeader>
                    <TableHeader value ="Quantity"></TableHeader>
                    <TableHeader value ="Total Material Cost"></TableHeader>
                    <TableHeader value ="Overhead Cost"></TableHeader>
                    <TableHeader value="Total Cost"></TableHeader>
                    <TableHeader value="Manage"/>
                    </tr>
                </thead>
                <tbody>
                    { Order.map((data)=>{
                        return ( 
                            <tr className="text-sm h-10 border dark:border-slate-600">
                                <TableData value={data.invoiceNo}/>
                                <TableData value={data.orderName}/>
                                <TableData value={data.costDate}/>
                                <TableData value={data.materialCost}/>
                                <TableData value={data.unitQty}/>
                                <TableData value={data.totalMatCost}/>
                                <TableData value={data.overHeadCost}/>
                                <TableData value={data.totalCost}/>
                                <td className="text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">
                                    <Link to={"/updateCost/" +data._id }>
                                        <button 
                                            type="button" 
                                            className="font-bold py-1 px-4 rounded-full mx-3 text-white" 
                                            style={{ background: currentColor }}><i className="fas fa-edit"/>
                                        </button>
                                    </Link>
                                
                                    <button onClick={()=>{
                                    deletesOrder(data._id);
                                    }}
                                    type="button" 
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 ml-2 rounded-full">
                                    <i className="fas fa-trash" />
                                    </button>

                                    </td>
                            </tr>
                        )
                    })}
                    
                </tbody>
            </table>
            </div>
        </div>
        );
}