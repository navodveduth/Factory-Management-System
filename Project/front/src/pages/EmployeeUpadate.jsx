import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../components';

function EmployeeUpdate() {

    //useNavigate is a hook that is used to navigate to another page
    const navigate = useNavigate();

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

    const {id} = useParams(); //get the id from the url

    const getEmployee = () => {
        axios.get(`http://localhost:8070/employee/viewEmployee/${id}`)
        .then((res) => {
            const dob = new Date(res.data.employeeDOB).toISOString().split('T')[0];
            const doj = new Date(res.data.employeeDateOfJoin).toISOString().split('T')[0];
            setEmployeeNumber(res.data.employeeNumber);
            setEmployeeFullName(res.data.employeeFullName);
            setEmployeeNameWithInitials(res.data.employeeNameWithInitials);
            setEmployeeNIC(res.data.employeeNIC);
            setEmployeeGender(res.data.employeeGender);
            setEmployeeDOB(dob);
            setEmployeeDateOfJoin(doj);
            setEmployeeDesignation(res.data.employeeDesignation);
            setEmployeeDepartment(res.data.employeeDepartment);
            setEmployeeType(res.data.employeeType);
            setEmployeeAddress(res.data.employeeAddress);
            setEmployeeContactNumber(res.data.employeeContactNumber);
            setEmployeeEmail(res.data.employeeEmail);
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    useEffect(() => {
        getEmployee();
    })


  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white '>
        <Header category="Form" title="Update Employees" />
                <div className=" flex items-center justify-center">

                    <form className="" onSubmit={async(e)=>{
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

                        await axios.put("http://localhost:8070/employee/updateEmployee/"+ id, newEmployee)
                            .then((res)=>{
                                alert("Data updated successfully");
                            navigate('/EmployeeViewAll');
                            })
                            .catch((err)=>{
                                console.log(err);
                                alert("Error occured");
                            })
                            
                    }}>

                        <div className="mb-3">
                            <label htmlFor="employeeNumber" className="text-md">Employee Number : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeNumber" value={employeeNumber} placeholder="Enter the employee number" required 
                                onChange={(e)=>{
                                    setEmployeeNumber(e.target.value);
                                }}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="employeeFullName" className="form-label">Full name : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeFullName" value={employeeFullName} placeholder="Enter your full name" required 
                                onChange={(e)=>{
                                    setEmployeeFullName(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="employeeNameWithInitials" className="form-label">Name with initials : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeNameWithInitials" value={employeeNameWithInitials} placeholder="Enter your name with Initials" required 
                                onChange={(e) =>{
                                    setEmployeeNameWithInitials(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="employeeNIC" className="form-label">NIC number : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeNIC" value={employeeNIC} placeholder="Enter your NIC number" required 
                                onChange={(e) =>{
                                    setEmployeeNIC(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="employeeGender" className="form-label">Gender : </label>
                            <select className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeGender" defaultValue={employeeGender} aria-label="Default select example" required
                                onChange={(e) =>{
                                    setEmployeeGender(e.target.value);
                                }}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="employeeDOB" className="form-label">Date of Birth : </label>
                            <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeDOB" value={employeeDOB} placeholder="Enter your birthday"required 
                                onChange={(e) =>{
                                    setEmployeeDOB(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="employeeDateOfJoin" className="form-label">Date joined : </label>
                            <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeDateOfJoin" value={employeeDateOfJoin} placeholder="Enter your date of join"required
                                onChange={(e) =>{
                                    setEmployeeDateOfJoin(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="employeeDesignation" className="form-label">Designation : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeDesignation" value={employeeDesignation} placeholder="Enter your designation"required
                                onChange={(e) =>{
                                    setEmployeeDesignation(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="employeeDepartment" className="form-label">Department : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeDepartment" value={employeeDepartment} placeholder="Enter your department"required
                                onChange={(e) =>{
                                    setEmployeeDepartment(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="employeeAddress" className="form-label">Address : </label>
                                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeAddress" value={employeeAddress} placeholder="Enter your home address"required
                                onChange={(e) =>{
                                    setEmployeeAddress(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="employeeContactNumber" className="form-label">Contact Number : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeContactNumber" value={employeeContactNumber} placeholder="Enter your contact number"required
                                onChange={(e) =>{
                                    setEmployeeContactNumber(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="employeeEmail" className="form-label">Email : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeEmail" value={employeeEmail} placeholder="Enter your email"required
                                onChange={(e) =>{
                                    setEmployeeEmail(e.target.value);
                                }}/>
                        </div>



                    <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 rounded-lg hover:bg-red-600">Submit</button>
                    </form>
                </div>
    </div>
  )
}

export default EmployeeUpdate;