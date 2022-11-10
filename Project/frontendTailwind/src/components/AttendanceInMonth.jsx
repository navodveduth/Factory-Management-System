import React, { useState, useEffect }from 'react'
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel, } from '@syncfusion/ej2-react-charts';
import axios from 'axios';
import ChartsHeader from './ChartsHeader'
import { useStateContext } from '../contexts/ContextProvider';

const AttendanceInMonth = ({employeeNumber}) => {
  const { currentMode } = useStateContext();
  const [ attendance, setAttendance ] = useState([]);

  const tooltip = { enable: true, shared: false };

  const primaryYAxis = { labelFormat: '{value} Hours', 
                          title: "Working Hours", 
                          labelStyle: { 
                            color: currentMode === 'Dark' ? '#e9ecef' : '#343a40'}, 
                          titleStyle: { 
                          color: currentMode === 'Dark' ? '#e9ecef' : '#343a40', 
                          fontSize: '16px',
                          fontWeight: 'bold'},
                          interval: 2,
                        };
                        
  const primaryXAxis = { valueType: 'Category', 
                          title: "Dates",
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

  useEffect(() => {
    getAttendance ();
  }, []);

  const year = new Date().getFullYear();
  const month = new Date().getMonth();

  const employeeAttendaceByMonth = attendance.filter((item) => {
    return new Date(item.employeeInTime).getFullYear() == year && new Date(item.employeeInTime).getMonth() == (month);
  });

  const employeeAttendaceByMonthMap = employeeAttendaceByMonth.map((item) => {
    return {
      date: new Date(item.employeeInTime).getDate(),
      totalWorkingHours: item.employeeTotalHours,
    };
  });

  const sort = employeeAttendaceByMonthMap.sort((a, b) => {
    return a.date - b.date; 
  });

  const colors = ['#258EA6', '#F3A738', '#32CD32', '#FF8C00', '#4B0082'];

  return (
    <div>
      <ChartsHeader category="Chart" title="Attendance vs Leaves" />
      <ChartComponent primaryXAxis={primaryXAxis} primaryYAxis={primaryYAxis} tooltip={tooltip} 
        background={currentMode === 'Dark' ? '#3f434c' : '#f2f2f2'} palettes={colors} legendSettings={{background: "white"}}>
        <Inject services={[ColumnSeries, Category, Tooltip, DataLabel]} />
        <SeriesCollectionDirective>
          <SeriesDirective dataSource={sort} xName="date" yName="totalWorkingHours" name="Working Hours" type="Column" marker={{ dataLabel: { visible: false, position: 'Middle', font: { fontWeight: '600', color: '#ffffff' } } }} />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  )
}

export default AttendanceInMonth