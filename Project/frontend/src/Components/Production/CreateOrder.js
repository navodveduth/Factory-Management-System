import React, {useEffect, useState} from "react";
import axios from "axios";



function AllOrders(){
    const [Order,setOrder] = useState([])

    useEffect(()=>{
        function getOrders(){
            axios.get("http://localhost:8070/Production/order/allOrders").then((res)=>{
                setOrder(res.data);
            }).catch((err)=>{
                alert(err.message);
            })
        }
        getOrders();
    },[])
        return(
            <div className="container">
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
                    <th scope="col">Total Production Cost(Without Labour)</th>
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
                            </tr>
                        )
                    })}
                    
                    
                </tbody>
            </table>
        </div>
        );
}
export default function AddOrder(){
    const [invoiceNo, setInvoice] = useState("");
    const [orderName,setOrderName] = useState("");
    const [date, setDate] = useState("");
    const [matCost,setMatCost] = useState("");
    const [qty,setQty] = useState("");
    const [total,setTotal]= useState("");

  //  total =  matCost * qty;
    const [overhead, setOverhead] = useState("");
    

     const sendData = async(e)=>{
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
        await axios.post("http://localhost:8070/Production/order/orderCreate",newOrder).then(()=>{
            alert("Student Added");
        }).catch((error)=>{
            alert(error);
        })
    }
    return (
        <div className="container">
        <h1 style={{margin: "center"}}>Order Cost Sheet</h1>
            <form onSubmit={sendData}>
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
                    <input type="Number" className="form-control" id="address" placeholder="Total" onChange={(e)=>{
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
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button style={{margin:10}}type="costPvs" className="btn btn-primary" onClick={AllOrders}>Check All Order Costs</button>
                </div>
            </form>
    </div>
    );
};
