import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../components';

const LeaveUpdate = () => {
  
  const navigate = useNavigate();

  const [employeeNumber, setEmployeeNumber] = useState("");
  const [leaveStartDate, setLeaveStartDate] = useState("");
  const [leaveEndDate, setLeaveEndDate] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [leaveStatus, setLeaveStatus] = useState("");

  const { id } = useParams();

  const getLeave = () => {
    axios.get(`http://localhost:8070/leave/viewLeave/${id}`)
    .then((res) => {
      const start = new Date(res.data.leaveStartDate).toISOString().split('T')[0];
      const end = new Date(res.data.leaveEndDate).toISOString().split('T')[0];
      setEmployeeNumber(res.data.employeeNumber);
      setLeaveStartDate(start);
      setLeaveEndDate(end);
      setLeaveType(res.data.leaveType);
      setLeaveReason(res.data.leaveReason);
      setLeaveStatus(res.data.leaveStatus);
    })
    .catch((err) => {
      alert(err.message);
    })
  }

  useEffect(() => {
    getLeave();
  }, []);

  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white '>
        <Header category="Form" title="Update Leave Request" />
                <div className=" flex items-center justify-center">

                    <form className="" onSubmit={async(e)=>{
                        e.preventDefault();
                        
                        
                        const newEmployee = {
                            employeeNumber,
                            leaveStartDate,
                            leaveEndDate,
                            leaveType,
                            leaveReason,
                            leaveStatus
                        }

                        await axios.put("http://localhost:8070/leave/updateLeave/"+ id, newEmployee)
                            .then((res)=>{
                                alert("Data updated successfully");
                            navigate('/LeaveViewAll');
                            })
                            .catch((err)=>{
                                console.log(err);
                                alert("Error occured");
                            })
                            
                    }}>

                        <div className="mb-3">
                            <label htmlFor="employeeNumber" className="text-md">Employee Number : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeNumber" defaultValue={employeeNumber} placeholder="Enter the employee number" required 
                                onChange={(e)=>{
                                    setEmployeeNumber(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="leaveStartDate" className="text-md">Leave Start Date : </label>
                            <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="leaveStartDate" defaultValue={leaveStartDate} placeholder="Enter the leave start date" required 
                                onChange={(e)=>{
                                    setLeaveStartDate(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="leaveEndDate" className="text-md">Leave End Date : </label>
                            <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="leaveEndDate" defaultValue={leaveEndDate} placeholder="Enter the leave end date" required 
                                onChange={(e)=>{
                                    setLeaveEndDate(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="leaveType" className="text-md">Leave Type : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="leaveType" defaultValue={leaveType} placeholder="Enter the leave type" required 
                                onChange={(e)=>{
                                    setLeaveType(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="leaveReason" className="text-md">Leave Reason : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="leaveReason" defaultValue={leaveReason} placeholder="Enter the leave reason" required 
                                onChange={(e)=>{
                                    setLeaveReason(e.target.value);
                                }}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="leaveStatus" className="text-md">Leave Status : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="leaveStatus" defaultValue={leaveStatus} placeholder="Enter the leave status" required 
                                onChange={(e)=>{
                                    setLeaveStatus(e.target.value);
                                }}/>
                        </div>

                    <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Submit</button>
                    </form>
                </div>
    </div>
  )
}

export default LeaveUpdate