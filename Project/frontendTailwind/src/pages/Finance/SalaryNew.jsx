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
              <Header category="Form" title=" New Cash Transaction" />
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
                             
                      navigate('/SalaryView');
                      })
                      .catch((err)=>{
                          console.log(err);
                          alert("Error occured");
                      })
                      
                   
              }}>

                <div className="mb-3">
                  <label for="employeeNumber" className="form-label">Employee Number : </label>
                  <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="employeeNumber" placeholder="Enter the Employee Number" required 
                  onChange={(e)=>{
                    setEmpNumber(e.target.value);
                  }}/>
                </div>

                <div className="mb-3">
                  <label for="employeeBasicSalary" className="form-label">Basic Salary : </label>
                  <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="employeeBasicSalary" placeholder="Enter a Basic Salary" required 
                  onChange={(e)=>{
                    setEmpBasic(e.target.value);
                  }}/>
                </div>

                <div className="mb-3">
                  <label for="employeeAllowance" className="form-label">Allowance : </label>
                  <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="employeeAllowance" placeholder="Enter the Allowance" required 
                  onChange={(e) =>{
                    setEmpAllowance(e.target.value);
                  }}/>
                </div>

                <div className="mb-3">
                  <label for="employeeIncentive" className="form-label">Incentive : </label>
                  <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="employeeIncentive" placeholder="Enter the Incentive" required 
                  onChange={(e) =>{
                    setEmpIncentive(e.target.value);
                  }}/>

                </div>
                <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Submit Transaction</button>
              </form>
              </div>
              
    </div>

  );
}
  export default SalaryCreateForm;