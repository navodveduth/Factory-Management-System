import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {jsPDF} from "jspdf";

export default function AllOrders(){
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
            const pdf = new jsPDF("landscape", "px", "a2",false);
            const data = document.querySelector("#tableContainer");
            pdf.html(data).then(() => {
                pdf.save("shipping_label.pdf");
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
            <div className="container">
            <div className="container" id="tableContainer">
            <h1>Order View</h1>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                    <th scope="col">Invoice No</th>
                    <th scope="col">Customer Name:</th>
                    <th scope="col">Date</th>
                    <th scope="col">Material Cost</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total Material Cost</th>
                    <th scope="col">Overhead Cost</th>
                    <th scope="col">Total Production Cost</th>
                    </tr>
                </thead>
                <tbody>
                    { Order.map((data)=>{
                        
                        return ( 
                            <tr>
                                <td>{data.invoiceNo}</td>
                                <td>{data.orderName}</td>
                                <td>{data.costDate}</td>
                                <td>{data.materialCost}</td>
                                <td>{data.unitQty}</td>
                                <td>{data.totalMatCost}</td>
                                <td>{data.overHeadCost}</td>
                                <td><Link  to={"/production/order/update/" +data._id }><button type="button" class="btn btn-secondary">Edit</button></Link>
                                </td>
                                <td><button onClick={()=>{
                                    deletesOrder(data._id);
                                }}type="button" class="btn btn-danger">Delete</button></td>

                            </tr>
                        )
                    })}
                    
                </tbody>
            </table>
            </div>
            <button onClick={createPDF} type="button">Download Report</button>
        </div>
        );
}