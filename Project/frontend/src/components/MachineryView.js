import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';

function MachineryView() {
    const [machinery, setMachinery] = useState([]); //machinery is the state variable and setMachinery is the function to update the state variable
    const getMachinery = async () => {  //getMachinery is the function to get the data from the backend
        axios.get("http://localhost:8070/machinery/")
        .then((res) => { 
            setMachinery(res.data); //setMachinery is used to update the state variable
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    useEffect(() => { //useEffect is used to call the function getMachinery
        getMachinery();
    }, [])

    const deleteMachinery = async (id) => {
        await axios.delete(`http://localhost:8070/machinery/delete/${id}`)
        .then((res) => {
            alert("Data deleted successfully");
            getMachinery();
        })
        .catch((err) => {
            alert(err.message);
        })
    }

  return (
    <div>
        <h1>Machinery View</h1>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                <th scope="col">Name</th>
                <th scope="col">Purchased date</th>
                <th scope="col">Depreciation</th>
                <th scope="col">Machine Cost</th>
                <th scope="col">Description</th>
                <th scope="col">Edit</th>
                <th scope="col">Remove</th>
                </tr>
            </thead>
            <tbody>
                { machinery.map((data)=>{
                    
                    return ( 
                        <tr>
                            <td>{ data.name}</td>
                            <td>{data.dateOfPurchased}</td>
                            <td>{data.depreciation}</td>
                            <td>{data.machineryCost}</td>
                            <td>{data.others}</td>
                            <td><Link to={'/machinery/machineryUpdate/'+ data._id}><button type="button" class="btn btn-primary">Edit</button></Link></td>
                            <td><button onClick={
                                ()=>{
                                    deleteMachinery(data._id);
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

export default MachineryView