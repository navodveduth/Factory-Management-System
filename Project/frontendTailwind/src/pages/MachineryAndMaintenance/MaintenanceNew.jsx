import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';


function MaintenanceCreateForm() {
    
  const navigate = useNavigate(); //useNavigate hook to redirect to another page after form submission is successful 

  const [Type, setType] = useState('');
  const[name, setName] = useState("");
  const [Description, setDescription] = useState('');
  const [others, setOthers] = useState('');
  const [status, setStatus] = useState('');
  const [lastMaintainedDate, setLastMaintainedDate] = useState('');
  const [nextServiceDate, setNextServiceDate] = useState('');

  var date = new Date().toISOString().split('T')[0];
 
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
              <Header category="Form" title=" Add New Machinery" />
              <div className=" flex items-center justify-center "> 
              <form onSubmit={async(e)=>{
                  e.preventDefault();
                  
                  const newMaintenance = {
                    Type, 
                    name,
                    Description,
                    others,
                    status,
                    lastMaintainedDate,
                    nextServiceDate
                }

                await axios.post("http://localhost:8070/maintainence/create", newMaintenance)
                      .then((res)=>{
                          alert("Data saved successfully");
                          //navigate to the maintainence view page
                      navigate('/MaintenanceViewAll');
                      })
                      .catch((err)=>{
                          console.log(err);
                          alert("Error occured");
                      })

                      
              }}>

                        <div className="mb-3">
                            <label for="employeeType" className="form-label">Type : </label>
                            <select class="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                            id="employeeType" aria-label="Default select example"  required
                            onChange={(e) =>{
                                setType(e.target.value);
                            }}>
                                <option selected>Choose...</option>
                                <option value="Vehicle">Vehicle</option>
                                    <option value="Machinery">Machinery</option>
                                    <option value="Building">Building</option>
                            </select>
                        </div>


            

                <div className="mb-3">
                            <label htmlFor="employeeNumber" className="text-md">Name : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeNumber"   required 
                                onChange={(e)=>{
                                    setName(e.target.value);
                                }}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="employeeFullName" className="form-label">Service task & schedule : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeFullName"  required 
                                onChange={(e)=>{
                                    setDescription(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="employeeNameWithInitials" className="form-label">Cost of maintenance : </label>
                            <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeNameWithInitials"  min={0} required 
                                onChange={(e) =>{
                                    setOthers(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label for="employeeType" className="form-label">Status : </label>
                            <select class="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                            id="employeeType" aria-label="Default select example"  required
                            onChange={(e) =>{
                                setStatus(e.target.value);
                            }}>
                                <option selected>Choose...</option>
                                    <option value="In progress">In progress</option>
                                    <option value="Completed">Completed</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="employeeDOB" className="form-label">Last Maintained Date : </label>
                            <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeDOB"  min="2010-01-01" max={date} required 
                                onChange={(e) =>{
                                    setLastMaintainedDate(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="employeeDOB" className="form-label">Next Due : </label>
                            <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeDOB"   min={date} required 
                                onChange={(e) =>{
                                    setNextServiceDate(e.target.value);
                                }}/>
                        </div>

                      

                        
                
                <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Add Maintenance</button>
              </form>
              </div>
              
    </div>

  );
}
  export default MaintenanceCreateForm;