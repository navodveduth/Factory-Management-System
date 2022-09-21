import React from 'react'
import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function MaintainenceUpdate() {

    //useNavigate is a hook that is used to navigate to another page
    const navigate = useNavigate();

    const [Type, setType] = useState('');
    const [Description, setDescription] = useState('');
    const [LastMaintainedDate, setLastMaintainedDate] = useState('');
    const [nextServiceDate, setNextServiceDate] = useState('');
    const [others, setOthers] = useState('');

    const {id} = useParams(); //get the id from the url

    const getMaintainence = () => {
        axios.get(`http://localhost:8070/maintainence/${id}`)
        .then((res) => {
            setType(res.data.Type);
            setDescription(res.data.Description);
            setLastMaintainedDate(res.data.LastMaintainedDate);
            setNextServiceDate(res.data.nextServiceDate);
            setOthers(res.data.others);
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    useEffect(() => {// this will run when the page is loaded
        getMaintainence();
    }, [])


  return (
    <div className='MainUpdateFormContainer'>
              <h1>Maintainence Update Form</h1>
              <form onSubmit={async(e)=>{
                  e.preventDefault();
                  
                  
                  const newMaintainence = {
                    Type,     
                    Description,
                    LastMaintainedDate,
                    nextServiceDate,
                    others
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
                <label className="form-label">Type</label>
                <input type="text" className="form-control" value={Type} id="exampleInputEmail1" aria-describedby="emailHelp" 
                onChange={(e)=>{
                    setType(e.target.value);
                }}/>

              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
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
                <label className="form-label">Next Service Date</label>
                <input type="date" className="form-control" value={nextServiceDate} id="exampleInputPassword1"
                onChange={(e)=>{
                    setNextServiceDate(e.target.value);
              }}/>
              </div>
             
              <div className="mb-3">
                <label className="form-label">Others</label>
                <input type="text" className="form-control"  value={others} id="exampleInputPassword1"
                onChange={(e)=>{
                    setOthers(e.target.value);
              }}/>
              </div>

          
              <button type="submit" className="btn btn-light" style={{backgroundColor:'#FF5A5F'}}>Submit</button>
            </form>
          </div>
  )
}

export default MaintainenceUpdate