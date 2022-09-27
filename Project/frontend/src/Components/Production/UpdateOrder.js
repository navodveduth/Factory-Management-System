import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


export default function UpdateOrder(){
    const [invoiceNo, setInvoice] = useState("");
    const [orderName,setOrderName] = useState("");
    const [date, setDate] = useState("");
    const [matCost,setMatCost] = useState("");
    const [qty,setQty] = useState("");
    const [total,setTotal] = useState("");

  //  total =  matCost * qty;
    const [overhead, setOverhead] = useState("");

    const {id} = useParams();   // gets the id from the url
    
     const getOrder =()=>{

        axios.get(`http://localhost:8070/production/order/${id}`).then((res)=>{
            setInvoice(res.data.invoiceNo);
            setOrderName(res.data.orderName);
            setDate(res.data.date);
            setMatCost(res.data.matCost);
            setQty(res.data.qty);
            setTotal(res.data.total);

        }).catch((err)=>{
            alert(err);
        })
    }
        useEffect(()=>{ //This will run the page when loaded
        getOrder();
    },[])

    function sendData (e){
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
        axios.put("http://localhost:8070/production/order/update/"+id,newOrder).then((res)=>{
            alert("Order Created");
        }).catch((error)=>{
            console.log(error);
            alert(error);
        })
    }


    return (
        <div className="container">
        <h1 style={{margin: "center"}}>Update Order Cost Sheet</h1>
            <form onSubmit={sendData}>
                <div className="mb-3">
                    <label for="name" >Enter Invoice Number</label>
                    <input type="text" className="form-control" id="name" placeholder={invoiceNo} onChange={(e)=>{
                        setInvoice(e.target.value);    //event has to be created in any onclick. event has to be passed down to get the values
                    }}/>
                </div>

                <div className="mb-3">
                    <label for="age">Enter the Order Name</label>
                    <input type="text" className="form-control" id="age" placeholder={orderName} onChange={(e)=>{
                         setOrderName(e.target.value);   
                    }}/>
                </div>

                <div className="mb-3">
                    <label for="date">Enter the date</label>
                    <input type="date" className="form-control" id="address" placeholder="" onChange={(e)=>{
                        setDate(e.target.value);
                    }}/>
                </div>

                <div className="mb-3">
                    <label for="address">Enter the Material Cost</label>
                    <input type="Number" className="form-control" id="" placeholder={matCost} onChange={(e)=>{
                        setMatCost(parseFloat(e.target.value));
                    }}/>
                </div>
                
                <div className="mb-3">
                    <label for="address">Enter the Quantity</label>
                    <input type="Number" className="form-control" id="address" placeholder={qty} onChange={(e)=>{
                        setQty(parseInt(e.target.value));
                    }}/>
                </div>
                                
                <div className="mb-3">
                    <label for="address">Total Material Cost</label>
                    <input type="Number" className="form-control" id="address" placeholder={matCost * qty} onChange={(e)=>{ 
                        setTotal(parseFloat(e.target.value));
                    }} />
                </div>

                <div className="mb-3">
                    <label for="address">Total overhead Cost</label>
                    <input type="Number" className="form-control" id="address" placeholder={overhead}  onChange={(e)=>{
                        setOverhead(parseFloat(e.target.value)); 
                    }} />
                </div>

                <div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
    </div>
    );
};
