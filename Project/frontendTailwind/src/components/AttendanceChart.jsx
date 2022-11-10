import React, { useState, useEffect }from 'react'
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel, } from '@syncfusion/ej2-react-charts';
import axios from 'axios';
import ChartsHeader from './ChartsHeader'
import { useStateContext } from '../contexts/ContextProvider';

const AttendanceChart = ({employeeNumber}) => {
  const { currentMode } = useStateContext();
  const [ attendance, setAttendance ] = useState([]);
  const [ leave, setLeave ] = useState([]);

  const tooltip = { enable: true, shared: false };

  const primaryYAxis = { labelFormat: '{value} Days', 
                          title: "Days", 
                          labelStyle: { 
                            color: currentMode === 'Dark' ? '#e9ecef' : '#343a40'}, 
                          titleStyle: { 
                          color: currentMode === 'Dark' ? '#e9ecef' : '#343a40', 
                          fontSize: '16px',
                          fontWeight: 'bold'},
                          interval: 5,
                        };
                        
  const primaryXAxis = { valueType: 'Category', 
                          title: "Month",
                          labelStyle: { 
                          color: currentMode === 'Dark' ? '#e9ecef' : '#343a40'}, 
                          titleStyle: { 
                          color: currentMode === 'Dark' ? '#e9ecef' : '#343a40', 
                          fontSize: '16px',
                          fontWeight: 'bold'} 
                        };

  const getAttendance = async () => {
    axios
      .get(`http://localhost:8070/attendance/viewAllAttendanceNum/${employeeNumber}`)
      .then((res) => {
        setAttendance(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const getLeave = async () => {
    axios
      .get(`http://localhost:8070/leave/viewLeavesNum/${employeeNumber}`)
      .then((res) => {
        setLeave(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  
  useEffect(() => {
    getAttendance ();
    getLeave ();
  }, []);

  // get the number of attendance for each month in a array
  const jan = attendance.filter((att) => new Date(att.employeeInTime).getMonth() == 0).length;
  const feb = attendance.filter((att) => new Date(att.employeeInTime).getMonth() == 1).length;
  const mar = attendance.filter((att) => new Date(att.employeeInTime).getMonth() == 2).length;
  const apr = attendance.filter((att) => new Date(att.employeeInTime).getMonth() == 3).length;
  const may = attendance.filter((att) => new Date(att.employeeInTime).getMonth() == 4).length;
  const jun = attendance.filter((att) => new Date(att.employeeInTime).getMonth() == 5).length;
  const jul = attendance.filter((att) => new Date(att.employeeInTime).getMonth() == 6).length;
  const aug = attendance.filter((att) => new Date(att.employeeInTime).getMonth() == 7).length;
  const sep = attendance.filter((att) => new Date(att.employeeInTime).getMonth() == 8).length;
  const oct = attendance.filter((att) => new Date(att.employeeInTime).getMonth() == 9).length;
  const nov = attendance.filter((att) => new Date(att.employeeInTime).getMonth() == 10).length;
  const dec = attendance.filter((att) => new Date(att.employeeInTime).getMonth() == 11).length;

  // get the number of leave for each month in a array
  const janLeave = leave.filter((leav) => new Date(leav.leaveStartDate).getMonth() == 0).length;
  const febLeave = leave.filter((leav) => new Date(leav.leaveStartDate).getMonth() == 1).length;
  const marLeave = leave.filter((leav) => new Date(leav.leaveStartDate).getMonth() == 2).length;
  const aprLeave = leave.filter((leav) => new Date(leav.leaveStartDate).getMonth() == 3).length;
  const mayLeave = leave.filter((leav) => new Date(leav.leaveStartDate).getMonth() == 4).length;
  const junLeave = leave.filter((leav) => new Date(leav.leaveStartDate).getMonth() == 5).length;
  const julLeave = leave.filter((leav) => new Date(leav.leaveStartDate).getMonth() == 6).length;
  const augLeave = leave.filter((leav) => new Date(leav.leaveStartDate).getMonth() == 7).length;
  const sepLeave = leave.filter((leav) => new Date(leav.leaveStartDate).getMonth() == 8).length;
  const octLeave = leave.filter((leav) => new Date(leav.leaveStartDate).getMonth() == 9).length;
  const novLeave = leave.filter((leav) => new Date(leav.leaveStartDate).getMonth() == 10).length;
  const decLeave = leave.filter((leav) => new Date(leav.leaveStartDate).getMonth() == 11).length;

  // attendance data
  const attendanceData = [
    { month: "Jan", attendance: jan },
    { month: "Feb", attendance: feb },
    { month: "Mar", attendance: mar },
    { month: "Apr", attendance: apr },
    { month: "May", attendance: may },
    { month: "Jun", attendance: jun },
    { month: "Jul", attendance: jul },
    { month: "Aug", attendance: aug },
    { month: "Sep", attendance: sep },
    { month: "Oct", attendance: oct },
    { month: "Nov", attendance: nov },
    { month: "Dec", attendance: dec },
  ];

  // leave data
  const leaveData = [
    { month: "Jan", leave: janLeave },
    { month: "Feb", leave: febLeave },
    { month: "Mar", leave: marLeave },
    { month: "Apr", leave: aprLeave },
    { month: "May", leave: mayLeave },
    { month: "Jun", leave: junLeave },
    { month: "Jul", leave: julLeave },
    { month: "Aug", leave: augLeave },
    { month: "Sep", leave: sepLeave },
    { month: "Oct", leave: octLeave },
    { month: "Nov", leave: novLeave },
    { month: "Dec", leave: decLeave },
  ];

  const colors = ['#258EA6', '#F3A738', '#32CD32', '#FF8C00', '#4B0082'];

  return (
    <div>
      <ChartsHeader category="Chart" title="Attendance vs Leaves - 2022" />
      <ChartComponent primaryXAxis={primaryXAxis} primaryYAxis={primaryYAxis} tooltip={tooltip} 
        background={currentMode === 'Dark' ? '#3f434c' : '#f2f2f2'} palettes={colors} legendSettings={{background: "white"}}>
        <Inject services={[ColumnSeries, Legend, Category, Tooltip, DataLabel]} />
        <SeriesCollectionDirective>
          <SeriesDirective dataSource={attendanceData} xName="month" yName="attendance" name="Attendance" type="Column" marker={{ dataLabel: { visible: false, position: 'Middle', font: { fontWeight: '600', color: '#ffffff' } } }} />
          <SeriesDirective dataSource={leaveData} xName="month" yName="leave" name="Leaves" type="Column" marker={{ dataLabel: { visible: false, position: 'Middle', font: { fontWeight: '600', color: '#ffffff' } } }} />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  )
}

export default AttendanceChart