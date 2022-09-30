import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../components';

function EmployeeCreateForm() {
  const navigate = useNavigate(); //useNavigate hook to redirect to another page after form submission is successful 
  var date = new Date().toISOString().split('T')[0];

  const [employeeNumber, setEmployeeNumber] = useState('');
  const [employeeFullName, setEmployeeFullName] = useState('');
  const [employeeNameWithInitials, setEmployeeNameWithInitials] = useState('');
  const [employeeNIC, setEmployeeNIC] = useState('');
  const [employeeGender, setEmployeeGender] = useState('');
  const [employeeDOB, setEmployeeDOB] = useState('');
  const [employeeDateOfJoin, setEmployeeDateOfJoin] = useState('');
  const [employeeDesignation, setEmployeeDesignation] = useState('');
  const [employeeDepartment, setEmployeeDepartment] = useState('');
  const [employeeType, setEmployeeType] = useState('');
  const [employeeAddress, setEmployeeAddress] = useState('');
  const [employeeContactNumber, setEmployeeContactNumber] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
              <Header category="Form" title=" Create New Employee" />
              <div className=" flex items-center justify-center "> 
              <form onSubmit={async(e)=>{
                  e.preventDefault();
                  
                  const newEmployee = {
                      employeeNumber,
                      employeeFullName,
                      employeeNameWithInitials,
                      employeeNIC,
                      employeeGender,
                      employeeDOB,
                      employeeDateOfJoin,
                      employeeDesignation,
                      employeeDepartment,
                      employeeType,
                      employeeAddress,
                      employeeContactNumber,
                      employeeEmail
                  }

                  await axios.post("http://localhost:8070/employee/createEmployee", newEmployee)
                      .then((res)=>{
                          alert("Data saved successfully");
                             //navigate to the machinery view page
                      navigate('/EmployeeViewAll');
                      })
                      .catch((err)=>{
                          console.log(err);
                          alert("Error occured");
                      })
                      
                   
              }}>

                <div className="mb-3">
                  <label for="employeeNumber" className="form-label">Employee Number : </label>
                  <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="employeeNumber" placeholder="Enter the employee number" 
                  pattern="[0-9]{4}" maxLength={4} title= {"The Employee Number requires a 4 digit number"} required 
                  onChange={(e)=>{
                      setEmployeeNumber(e.target.value);
                  }}/>
                </div>

                <div className="mb-3">
                  <label for="employeeFullName" className="form-label">Full name : </label>
                  <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="employeeFullName" placeholder="Enter your full name" required 
                  onChange={(e)=>{
                      setEmployeeFullName(e.target.value);
                  }}
                  pattern="[A-Za-z ]{3,}" title= {"The Full Name requires a minimum of 3 characters"} />
                </div>

                <div className="mb-3">
                  <label for="employeeNameWithInitials" className="form-label">Name with initials : </label>
                  <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="employeeNameWithInitials" placeholder="Enter your name with Initials" required 
                  onChange={(e) =>{
                      setEmployeeNameWithInitials(e.target.value);
                  }}
                  pattern="[A-Za-z ]{3,}" title= {"The Name with Initials requires a minimum of 3 characters"}/>
                </div>

                <div className="mb-3">
                  <label for="employeeNIC" className="form-label">NIC number : </label>
                  <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="employeeNIC" placeholder="Enter your NIC number" required 
                  onChange={(e) =>{
                      setEmployeeNIC(e.target.value);
                  }}
                  pattern="[0-9vVxX]{12}" maxLength={12} title= {"The NIC number requires a 9 digit number and a letter at the end or a 12 digit number"}  />
                </div>

                <div className="mb-3">
                  <label for="employeeGender" className="form-label">Gender : </label>
                  <select class="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="employeeGender" aria-label="Default select example" required
                   onChange={(e) =>{
                    setEmployeeGender(e.target.value);
                  }}>
                      <option selected>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label for="employeeDOB" className="form-label">Date of Birth : </label>
                  <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="employeeDOB" placeholder="Enter your birthday"required max={date}
                  onChange={(e) =>{
                      setEmployeeDOB(e.target.value);
                  }}/>
                </div>

                <div className="mb-3">
                  <label for="employeeDateOfJoin" className="form-label">Date joined : </label>
                  <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="employeeDateOfJoin" placeholder="Enter your date of join"required max={date}
                  onChange={(e) =>{
                      setEmployeeDateOfJoin(e.target.value);
                  }}/>
                </div>

                <div className="mb-3">
                  <label for="employeeDesignation" className="form-label">Designation : </label>
                  <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="employeeDesignation" placeholder="Enter your designation"required
                  onChange={(e) =>{
                      setEmployeeDesignation(e.target.value);
                  }}
                  pattern="[A-Za-z ]{3,}" title= {"The Designation requires a minimum of 3 characters"} />
                </div>

                <div className="mb-3">
                  <label for="employeeDepartment" className="form-label">Department : </label>
                  <select type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="employeeDepartment" required
                  onChange={(e) =>{
                      setEmployeeDepartment(e.target.value);
                  }}>
                    <option selected>Select Department</option>
                    <option value="Finance">Finance</option>
                    <option value="Sales">Sales</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Production">Production</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label for="employeeType" className="form-label">Employee Type : </label>
                  <select class="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="employeeType" aria-label="Default select example" required
                   onChange={(e) =>{
                    setEmployeeType(e.target.value);
                  }}>
                      <option selected>Select Employee Type</option>
                      <option value="Executive">Executive</option>
                      <option value="Non-Executive">Non-Executive</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label for="employeeAddress" className="form-label">Address : </label>
                  <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="employeeAddress" placeholder="Enter your home address"required
                  onChange={(e) =>{
                      setEmployeeAddress(e.target.value);
                  }}
                  pattern="[A-Za-z0-9 ,.-]{3,}" title= {"The Address requires a minimum of 3 characters"} />
                </div>

                <div className="mb-3">
                  <label for="employeeContactNumber" className="form-label">Contact Number : </label>
                  <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="employeeContactNumber" placeholder="Enter your contact number"required
                  onChange={(e) =>{
                      setEmployeeContactNumber(e.target.value);
                  }}
                  pattern="[0-9]{10}" maxLength={10} title= {"The Contact Number requires a 10 digit number"} />
                </div>

                <div className="mb-3">
                  <label for="employeeEmail" className="form-label">Email : </label>
                  <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="employeeEmail" placeholder="Enter your email"required
                  onChange={(e) =>{
                      setEmployeeEmail(e.target.value);
                  }}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title= {"The Email requires a valid email address"} />
                </div>
                
                <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Create Employee</button>
              </form>
              </div>
              
    </div>

  );
}
  export default EmployeeCreateForm;