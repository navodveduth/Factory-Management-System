import React, {useState, useEffect} from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel } from '@syncfusion/ej2-react-charts';
import axios from 'axios';
import ChartsHeader from './ChartsHeader'
import { useStateContext } from '../contexts/ContextProvider';

const AttendanceBarChart = () => {
  const { currentMode } = useStateContext();
  const [ employee, setEmployee ] = useState([]);
  const [ attendance, setAttendance ] = useState([]);

  const getEmployee = () => {
    axios
      .get('http://localhost:8070/employee/viewEmployee')
      .then((res) => {
        setEmployee(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const getAttendance = () => {
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
    getEmployee();
    getAttendance();
  }, []);

  const empCount = employee.length;
  const countPresent = attendance.filter((att) => new Date(att.employeeInTime).toISOString().split('T')[0] === new Date().toISOString().split('T')[0]).length;
  const countAbsent = empCount - countPresent;

  
  return (
    <div>
        <ChartsHeader category="Chart" title="Today's Attendance" />
        <ChartComponent 
            primaryXAxis={{ 
                valueType: 'Category', 
                majorGridLines: { width: 0 } ,
                title: 'Attendance Status',
                labelStyle: { 
                    color: currentMode === 'Dark' ? '#e9ecef' : '#343a40'}, 
                titleStyle: { 
                    color: currentMode === 'Dark' ? '#e9ecef' : '#343a40', 
                    fontSize: '16px',
                    fontWeight: 'bold'} 
            }} 
            primaryYAxis={{ 
                labelFormat: '{value} employees', 
                title : "Employees",
                interval: 5,
                labelStyle: { 
                    color: currentMode === 'Dark' ? '#e9ecef' : '#343a40'}, 
                titleStyle: { 
                    color: currentMode === 'Dark' ? '#e9ecef' : '#343a40', 
                    fontSize: '16px',
                    fontWeight: 'bold'},
            }} 
            legendSettings={{ 
                visible: false 
            }} 
            tooltip={{ 
                enable: true 
            }} 
            background={currentMode === 'Dark' ? '#3f434c' : '#f2f2f2'}
        >
            <Inject services={[ColumnSeries, Legend, Category, Tooltip, DataLabel]} />
            <SeriesCollectionDirective>
                <SeriesDirective dataSource={
                    [
                        { x: 'Present', y: (countPresent) , text: (countPresent) + ' ' + 'Employees', color: '#419D78' },
                        { x: 'Absent', y: (countAbsent), text: (countAbsent) + ' ' + 'Employees', color: '#C14953'},
                    ]
                } xName='x' yName='y' name='Attendance' type='Column' columnWidth="0.5" pointColorMapping ="color" marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }} >
                </SeriesDirective>
            </SeriesCollectionDirective>
        </ChartComponent>
    </div>
  )
}

export default AttendanceBarChart