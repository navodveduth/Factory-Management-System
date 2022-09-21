import React from 'react'
import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function MachineryUpdate() {

    //useNavigate is a hook that is used to navigate to another page
    const navigate = useNavigate();

      const [name, setName] = useState('');
      const [dateOfPurchased, setPurchasedDate] = useState('');
      const [depreciation, setDepreciation] = useState('');
      const [machineryCost, setMachineryCosts] = useState('');
      const [others, setOthers] = useState('');

    const {id} = useParams(); //get the id from the url

    const getMachinery = () => {
        axios.get(`http://localhost:8070/machinery/${id}`)
        .then((res) => {
            setName(res.data.name);
            setPurchasedDate(res.data.dateOfPurchased);
            setDepreciation(res.data.depreciation);
            setMachineryCosts(res.data.machineryCost);
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
    <div className='MachUpdateFormContainer'>
              <h1>Machinery Update Form</h1>
              <form onSubmit={async(e)=>{
                  e.preventDefault();
                  
                  
                  const newMachine = {
                    name,     
                    dateOfPurchased,
                    depreciation,
                    machineryCost,
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
              <div className="mb-3">
                <label className="form-label">Depreciation</label>
                <input type="text" className="form-control" value={depreciation} id="exampleInputPassword1"
                onChange={(e)=>{
                    setDepreciation(e.target.value);
              }}/>
              </div>
              <div className="mb-3">
                <label className="form-label">Machinery costs</label>
                <input type="number" className="form-control" value={machineryCost} id="exampleInputPassword1" min="0"
                onChange={(e)=>{
                    setMachineryCosts(e.target.value);
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

export default MachineryUpdate