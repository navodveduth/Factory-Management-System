import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../components';

function LeaveNew() {
  const navigate = useNavigate(); //useNavigate hook to redirect to another page after form submission is successful

  const [employeeNumber, setEmployeeNumber] = useState('');
  const [leaveStartDate, setLeaveStartDate] = useState('');
  const [leaveEndDate, setLeaveEndDate] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveStatus, setLeaveStatus] = useState('');
  
return (
  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
            <Header category="Form" title=" Request Leave" />
            <div className=" flex items-center justify-center "> 
            <form onSubmit={async(e)=>{
                e.preventDefault();
                
                const newLeave = {
                    employeeNumber,
                    leaveStartDate,
                    leaveEndDate,
                    leaveType,
                    leaveReason,
                    leaveStatus
                }

                await axios.post("http://localhost:8070/leave/createLeave", newLeave)
                    .then((res)=>{
                        alert("Data saved successfully");
                           //navigate to the machinery view page
                    navigate('/LeaveViewAll');
                    })
                    .catch((err)=>{
                        console.log(err);
                        alert("Error occured");
                    })
                    
                 
            }}>

              <div className="mb-3">
                <label htmlFor="employeeNumber" className="form-label">Employee Number</label>
                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="employeeNumber" placeholder="Enter Employee Number" value={employeeNumber} onChange={(e)=>{
                    setEmployeeNumber(e.target.value);
                }}/>
              </div>
              <div className="mb-3">
                <label htmlFor="leaveStartDate" className="form-label">Leave Start Date</label>
                <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="leaveStartDate" placeholder="Enter Leave Start Date" value={leaveStartDate} onChange={(e)=>{
                    setLeaveStartDate(e.target.value);
                }}/>
              </div>
              <div className="mb-3">
                <label htmlFor="leaveEndDate" className="form-label">Leave End Date</label>
                <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="leaveEndDate" placeholder="Enter Leave End Date" value={leaveEndDate} onChange={(e)=>{
                    setLeaveEndDate(e.target.value);
                }}/>
              </div>
              <div className="mb-3">
                <label htmlFor="leaveType" className="form-label">Leave Type</label>
                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="leaveType" placeholder="Enter Leave Type" value={leaveType} onChange={(e)=>{
                    setLeaveType(e.target.value);
                }}/>
              </div>
              <div className="mb-3">
                <label htmlFor="leaveReason" className="form-label">Leave Reason</label>
                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="leaveReason" placeholder="Enter Leave Reason" value={leaveReason} onChange={(e)=>{
                    setLeaveReason(e.target.value);
                }}/>
              </div>
              <div className="mb-3">
                <label htmlFor="leaveStatus" className="form-label">Leave Status</label>
                <select className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                id="leaveReason" aria-label="Default select example" required
                onChange={(e)=>{
                  setLeaveStatus(e.target.value);
                }}>
                  <option selected>Select Status</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Request Leave</button>
            </form>
            </div>
          </div>
    );
}
export default LeaveNew