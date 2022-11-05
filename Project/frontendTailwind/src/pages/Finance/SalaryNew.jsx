import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';

function SalaryCreateForm() {
  const navigate = useNavigate(); //useNavigate hook to redirect to another page after form submission is successful 

  const [employeeNumber, setEmpNumber] = useState('');
  const [employeeBasicSalary, setEmpBasic] = useState('');
  const [employeeAllowance, setEmpAllowance] = useState('');
  const [employeeIncentive, setEmpIncentive] = useState('');

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
              <Header category="Form" title=" New Salary Entry" />
              <div className=" flex items-center justify-center "> 
              <form onSubmit={async(e)=>{
                  e.preventDefault();
                  
                  const newSalary = {
                    employeeNumber,
                    employeeBasicSalary,
                    employeeAllowance,
                    employeeIncentive,
                  }

                  await axios.post("http://localhost:8070/salary/SalaryNew", newSalary)
                      .then((res)=>{
                          alert("Data saved successfully");
                             
                      navigate('/SalaryViewAll');
                      })
                      .catch((err)=>{
                          console.log(err);
                          alert("Error occured");
                      })
                      
                   
              }}>

                <div className="mb-3">
                  <label for="employeeNumber" className="form-label">Employee Number : </label>
                  <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="employeeNumber" placeholder="Enter the Employee Number" title="Employee ID must be a 4 Digit Numeric value" pattern="[0-9]{4}" required 
                  onChange={(e)=>{
                    setEmpNumber(e.target.value);
                  }}/>
                </div>

                <div className="mb-3">
                  <label for="employeeBasicSalary" className="form-label">Basic Salary : </label>
                  <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="employeeBasicSalary" placeholder="Enter a Basic Salary" min="1" title="Please enter a valid amount" required 
                  onChange={(e)=>{
                    setEmpBasic(e.target.value);
                  }}/>
                </div>

                <div className="mb-3">
                  <label for="employeeAllowance" className="form-label">Allowance : </label>
                  <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="employeeAllowance" placeholder="Enter the Allowance" min="1" title="Please enter a valid amount" required 
                  onChange={(e) =>{
                    setEmpAllowance(e.target.value);
                  }}/>
                </div>

                <div className="mb-3">
                  <label for="employeeIncentive" className="form-label">Incentive : </label>
                  <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="employeeIncentive" placeholder="Enter the Incentive" min="1" title="Please enter a valid amount"  required 
                  onChange={(e) =>{
                    setEmpIncentive(e.target.value);
                  }}/>

                </div>
                <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Submit Salary</button>
              </form>
              </div>
              
    </div>

  );
}
  export default SalaryCreateForm;