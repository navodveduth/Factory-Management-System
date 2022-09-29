import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from "jspdf";
import { Header } from '../components';
import TableData from '../components/Table/TableData';
import TableHeader from '../components/Table/TableHeader';

const AttendanceReport = () => {

  const [attendance, setAttendance] = useState([]);

  const getAttendance = async () => {
    axios
      .get('http://localhost:8070/attendance/viewAttendance')
      .then((res) => {
        setAttendance(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getAttendance();
  }, []);

  const createPDF = () => {
    const pdf = new jsPDF("landscape", "px", "a1",false);
    const data = document.querySelector("#tableContainer");
    pdf.html(data).then(() => {
        pdf.save("Attendance Report.pdf");
       });
  };

  return (
    <div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">

        <Header category="Report" title="Attendance" />

        <div className=" flex items-center mb-5 ">
          <div className="mr-0 ml-auto">
            <button onClick={createPDF} type="button"  className="py-1 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" >Download Report</button>
          </div>
        </div>

        <div className="block w-full overflow-x-auto rounded-lg" id="tableContainer">
          <table className="w-full rounded-lg">
            <thead>
              <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                <TableHeader value="Employee ID" />
                <TableHeader value="Date" />
                <TableHeader value="In-Time" />
                <TableHeader value="Out-Time" />
                <TableHeader value="Status" />
              </tr>
            </thead>

            <tbody>
              {attendance.map((data, key) => {
                return (
                  <tr key={key} className="text-sm h-10 border dark:border-slate-600">
                    <TableData value={data.employeeNumber} />
                    <TableData value={new Date(data.employeeInTime).toISOString().split('T')[0]} />
                    <TableData value={new Date(data.employeeInTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} />
                    <TableData value={new Date(data.employeeOutTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} />
                    <TableData value={data.attendanceStatus} />
                  </tr>
                )
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AttendanceReport