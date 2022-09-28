import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Header } from '../../components';


export default function AddOrder(){

    const [invoiceNo, setInvoice] = useState("");
    const [orderName,setOrderName] = useState("");
    const [costDate, setDate] = useState("");
    const [materialCost,setMatCost] = useState("");
    const [unitQty,setQty] = useState("");
   // const [totalMatCost,setMatTotal] = useState("");

    const totalMatCost = materialCost * unitQty;
    const [overHeadCost, setOverhead] = useState("");
   // const [totalCost, setTotalCost] = useState("");
    const totalCost = totalMatCost + overHeadCost
    return(
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
        <Header category="Form" title=" Create New Order" />
        <div className=" flex items-center justify-center "> 
            <form onSubmit={async(e)=>{
                e.preventDefault();
                
                const newOrder = {
                        invoiceNo,
                        orderName,
                        costDate,
                        materialCost,
                        unitQty,
                        totalMatCost,
                        overHeadCost,
                        totalCost,
                }
                console.log(newOrder);
                await axios.post("http://localhost:8070/production/order/orderCreate",newOrder).then(()=>{
                    alert("Order Created");
                }).catch((error)=>{
                    console.log(error);
                    alert(error);
                })
                
            }} >
                
                <div className="mb-3">
                <label for="employeeNumber" className="form-label">Enter Invoice Number</label>
                    <input type="text" 
                    className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                    id="name" 
                    placeholder="Invoice Number" 
                    onChange={(e)=>{
                        setInvoice(e.target.value);    //event has to be created in any onclick. event has to be passed down to get the values
                    }}
                    required/>
                </div>

                <div className="mb-3">
                    <label for="age">Enter Order Description</label>
                    <input type="text" 
                    className="mt-1 block w-800 rounded-md bg-gray-    100 focus:bg-white dark:text-black" 
                    id="age" 
                    placeholder="Description" 
                    onChange={(e)=>{
                         setOrderName(e.target.value);   
                    }}/>
                </div>

                <div className="mb-3">
                    <label for="address">Enter the date</label>
                    <input type="date" 
                    className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                    id="address" placeholder="" onChange={(e)=>{
                        setDate(e.target.value);
                    }}/>
                </div>

                <div className="mb-3">
                    <label for="address">Enter the Material Cost</label>
                    <input type="Number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="" placeholder="Material Cost" onChange={(e)=>{
                        setMatCost(e.target.value);
                    }}/>
                </div>
                
                <div className="mb-3">
                    <label for="address">Enter the Quantity</label>
                    <input type="Number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="address" placeholder="Quantity" onChange={(e)=>{
                        setQty(e.target.value);
                    }}/>
                </div>
                        
                <div className="mb-3">
                    <label for="address">Total Material Cost</label>
                    <input type="Number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="address" placeholder={materialCost * unitQty} onChange={(e)=>{ 
                    //    setMatTotal(e.target.value);
                    }} readOnly/>
                </div>

                <div className="mb-3">
                    <label for="address">Total overhead Cost</label>
                    <input type="Number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="address" placeholder="Electricity, Machinery Depreciation etc." onChange={(e)=>{
                        setOverhead(e.target.value); 
                    }} />
                </div>
                <div className="mb-3">
                    <label for="address">Total Production Cost</label>
                    <input type="Number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                        id="address" placeholder={totalCost} onChange={(e)=>{
                    }} />
                </div>

                <div>
                <button type="submit" 
                    className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Pass Cost</button>
                </div>
            </form>
            </div>
    </div>
    );
};
