import React, {useState} from "react";
import axios from "axios";


export default function AddOrder(){
    const [invoiceNo, setInvoice] = useState("");
    const [orderName,setOrderName] = useState("");
    const [date, setDate] = useState("");
    const [matCost,setMatCost] = useState("");
    const [qty,setQty] = useState("");
    const [total,setTotal] = useState("");

  //  total =  matCost * qty;
    const [overhead, setOverhead] = useState("");
    return(
        <div className="container">
        <h1 style={{margin: "center"}}>Order Cost Sheet</h1>
            <form>
                
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
                    <input type="Number" className="form-control" id="address" placeholder={matCost * qty} onChange={(e)=>{ 
                        setTotal(e.target.value);
                    }} />
                </div>

                <div className="mb-3">
                    <label for="address">Total overhead Cost</label>
                    <input type="Number" className="form-control" id="address" placeholder="Electricity, Machinery Depreciation etc." onChange={(e)=>{
                        setOverhead(e.target.value); 
                    }} />
                </div>

                <div>
                    <button type="submit" onClick={async(e)=>{
                e.preventDefault();

                const newOrder = {
                    invoiceNo,
                    orderName,
                    date,
                    matCost,
                    qty,
                    total,
                    overhead
                }
                console.log(newOrder);
                await axios.post("http://localhost:8070/production/order/orderCreate",newOrder).then(()=>{
                    alert("Order Created");
                }).catch((error)=>{
                    console.log(error);
                    alert(error);
                })
                
            }} className="btn btn-primary">Submit</button>
                </div>
            </form>
    </div>
    );
};
