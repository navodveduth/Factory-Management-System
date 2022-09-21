import {useState} from 'react';
import axios from 'axios';
import '../styles/Chanukya/MaintaineneceForm.css'
import {useNavigate} from 'react-router-dom';

    function MaintainenceForm() {

      //useNavigate is a hook that is used to navigate to another page
      const navigate = useNavigate();

      const [Type, setType] = useState('');
      const [Description, setDescription] = useState('');
      const [LastMaintainedDate, setLastMaintainedDate] = useState('');
      const [nextServiceDate, setNextServiceDate] = useState('');
      const [others, setOthers] = useState('');

      return (
          <div className='MainFormContainer'>
              <h1>Maintainence Form</h1>
              <form onSubmit={async(e)=>{
                  e.preventDefault();
                  
                  const newMachine = {
                    Type,     
                    Description,
                    LastMaintainedDate,
                    nextServiceDate,
                    others
                  }

                  await axios.post("http://localhost:8070/maintainence/create", newMachine)
                      .then((res)=>{
                          alert("Data saved successfully");
                      })
                      .catch((err)=>{
                          console.log(err);
                          alert("Error occured");
                      })

                      //navigate to the maintainence view page
                      navigate('/maintainenceView');
              }}>




              <div className="mb-3">
                <label className="form-label">Type</label>
                <input type="text"  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                onChange={(e)=>{
                    setType(e.target.value);
                }}/>

              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <input type="text" className="form-control" id="exampleInputPassword1"
                onChange={(e)=>{
                    setDescription(e.target.value);
              }}/>
              </div>
              <div className="mb-3">
                <label className="form-label">Last Maintained Date</label>
                <input type="date" className="form-control" id="exampleInputPassword1"
                onChange={(e)=>{
                  setLastMaintainedDate(e.target.value);
              }}/>
              </div>
              <div className="mb-3">
                <label className="form-label">Next Service Date</label>
                <input type="date" className="form-control" id="exampleInputPassword1" min="0"
                onChange={(e)=>{
                    setNextServiceDate(e.target.value);
              }}/>
              </div>
              <div className="mb-3">
                <label className="form-label">Others</label>
                <input type="text" className="form-control" id="exampleInputPassword1"
                onChange={(e)=>{
                    setOthers(e.target.value);
              }}/>
              </div>

          
              <button type="submit" className="btn btn-light" style={{backgroundColor:'#FF5A5F'}}>Submit</button>
            </form>
          </div>
      )
    }

  export default MaintainenceForm