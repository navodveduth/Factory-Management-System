import React, {useState} from "react";
import axios from "axios";


export default function AddOrder(){

    const [invoiceNo, setInvoice] = useState("");
    const [orderName,setOrderName] = useState("");
    const [costDate, setDate] = useState("");
    const [materialCost,setMatCost] = useState("");
    const [unitQty,setQty] = useState("");
   // const [totalMatCost,setMatTotal] = useState("");

    const totalMatCost = materialCost * unitQty;
    const [overHeadCost, setOverhead] = useState("");
    return(
        <div className="container">
        <h1 style={{margin: "center"}}>Order Cost Sheet</h1>
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
                    <label for="name" >Enter Invoice Number</label>
                    <input type="text" className="form-control" id="name" placeholder="Invoice Number" onChange={(e)=>{
                        setInvoice(e.target.value);    //event has to be created in any onclick. event has to be passed down to get the values
                    }}/>
                </div>

                <div className="mb-3">
                    <label for="age">Enter the Order Name</label>
                    <input type="text" className="form-control" id="age" placeholder="Customer Name" onChange={(e)=>{
                         setOrderName(e.target.value);   
                    }}/>
                </div>

                <div className="mb-3">
                    <label for="address">Enter the date</label>
                    <input type="date" className="form-control" id="address" placeholder="Address" onChange={(e)=>{
                        setDate(e.target.value);
                    }}/>
                </div>

                <div className="mb-3">
                    <label for="address">Enter the Material Cost</label>
                    <input type="Number" className="form-control" id="" placeholder="Material Cost" onChange={(e)=>{
                        setMatCost(e.target.value);
                    }}/>
                </div>
                
                <div className="mb-3">
                    <label for="address">Enter the Quantity</label>
                    <input type="Number" className="form-control" id="address" placeholder="Quantity" onChange={(e)=>{
                        setQty(e.target.value);
                    }}/>
                </div>
                        
                <div className="mb-3">
                    <label for="address">Total Material Cost</label>
                    <input type="Number" className="form-control" id="address" placeholder={materialCost * unitQty} onChange={(e)=>{ 
                    //    setMatTotal(e.target.value);
                    }} readOnly/>
                </div>

                <div className="mb-3">
                    <label for="address">Total overhead Cost</label>
                    <input type="Number" className="form-control" id="address" placeholder="Electricity, Machinery Depreciation etc." onChange={(e)=>{
                        setOverhead(e.target.value); 
                    }} />
                </div>

                <div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
    </div>
    );
};
