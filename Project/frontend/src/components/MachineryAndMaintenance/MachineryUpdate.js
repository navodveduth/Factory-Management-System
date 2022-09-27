import React from 'react'
import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function MachineryUpdate() {

    //useNavigate is a hook that is used to navigate to another page
    const navigate = useNavigate();

    const [machineID, setMachineID] = useState("");
    const [name, setName] = useState('');
    const [dateOfPurchased, setPurchasedDate] = useState('');
    const [machineryCost, setMachineryCosts] = useState('');
    const [salvage, setSalvage] = useState('');
    const [numberOfYrs, setNumberOfYrs] = useState('');
    const [others, setOthers] = useState('');

    const {id} = useParams(); //get the id from the url

    const getMachinery = () => {
        axios.get(`http://localhost:8070/machinery/${id}`)//get the data from the backend
        .then((res) => {
            setMachineID(res.data.machineID);
            setName(res.data.name);
            setPurchasedDate(res.data.dateOfPurchased);
            setMachineryCosts(res.data.machineryCost);
            setSalvage(res.data.salvage);
            setNumberOfYrs(res.data.numberOfYrs);
            setOthers(res.data.others);
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    useEffect(() => {// this will run when the page is loaded
        getMachinery();
    }, [])


  return (
    <div className='MachUpdateFormContainer' style={{marginTop:"6%"}}>
              {/* <h3 style={{color: "#606060"}}>Update Machinery Records</h3> */}
              <form style={{marginTop:"3%"}} onSubmit={async(e)=>{
                  e.preventDefault();
                  
                  
                  const newMachine = {
                    machineID,
                    name,     
                    dateOfPurchased,
                    machineryCost,
                    salvage,
                    numberOfYrs,
                    others
                  }

                  await axios.put("http://localhost:8070/machinery/update/"+ id, newMachine)
                      .then((res)=>{
                          alert("Data updated successfully");
                          //navigate to the machinery view page
                      navigate('/machinery');
                      })
                      .catch((err)=>{
                          console.log(err);
                          alert("Error occured");
                      })
                      
              }}>


              <div className="mb-3">
                <label className="form-label">Machine ID</label>
                <input type="text"   className="form-control" value={machineID} id="exampleInputEmail1" aria-describedby="emailHelp"
                onChange={(e)=>{
                    setMachineID(e.target.value);
                }}required/>

              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" value={name} id="exampleInputEmail1" aria-describedby="emailHelp" 
                onChange={(e)=>{
                    setName(e.target.value);
                }}/>

              </div>
              <div className="mb-3">
                <label className="form-label">Purchased date</label>
                <input type="date" className="form-control" value={dateOfPurchased} id="exampleInputPassword1"
                onChange={(e)=>{
                    setPurchasedDate(e.target.value);
              }}/>
              </div>
              
              </div>
              <div className="mb-3">
                <label className="form-label">Machinery costs</label>
                <input type="number" className="form-control" value={machineryCost} id="exampleInputPassword1" min="0"
                onChange={(e)=>{
                    setMachineryCosts(e.target.value);
              }}/>
              </div>
              <div className="mb-3">
                <label className="form-label">Salvage</label>
                <input type="number" className="form-control" value={salvage} id="exampleInputPassword1" min="0"
                onChange={(e)=>{
                    setSalvage(e.target.value);
              }
              }/>
              </div>
              <div className="mb-3">
                <label className="form-label">Number of years</label>
                <input type="number" className="form-control" value={numberOfYrs} id="exampleInputPassword1" min="0"
                onChange={(e)=>{
                    setNumberOfYrs(e.target.value);
              }
              }/>
              </div>

              <div className="mb-3">
                <label className="form-label">Availibility</label>
                <select class="form-select" aria-label="Default select example" value={others}onChange={(e)=>{
                    setOthers(e.target.value);
              }}>
                                    <option selected></option>
                                    <option value="Available">Available</option>
                                    <option value="Unavailable">Unavailable</option>
                </select>
              </div>

          
              <button type="submit" className="btn btn-light" style={{backgroundColor:'#FF5A5F'}}>Submit</button>
            </form>
          </div>
  )
}

export default MachineryUpdate