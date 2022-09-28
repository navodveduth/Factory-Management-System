import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../components';

const AttendanceUpdate = () => {

  const navigate = useNavigate();

  const [employeeNumber, setEmployeeNumber] = useState('');
  const [attendanceDate, setAttendanceDate] = useState('');
  const [employeeInTime, setEmployeeInTime] = useState('');
  const [employeeOutTime, setEmployeeOutTime] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState('');

  const {id} = useParams();

  const getAttendance = () => {
    axios.get(`http://localhost:8070/attendance/viewAttendance/${id}`)
    .then((res) => {
      const date = new Date(res.data.attendanceDate).toISOString().split('T')[0];
      
      setEmployeeNumber(res.data.employeeNumber);
      setAttendanceDate(date);
      setEmployeeInTime(res.data.employeeInTime);
      setEmployeeOutTime(res.data.employeeOutTime);
      setAttendanceStatus(res.data.attendanceStatus);
    })
    .catch((err) => {
      alert(err.message);
    });
  };

  useEffect(() => {
    getAttendance();
  }, []);

  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white '>
        <Header category="Form" title="Update Attendance" />
                <div className=" flex items-center justify-center">

                    <form className="" onSubmit={async(e)=>{
                        e.preventDefault();
                        
                        
                        const NewAttendace = {
                            employeeNumber,
                            attendanceDate,
                            employeeInTime,
                            employeeOutTime,
                            attendanceStatus
                        }

                        await axios.put("http://localhost:8070/attendance/updateAttendance/"+ id, NewAttendace)
                            .then((res)=>{
                                alert("Data updated successfully");
                            navigate('/AttendanceViewAll');
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
                            <label htmlFor="attendanceDate" className="text-md">Attendance Date : </label>
                            <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="attendanceDate" defaultValue={attendanceDate} placeholder="Enter the attendance date" required 
                                onChange={(e)=>{
                                    setAttendanceDate(e.target.value);
                                }}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="employeeInTime" className="text-md">Employee In Time : </label>
                            <input type="datetime-local" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeInTime" defaultValue={employeeInTime} placeholder="Enter the employee in time" required 
                                onChange={(e)=>{
                                    setEmployeeInTime(e.target.value);
                                }}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="employeeOutTime" className="text-md">Employee Out Time : </label>
                            <input type="datetime-local" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="employeeOutTime" defaultValue={employeeOutTime} placeholder="Enter the employee out time" required 
                                onChange={(e)=>{
                                    setEmployeeOutTime(e.target.value);
                                }}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="attendanceStatus" className="text-md">Attendance Status : </label>
                            <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                id="attendanceStatus" defaultValue={attendanceStatus} placeholder="Enter the attendance status" required 
                                onChange={(e)=>{
                                    setAttendanceStatus(e.target.value);
                                }}/>
                        </div>

                    <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Submit</button>
                    </form>
                </div>
    </div>
  )
}

export default AttendanceUpdate