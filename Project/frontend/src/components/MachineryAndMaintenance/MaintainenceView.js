import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';

function MaintainenceView() {
    const [maintainence, setMaintainence] = useState([]); //maintainence is the state variable and setMaintainence is the function to update the state variable
    const [searchTerm, setSearchTerm] = useState("");
    var TotalCost = 0;

    const getMaintainence = async () => {  //getMaintainence is the function to get the data from the backend
        axios.get("http://localhost:8070/maintainence/")
        .then((res) => { 
            setMaintainence (res.data); //setMaintainence  is used to update the state variable
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    useEffect(() => { //useEffect is used to call the function getMaintainence 
        getMaintainence ();
    }, [])

    const deleteMaintainence  = async (id) => {
        await axios.delete(`http://localhost:8070/maintainence/delete/${id}`)
        .then((res) => {
            alert("Data deleted successfully");
            getMaintainence ();
        })
        .catch((err) => {
            alert(err.message);
        })
    }

  return (
    <div>
        
        <div class="" style={{width:"25%", marginRight:"70%", marginTop:"5%"}}>
                <input type="search" class="form-control rounded" placeholder="Type here ...." aria-label="Search" aria-describedby="search-addon" onChange={(e) => {
                 setSearchTerm(e.target.value);
                }} />
  {/* <button type="button" style={{marginLeft:"120%", marginTop:"-22%"}} class="btn btn-outline-secondary">search</button> */}
        </div>
        <h3 style={{color: "#606060", marginTop:"1%"}}>Maintenance details</h3>
        <table class="table table-striped table-hover" style={{ marginTop:"3%"}}>
            <thead>
                <tr>
                <th scope="col">Type</th>
                <th scope="col">Name</th>
                <th scope="col">Service task & Shedule</th>
                <th scope="col">Last Maintained Date</th>
                <th scope="col">Next due</th>
                <th scope="col">Total Cost</th>
                <th scope="col">Status</th>
                <th scope="col">Edit</th>
                <th scope="col">Remove</th>
                </tr>
            </thead>
            <tbody>
                { maintainence.filter((data)=>{
                    if (searchTerm == ""){
                       return data;
                    }else if (data.Type.toLowerCase().includes(searchTerm.toLowerCase())){
                       return data;
                    }
                }).map((data, key) => {//map is used to iterate the array

                    const LMdate = new Date(data.lastMaintainedDate).toLocaleDateString();
                    const NSdate = new Date(data.nextServiceDate).toLocaleDateString();
                    TotalCost = TotalCost + data.others;
                    
                    return ( 
                        
                        <tr key={key} >
                            
                            <td>{ data.Type}</td>
                            <td>{ data.name}</td>
                            <td>{data.Description}</td>
                            <td>{LMdate}</td>
                            <td>{NSdate}</td>
                            <td>{data.others+".00"}</td>
                            <td>{data.status}</td>
                            
                            <td><Link to={'/maintainence/maintainenceUpdate/'+ data._id}><button type="button"  className="btn btn-outline-info">Edit</button></Link></td>
                            <td><button onClick={
                                ()=>{
                                    deleteMaintainence(data._id);
                                }
                            }type="button" class="btn btn-outline-info">Delete</button></td>
                        </tr>
                    )
                })}
                
                
            </tbody>
        </table>
        <div style={{marginLeft:"80%", marginTop:"3%"}}>
        <h5 style={{color: "#FF3300"}}>Total Cost : {TotalCost+".00"}</h5>
        </div>
        <Link to={'/maintainence/maintainenceAdd'}><button type="button"  className=" btn btn-outline-secondary" style={{marginLeft:"80%"}}>+ New record</button></Link>
    </div>
  )
}

export default MaintainenceView