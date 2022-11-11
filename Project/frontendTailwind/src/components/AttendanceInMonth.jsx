import React, { useState, useEffect }from 'react'
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel, } from '@syncfusion/ej2-react-charts';
import axios from 'axios';
import ChartsHeader from './ChartsHeader'
import { useStateContext } from '../contexts/ContextProvider';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars'

const AttendanceInMonth = ({employeeNumber}) => {
  const { currentMode } = useStateContext();
  const [ attendance, setAttendance ] = useState([]);
  const [ month, setMonth ] = useState('');
  const [ year, setYear ] = useState('');

  const tooltip = { enable: true, shared: false };

  const primaryYAxis = { labelFormat: '{value} Hours', 
                          title: "Total Hours Worked", 
                          labelStyle: { 
                            color: currentMode === 'Dark' ? '#e9ecef' : '#343a40'}, 
                          titleStyle: { 
                          color: currentMode === 'Dark' ? '#e9ecef' : '#343a40', 
                          fontSize: '16px',
                          fontWeight: 'bold'},
                          interval: 5,
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
  
  const handleDateChange = (e) => {
    if(e.value) {
        const date = e.target.value;
        const months = date.getMonth();
        const years = date.getFullYear();
        setMonth(months);
        setYear(years);
    }
  }

  const employeeAttendaceByMonth = attendance.filter((item) => {
    return new Date(item.employeeInTime).getFullYear() == year && new Date(item.employeeInTime).getMonth() == month;
  });

  const arrayOfDatesforMonth = month => {
    const date = new Date(year, month, 1);
    const dates = []; 
    while (date.getMonth() === month) { 
      dates.push(new Date(date).getDate());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  //assign working hours to each date
  const workingHoursWithDate = arrayOfDatesforMonth(month).map((date) => {
    const employeeAttendanceByDate = employeeAttendaceByMonth.filter((item) => {
      return new Date(item.employeeInTime).getDate() == date;
    });
    const workingHours = employeeAttendanceByDate.reduce((acc, item) => {
      return acc + item.employeeTotalHours;
    }, 0);
    return { date, workingHours };
  });

  const employeeAttendaceByMonthMap = employeeAttendaceByMonth.map((item) => {
    return {
      date: new Date(item.employeeInTime).getDate(),
      totalWorkingHours: item.employeeTotalHours,
    };
  });

  const sort = workingHoursWithDate.sort((a, b) => {
    return a.date - b.date; 
  });

  const colors = ['#258EA6', '#F3A738', '#32CD32', '#FF8C00', '#4B0082'];

  return (
    <div>
      <ChartsHeader category="Chart" title="Working hours distribution" />
      <div className=" flex items-center mb-5 "> {/* this code needed for the datesort function*/}
        <div className=" bg-slate-100 pt-1 rounded-lg px-5 w-56">
          <DatePickerComponent  placeholder="Select a month " start="Year" depth="Year" format="MMM yyyy" onChange={handleDateChange} />
        </div>
        <div className="ml-5">
            <button type="button"  className="py-2 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500">Filter</button>
        </div>
      </div>
      <div id='chart'>
        <ChartComponent primaryXAxis={primaryXAxis} primaryYAxis={primaryYAxis} tooltip={tooltip} 
        background={currentMode === 'Dark' ? '#3f434c' : '#f2f2f2'} palettes={colors} legendSettings={{background: "white"}}>
        <Inject services={[ColumnSeries, Category, Tooltip, DataLabel]} />
        <SeriesCollectionDirective>
          <SeriesDirective dataSource={sort} xName="date" yName="workingHours" name="Working Hours" type="Column" marker={{ dataLabel: { visible: false, position: 'Middle', font: { fontWeight: '600', color: '#ffffff' } } }} />
        </SeriesCollectionDirective>
      </ChartComponent>
      </div>
    </div>
  )
}

export default AttendanceInMonth