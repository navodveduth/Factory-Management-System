import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';



function MachineryCreateForm() {
  const navigate = useNavigate(); //useNavigate hook to redirect to another page after form submission is successful 

  const [machineID, setMachineID] = useState("");
  const [name, setName] = useState('');
  const [dateOfPurchased, setPurchasedDate] = useState('');
  const [machineryCost, setMachineryCosts] = useState('');
  const [salvage, setSalvage] = useState('');
  const [numberOfYrs, setNumberOfYrs] = useState('');
  const [others, setOthers] = useState('');

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
              <Header category="Form" title=" Add New Machinery" />
              <div className=" flex items-center justify-center "> 
              <form onSubmit={async(e)=>{
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
                 navigate('/MachineryViewAll');
                })
                .catch((err)=>{
                    console.log(err);
                    alert("Error occured");
                })
                
             
        }}>


            

                <div className="mb-3">
                            <label htmlFor="employeeNumber" className="text-md">Machine ID : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeNumber"  required 
                                onChange={(e)=>{
                                    setMachineID(e.target.value);
                                }}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="employeeFullName" className="form-label">Name and Model : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeFullName"   required 
                                onChange={(e)=>{
                                    setName(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="employeeNameWithInitials" className="form-label">Purchased date : </label>
                            <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeNameWithInitials"   required 
                                onChange={(e) =>{
                                    setPurchasedDate(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="employeeNIC" className="form-label">Machinery Cost: </label>
                            <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeNIC"  min={0} required 
                                onChange={(e) =>{
                                    setMachineryCosts(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="employeeDOB" className="form-label">Estimated Salvage value : </label>
                            <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeDOB" min={0}  required 
                                onChange={(e) =>{
                                    setSalvage(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="employeeDOB" className="form-label">Estimated life years : </label>
                            <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeDOB"  min={0} required 
                                onChange={(e) =>{
                                    setNumberOfYrs(e.target.value);
                                }}/>
                        </div>

                      

                        <div className="mb-3">
                            <label for="employeeType" className="form-label">Availibility : </label>
                            <select class="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                            id="employeeType" aria-label="Default select example"  required
                            onChange={(e) =>{
                                setOthers(e.target.value);
                            }}>
                                <option selected>Choose...</option>
                                <option value="Available">Available</option>
                                <option value="Unavailable">Unavailable</option>
                            </select>
                        </div>
                
                <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Add Machine</button>
              </form>
              </div>
              
    </div>

  );
}
  export default MachineryCreateForm;