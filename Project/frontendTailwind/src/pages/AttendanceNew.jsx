import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../components';

function AttendanceNew() {

  const navigate = useNavigate();

  const [employeeNumber, setEmployeeNumber] = useState('');
  const [employeeInTime, setEmployeeInTime] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState('');
  
  var date = new Date();
  var currentDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, -8);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
              <Header category="Form" title=" Record Attendance" />
              <div className=" flex items-center justify-center "> 
              <form onSubmit={async(e)=>{
                  e.preventDefault();
                  
                  const newAttendance = {
                      employeeNumber,
                      employeeInTime,
                      attendanceStatus
                  }

                  console.log(newAttendance);
                  await axios.post("http://localhost:8070/attendance/createAttendance", newAttendance)
                      .then((res)=>{
                          alert("Data saved successfully");
                      navigate('/AttendanceViewAll');
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
                  pattern="[0-9]{4}" title="The Employee Number should contain 4 digits" maxLength={4} required 
                  onChange={(e)=>{
                      setEmployeeNumber(e.target.value);
                  }}/>
                </div>

                <div className="mb-3">
                  <label for="employeeInTime" className="form-label">Employee In Time : </label>
                  <input type="datetime-local" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="employeeInTime" placeholder="Enter the employee in time" required min={currentDateTime}
                  onChange={(e)=>{
                      setEmployeeInTime(e.target.value);
                  }}/>
                </div>

                <div className="mb-3">
                  <label for="attendanceStatus" className="form-label">Attendance Status : </label>
                  <select class="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                  id="attendanceStatus" aria-label="Default select example" title="Select the attendance status" required
                   onChange={(e) =>{
                    setAttendanceStatus(e.target.value);
                  }}>
                      <option selected>Select Status</option>
                      <option value="In">In</option>
                  </select>
                </div>
                
                <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Record Attendance</button>
              </form>
              </div>
    </div>
  );
};

export default AttendanceNew;