import React from 'react'
import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function MaintainenceUpdate() {

    //useNavigate is a hook that is used to navigate to another page
    const navigate = useNavigate();

    const [Type, setType] = useState('');
    const[name, setName] = useState("");
    const [Description, setDescription] = useState('');
    const [LastMaintainedDate, setLastMaintainedDate] = useState('');
    const [nextServiceDate, setNextServiceDate] = useState('');
    const [others, setOthers] = useState('');
    const [status, setStatus] = useState('');
    const {id} = useParams(); //get the id from the url

    const getMaintainence = () => {
        axios.get(`http://localhost:8070/maintainence/${id}`)
        .then((res) => {


            setType(res.data.Type);
            setName(res.data.name);
            setDescription(res.data.Description);
            setLastMaintainedDate(res.data.LastMaintainedDate);
            setNextServiceDate(res.data.nextServiceDate);
            setOthers(res.data.others);
            setStatus(res.data.status);

        })
        .catch((err) => {
            alert(err.message);
        })
    }

    useEffect(() => {// this will run when the page is loaded
        getMaintainence();
    }, [])


  return (
    <div className='MainUpdateFormContainer' style= {{marginTop:"6%"}}>
              {/* <h3 style={{color: "#606060"}}>Update Maintenance Records</h3> */}
              <form style={{marginTop:"3%"}} onSubmit={async(e)=>{
                  e.preventDefault();
                  
                  
                  const newMaintainence = {

                    Type,
                    name,     
                    Description,
                    LastMaintainedDate,
                    nextServiceDate,
                    others,
                    status

                  }

                  await axios.put("http://localhost:8070/maintainence/update/"+ id, newMaintainence)
                      .then((res)=>{
                          alert("Data updated successfully");
                          //navigate to the maintainence view page
                      navigate('/maintainence');
                      })
                      .catch((err)=>{
                          console.log(err);
                          alert("Error occured");
                      })

                      
              }}>


              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" id="name" value={name} onChange={(e)=>{
                    setName(e.target.value);
                }}/>
              </div>


              <div className="mb-3">
                <label className="form-label">Type</label>
                <select class="form-select" aria-label="Default select example" value={Type}onChange={(e)=>{
                    setType(e.target.value);
              }}>
                                    <option selected></option>
                                    <option value="Vehicle">Vehicle</option>
                                    <option value="Machinery">Machinery</option>
                                    <option value="Building">Building</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Service task & Schedule</label>
                <input type="text" className="form-control" value={Description} id="exampleInputPassword1"
                onChange={(e)=>{
                    setDescription(e.target.value);
              }}/>
              </div>
              <div className="mb-3">
                <label className="form-label">Last Maintained Date</label>
                <input type="date" className="form-control" value={LastMaintainedDate} id="exampleInputPassword1" min="0"
                onChange={(e)=>{
                    setLastMaintainedDate(e.target.value);
              }}/>
              </div>
              <div className="mb-3">
                <label className="form-label">Next due</label>
                <input type="date" className="form-control" value={nextServiceDate} id="exampleInputPassword1"
                onChange={(e)=>{
                    setNextServiceDate(e.target.value);
              }}/>
              </div>

              <div className="mb-3">
                <label className="form-label">Cost of maintenance</label>
                <input type="text" className="form-control" value={others} id="exampleInputPassword1"
                onChange={(e)=>{
                    setOthers(e.target.value);
              }
              }/>
              </div>
             
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select class="form-select" aria-label="Default select example"  value={status}onChange={(e)=>{
                    setStatus(e.target.value);
              }}>
                                    <option selected></option>
                                    <option value="Just scheduled">Just scheduled</option>
                                    <option value="In progress">In progress</option>
                                    <option value="Completed">Completed</option>
                </select>
              </div>


          
              <button type="submit" className="btn btn-light" style={{backgroundColor:'#FF5A5F'}}>Submit</button>
            </form>
          </div>
  )
}

export default MaintainenceUpdate