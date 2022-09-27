import {useState} from 'react'; 
import axios from 'axios';
import '../../styles/Chanukya/MachineryForm.css'
import {useNavigate} from 'react-router-dom';

    function MachineryForm() {

      const navigate = useNavigate();//useNavigate is a hook that is used to navigate to another page

      const [machineID, setMachineID] = useState("");
      const [name, setName] = useState('');
      const [dateOfPurchased, setPurchasedDate] = useState('');
      const [machineryCost, setMachineryCosts] = useState('');
      const [salvage, setSalvage] = useState('');
      const [numberOfYrs, setNumberOfYrs] = useState('');
      const [others, setOthers] = useState('');
      
     
      return (
          <div className='MachFormContainer' style={{marginTop:"6%"}}>
              {/* <p style={{color: "#606060"}}>Add Machinery details</p> */}
              <form style={{marginTop:"1%"}} onSubmit={async(e)=>{
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

                   axios.post("http://localhost:8070/machinery/create", newMachine)
                      .then(()=>{
                          alert("Data saved successfully");
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
                <input type="text"   className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                onChange={(e)=>{
                    setMachineID(e.target.value);
                }}required/>

              </div>

              <div className="mb-3">
                <label className="form-label">Name and Model</label>
                <input type="text"  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                onChange={(e)=>{
                    setName(e.target.value);
                }}required/>
                </div>


              <div className="mb-3">
                <label className="form-label">Purchased date</label>
                <input type="date" className="form-control" id="exampleInputPassword1"
                onChange={(e)=>{
                    setPurchasedDate(e.target.value);
              }}required/>
              </div>
             
              
              <div className="mb-3">
                <label className="form-label">Cost of the machine</label>
                <input type="number" className="form-control" id="exampleInputPassword1" min="0"
                onChange={(e)=>{
                    setMachineryCosts(e.target.value);
              }}/>
              </div>
              
            <div className="mb-3">
                <label className="form-label">Estimated Salvage value</label>
                <input type="number" className="form-control" id="exampleInputPassword1" min="0"
                onChange={(e)=>{
                    setSalvage(e.target.value);
              }
              }/>
              </div>

              <div className="mb-3">
                <label className="form-label">Estimated useful life</label>
                <input type="number" className="form-control" id="exampleInputPassword1" min="0"
                onChange={(e)=>{

                    setNumberOfYrs(e.target.value);
              }
              }/>
              </div>

              <div className="mb-3">
                <label className="form-label">Availibility</label>
                <select class="form-select" aria-label="Default select example" onChange={(e)=>{
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

  export default MachineryForm