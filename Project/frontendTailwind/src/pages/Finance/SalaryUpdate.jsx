import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';

function SalaryUpdate() {
    //useNavigate is a hook that is used to navigate to another page
    const navigate = useNavigate();

    const [employeeNumber, setEmpNumber] = useState('');
    const [employeeBasicSalary, setEmpBasic] = useState('');
    const [employeeAllowance, setEmpAllowance] = useState('');
    const [employeeIncentive, setEmpIncentive] = useState('');
  

    const {id} = useParams(); //get the id from the url

    const getSalary = () => {
        axios.get(`http://localhost:8070/salary/SalaryView/${id}`)
        .then((res) => {
            setEmpNumber(res.data.employeeNumber);
            setEmpBasic(res.data.employeeBasicSalary);
            setEmpAllowance(res.data.employeeAllowance);
            setEmpIncentive(res.data.employeeIncentive);
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    useEffect(() => {
        getSalary();
    }, [])


  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white '>
        <Header category="Form" title="Update Salary Entry" />
                <div className=" flex items-center justify-center">

                    <form className="" onSubmit={async(e)=>{
                        e.preventDefault();
                        
                        
                        const newSalary = {
                            employeeNumber,
                            employeeBasicSalary,
                            employeeAllowance,
                            employeeIncentive ,
                        }

                        await axios.put("http://localhost:8070/salary/updateSalary/"+ id, newSalary)
                            .then((res)=>{
                                alert("Data updated successfully");
                            navigate('/SalaryViewAll');
                            })
                            .catch((err)=>{
                                console.log(err);
                                alert("Error 404");
                            })
                            
                    }}>

                        <div className="mb-3">
                            <label htmlFor="trnNumber" className="text-md">Employee Number : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="trnNumber" defaultValue={employeeNumber} placeholder="Enter Transaction ID" required 
                                onChange={(e)=>{
                                    setEmpNumber(e.target.value);
                                }}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="trnDescription" className="form-label">Basic Salary : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="trnDescription" defaultValue={employeeBasicSalary} placeholder="Enter Transaction Description" required 
                                onChange={(e)=>{
                                    setEmpBasic(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="trnAmount" className="form-label">Allowance : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="trnAmount" defaultValue={employeeAllowance} placeholder="Enter Amount" required 
                                onChange={(e) =>{
                                    setEmpAllowance(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="trnAmount" className="form-label">Incentives : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="trnAmount" defaultValue={employeeIncentive} placeholder="Enter Amount" required 
                                onChange={(e) =>{
                                    setEmpIncentive(e.target.value);
                                }}/>
                        </div>


                    <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Submit</button>
                    </form>
                </div>
    </div>
  )
}

export default SalaryUpdate;