import {useState} from 'react';
import axios from 'axios';
import '../../styles/Chanukya/MaintaineneceForm.css'
import {useNavigate} from 'react-router-dom';

    function MaintainenceForm() {

      //useNavigate is a hook that is used to navigate to another page
      const navigate = useNavigate();

     
      const [Type, setType] = useState('');
      const[name, setName] = useState("");
      const [Description, setDescription] = useState('');
      const [others, setOthers] = useState('');
      const [status, setStatus] = useState('');
      const [lastMaintainedDate, setLastMaintainedDate] = useState('');
      const [nextServiceDate, setNextServiceDate] = useState('');
     


      return (
          <div className='MainFormContainer'style={{marginTop:"6%"}}>
              {/* <h3 style={{color: "#606060"}}>Add Maintainence Records</h3> */}
              <form style={{marginTop:"3%"}} onSubmit={async(e)=>{
                  e.preventDefault();
                  
                  const newMachine = {
                    Type, 
                    name,
                    Description,
                    others,
                    status,
                    lastMaintainedDate,
                    nextServiceDate
                  }

                  await axios.post("http://localhost:8070/maintainence/create", newMachine)
                      .then((res)=>{
                          alert("Data saved successfully");
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
                <select class="form-select" aria-label="Default select example" onChange={(e)=>{
                    setType(e.target.value);
              }}>
                                    <option selected></option>
                                    <option value="Vehicle">Vehicle</option>
                                    <option value="Machinery">Machinery</option>
                                    <option value="Building">Building</option>
                </select>
              </div>


              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text"  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                onChange={(e)=>{
                    setName(e.target.value);
                }}required/>

            
              </div>
            
              <div className="mb-3">
                <label className="form-label">Service task & schedule</label>
                <input type="text" className="form-control" id="exampleInputPassword1"
                onChange={(e)=>{
                    setDescription(e.target.value);
              }}required/>
              </div>

              
              
              <div className="mb-3">
                <label className="form-label">Cost of maintenance</label>
                <input type="Number" className="form-control" id="exampleInputPassword1" min="0"
                onChange={(e)=>{
                    setOthers(e.target.value);
              }}required/>
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select class="form-select" aria-label="Default select example" onChange={(e)=>{
                    setStatus(e.target.value);
              }}>
                                    <option selected></option>
                                    <option value="Just scheduled">Just scheduled</option>
                                    <option value="In progress">In progress</option>
                                    <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Last Maintained Date</label>
                <input type="date" className="form-control" id="exampleInputPassword1"
                onChange={(e)=>{
                  setLastMaintainedDate(e.target.value);
              }}/>

              </div>
              <div className="mb-3">
                <label className="form-label">Next Due</label>
                <input type="date" className="form-control" id="exampleInputPassword1" 
                onChange={(e)=>{
                    setNextServiceDate(e.target.value);
              }}/>
              </div>

              

          
              <button type="submit" className="btn btn-light" style={{backgroundColor:'#FF5A5F'}}>Submit</button>
            </form>
          </div>
      )
    }

  export default MaintainenceForm