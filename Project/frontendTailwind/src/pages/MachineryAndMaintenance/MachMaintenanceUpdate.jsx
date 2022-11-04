import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';


function MachMaintenanceUpdate() {
    
  const navigate = useNavigate(); //useNavigate hook to redirect to another page after form submission is successful 

  const [machineID, setmachineID] = useState('');
  const[name, setName] = useState("");
  const [Description, setDescription] = useState('');
  const [lastMaintainedDate, setLastMaintainedDate] = useState('');
  const [nextServiceDate, setNextServiceDate] = useState('');
  const [status, setStatus] = useState('');
  const [Location, setLocation] = useState('');
  const[contactNo, setContactNo] = useState("");
  const [others, setOthers] = useState('');
  
 
  
  

  var date = new Date().toISOString().split('T')[0];
 
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
              <Header category="Form" title=" Update Maintenance" />
              <div className=" flex items-center justify-center "> 
              <form onSubmit={async(e)=>{
                  e.preventDefault();
                  
                  const newMachMaintenance = {
                    machineID,
                    name,
                    Description,
                    lastMaintainedDate,
                    nextServiceDate,
                    status,
                    Location,
                    contactNo,
                    others
                    
                }

                await axios.post("http://localhost:8070/maintainenceMachine/update", newMachMaintenance)
                      .then((res)=>{
                          alert("Data saved successfully");
                          //navigate to the maintainence view page
                      navigate('/MachMaintenanceViewAll');
                      })
                      .catch((err)=>{
                          console.log(err);
                          alert("Error occured");
                      })

                      
              }}>

                        
            
                        <div className="mb-3">
                            <label htmlFor="employeeFullName" className="form-label">Repair needed : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeFullName" defaultValue={Description} required 
                                onChange={(e)=>{
                                    setDescription(e.target.value);
                                }}/>
                        </div>

                        

                    

                        <div className="mb-3">
                            <label htmlFor="employeeDOB" className="form-label">Last Maintained Date : </label>
                            <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeDOB"  min="2010-01-01" max={date} defaultValue={lastMaintainedDate} required 
                                onChange={(e) =>{
                                    setLastMaintainedDate(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="employeeDOB" className="form-label">Next Due : </label>
                            <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeDOB"   min={date}  defaultValue={nextServiceDate}  required 
                                onChange={(e) =>{
                                    setNextServiceDate(e.target.value);
                                }}/>
                        </div>
                        <div className="mb-3">
                            <label for="employeeType" className="form-label">Status : </label>
                            <select class="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                            id="employeeType" aria-label="Default select example"   defaultValue={status}  required
                            onChange={(e) =>{
                                setStatus(e.target.value);
                            }}>
                                <option selected>Choose...</option>
                                <option selected>Choose...</option>
                                    <option value="Completed">Completed</option>
                                    <option value="In progress">In progress</option>

                            </select>
                        </div>
                        
                <div className="mb-3">
                            <label htmlFor="employeeNumber" className="text-md">Repair company: </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeNumber"    defaultValue={Location}  required 
                                onChange={(e)=>{
                                    setLocation(e.target.value);
                                }}/>

                        </div>

                                 
                <div className="mb-3">
                            <label htmlFor="employeeNumber" className="text-md">Repair contact No: </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                             pattern="[0-9]{10}" maxLength={10} title= {"The Contact Number requires a 10 digit number"}
                                id="employeeNumber"  defaultValue={contactNo}   required 
                                onChange={(e)=>{
                                    setContactNo(e.target.value);
                                }}/>

                        </div>


                        <div className="mb-3">
                            <label htmlFor="employeeNameWithInitials" className="form-label">Cost of maintenance : </label>
                            <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeNameWithInitials"   defaultValue={others}  min={0} required 
                                onChange={(e) =>{
                                    setOthers(e.target.value);
                                }}/>
                        </div>
                      

                        
                
                <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Add Maintenance</button>
              </form>
              </div>
              
    </div>

  );
}
  export default MachMaintenanceUpdate;