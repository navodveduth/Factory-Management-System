import {useState} from 'react';
import axios from 'axios';
import '../styles/Chanukya/MachineryForm.css'
import {useNavigate} from 'react-router-dom';

    function MachineryForm() {

      const navigate = useNavigate();//useNavigate is a hook that is used to navigate to another page

      const [name, setName] = useState('');
      const [dateOfPurchased, setPurchasedDate] = useState('');
      const [depreciation, setDepreciation] = useState('');
      const [machineryCost, setMachineryCosts] = useState('');
      const [others, setOthers] = useState('');

      return (
          <div className='MachFormContainer'>
              <h1>Machinery Form</h1>
              <form onSubmit={async(e)=>{
                  e.preventDefault();
                  
                  const newMachine = {
                    name,     
                    dateOfPurchased,
                    depreciation,
                    machineryCost,
                    others
                  }

                  await axios.post("http://localhost:8070/machinery/create", newMachine)
                      .then((res)=>{
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
                <label className="form-label">Name</label>
                <input type="text"  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                onChange={(e)=>{
                    setName(e.target.value);
                }}/>

              </div>
              <div className="mb-3">
                <label className="form-label">Purchased date</label>
                <input type="date" className="form-control" id="exampleInputPassword1"
                onChange={(e)=>{
                    setPurchasedDate(e.target.value);
              }}/>
              </div>
              <div className="mb-3">
                <label className="form-label">Depreciation</label>
                <input type="text" className="form-control" id="exampleInputPassword1"
                onChange={(e)=>{
                    setDepreciation(e.target.value);
              }}/>
              </div>
              <div className="mb-3">
                <label className="form-label">Machinery costs</label>
                <input type="number" className="form-control" id="exampleInputPassword1" min="0"
                onChange={(e)=>{
                    setMachineryCosts(e.target.value);
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

  export default MachineryForm