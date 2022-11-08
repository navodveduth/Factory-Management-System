import React, { useState, useEffect }from 'react'
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip, } from '@syncfusion/ej2-react-charts';
import axios from 'axios';
import ChartsHeader from './ChartsHeader'
import { useStateContext } from '../contexts/ContextProvider';

const AttendancePieChart = () => {
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
        <AccumulationChartComponent legendSettings={{position:"Right", background: "white"}} tooltip={{enable:true}} background={currentMode === 'Dark' ? '#3f434c' : '#f2f2f2'} >
            <Inject services={[PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip ]} />
            <AccumulationSeriesCollectionDirective>
                <AccumulationSeriesDirective 
                  type="Pie"
                  dataSource={
                      [
                          { x: 'Present', y: (countPresent/empCount*100).toPrecision(4), text: (countPresent) + ' ' + 'Employees', color: '#419D78' },
                          { x: 'Absent', y: (countAbsent/empCount*100).toPrecision(4), text: (countAbsent) + ' ' + 'Employees', color: '#C14953'},
                      ]
                  }
                  pointColorMapping = "color"
                  xName="x"
                  yName="y"
                  innerRadius="40%"
                  startAngle={0}
                  endAngle={360}
                  radius="70%"
                  explode
                  explodeOffset="10%"
                  explodeIndex={2}
                  dataLabel={{
                    visible: true,
                    position: 'Outside',
                    name: 'text',
                    font: {
                      fontWeight: '600',
                    },
                  }}
                />
            </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
    </div>
  );
};

export default AttendancePieChart;
