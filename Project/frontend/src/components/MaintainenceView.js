import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';

function MaintainenceView() {
    const [maintainence, setMaintainence] = useState([]); //maintainence is the state variable and setMaintainence is the function to update the state variable
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
        <h1>Maintainence  View</h1>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                <th scope="col">Type</th>
                <th scope="col">Description</th>
                <th scope="col">LastMaintained Date</th>
                <th scope="col">nextService Date</th>
                <th scope="col">others</th>
                <th scope="col">Edit</th>
                <th scope="col">Remove</th>
                </tr>
            </thead>
            <tbody>
                { maintainence.map((data)=>{
                    
                    return ( 
                        <tr>
                            <td>{ data.Type}</td>
                            <td>{data.Description}</td>
                            <td>{data.LastMaintainedDate}</td>
                            <td>{data.nextServiceDate}</td>
                            <td>{data.others}</td>
                            <td><Link to={'/maintainence/maintainenceUpdate/'+ data._id}><button type="button" class="btn btn-primary">Edit</button></Link></td>
                            <td><button onClick={
                                ()=>{
                                    deleteMaintainence(data._id);
                                }
                            }type="button" class="btn btn-danger">Delete</button></td>
                        </tr>
                    )
                })}
                
                
            </tbody>
        </table>
    </div>
  )
}

export default MaintainenceView