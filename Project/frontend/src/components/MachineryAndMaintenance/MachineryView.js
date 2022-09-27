import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';




function MachineryView() {
    
    const [machinery, setMachinery] = useState([]); //machinery is the state variable and setMachinery is the function to update the state variable
    const [searchTerm, setSearchTerm] = useState("");
    var TotalDepreciation = 0;
    var TotalCost = 0;

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
        <div class="" style={{width:"20%", marginRight:"85%", marginTop:"5%"}}>
                <input type="search" class="form-control rounded" placeholder="Type here ...." aria-label="Search" aria-describedby="search-addon" onChange={(e) => {
                 setSearchTerm(e.target.value);
                }} />
  {/* <button type="button" style={{marginLeft:"120%", marginTop:"-22%"}} class="btn btn-outline-secondary">search</button> */}
        </div>
        <h3 style={{color: "#606060",marginTop:"-3%"}}>Machinery details</h3>
        <table  className="table table-striped table-hover" style={{ marginTop:"3%"}}>
            <thead >
                <tr >
                <th scope="col" >ID</th>
                <th scope="col">Name and model</th>
                <th scope="col">Purchased date</th>
                <th scope="col">Cost of the machine</th>
                <th scope="col">Estimated Salvage value</th>
                <th scope="col">Estimated useful life</th>
                <th scope="col">Depreciation</th>
                <th scope="col">Availibility</th>
                <th scope="col">Edit</th>
                <th scope="col">Remove</th>
                </tr>
            </thead>
            <tbody>
                { machinery.filter((data)=>{
                    if (searchTerm == ""){
                        return data;
                    }else if (data.name.toLowerCase().includes(searchTerm.toLowerCase())){
                        return data;
                    }
                }).map((data, key) => {//map is used to iterate the array

                    const purchasedDate = new Date(data.dateOfPurchased ).toLocaleDateString();
                    const  depreciation = parseFloat((data.machineryCost-data.salvage)/data.numberOfYrs).toFixed(2);
                    TotalDepreciation = TotalDepreciation + parseFloat(depreciation);
                    TotalCost = TotalCost + parseFloat(data.machineryCost);

                    return ( 
                        <tr key={key}> 
                             <td>{ data.machineID}</td>
                            <td>{ data.name}</td>
                            <td>{purchasedDate}</td>
                            <td>{data.machineryCost+".00"}</td>
                            <td>{data.salvage+".00"}</td>
                            <td>{data.numberOfYrs}</td>
                            <td>{depreciation+"%"}</td>
                            <td>{data.others}</td>
                            <td><Link to={'/machinery/machineryUpdate/'+ data._id}><button type="button"  className="btn btn-outline-info">Edit</button></Link></td>
                            <td><button onClick={
                                ()=>{
                                    deleteMachinery(data._id);
                                }
                            }type="button" className="btn btn-outline-info" >Delete</button></td>
                        </tr>
                    )
                })}
                
                
            </tbody>
        </table>

        
        <div style={{marginLeft:"80%", marginTop:"3%"}}>
            <h5 style={{color: "#FF3300"}}>Total depreciation : {TotalDepreciation+"%"}</h5>
            <h5 style={{color: "#FF3300"}}>Total Cost : {TotalCost+".00"}</h5>
        </div>

        <Link to={'/machinery/machineryAdd'}><button type="button"  className=" btn btn-outline-secondary" style={{marginLeft:"80%"}}>+ New record</button></Link>
</div>

  )
}

export default MachineryView