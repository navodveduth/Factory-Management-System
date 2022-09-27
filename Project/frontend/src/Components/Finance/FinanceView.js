import React, { useEffect, useState } from "react";
import axios from "axios";
import{Link} from "react-router-dom";

function FinanceView(){
    const [Finance, setFinance] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const getFinance = async () => {
        axios.get("http://localhost:8070/finance/")
        .then((res) => {
            setFinance(res.data);

        })
        .catch((err) => {
            alert(err.message);
        })
    }

    useEffect(() => {
        getFinance();
    }, [])


    const deleteFinance = async (id) => {
        await axios.delete(`http://localhost:8070/finance/delete/${id}`)
        .then((res) => {
            alert("Data Deleted Successfully");
            getFinance();
        })
        .catch((err) => {
            alert(err.message)
        })

    }

    return(
        <div>
            <h1>Finance View</h1>
            <div class="" style={{width:"25%", marginLeft:"70%", marginTop:"6%"}}>

                <input type="search" class="form-control rounded" placeholder="Search Here" aria-label="Search" aria-describedby="search-addon" onChange={(e) => {

                 setSearchTerm(e.target.value);

                }} /></div>     
        <table className="table">
            <thead className="thead-dark">
            <tr>
                    <th scope="col">Revenue</th>
                    <th scope="col">Expenses</th>
                    <th scope="col">Date</th>
                    <th scope="col">Profit</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
        <tbody>
                {Finance.filter((val) => {
                    if(searchTerm == ""){
                        return val;
                    }else if(val.revenue.toString().toLowerCase().includes(searchTerm.toLowerCase())){
                        return val;
                    }
                }).map((val, key) => {
                    return(
                        <tr key={key}>
                            <td>{val.revenue}</td>
                            <td>{val.expenses}</td>
                            <td>{val.recordedDate}</td>
                            <td>{val.revenue - val.expenses}</td>
                            <td><Link to={`/finance/update/${val._id}`} className="btn btn-primary">Edit</Link></td>
                            <td><button className="btn btn-danger" onClick={() => {deleteFinance(val._id)}}>Delete</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </div>
    )
}


/* val.revenue.toLowerCase().includes(searchTerm.toLowerCase()) */



                /* }.map((val, key) => {
                    const date  = new Date(val.recordedDate).toLocaleDateString();

                    return(
                        <tr>
                                <td>Rs. {val.revenue}</td>
                                <td>Rs. {val.expenses}</td>
                                <td>{date}</td>
                                <td>Rs. {(val.revenue-val.expenses)}</td>
                                <td><Link to={'/finance/update/'+ val._id}><button type="button" class="btn btn-primary">Edit</button></Link></td>
                                <td><button onClick={
                                    ()=>{
                                        deleteFinance(val._id);
                                    }
                                }type="button" class="btn btn-danger">Delete</button></td>
                            </tr>
                            )
                        })} 
                    </tbody> 
                    </table>
                </div>
            )
        } */

export default FinanceView