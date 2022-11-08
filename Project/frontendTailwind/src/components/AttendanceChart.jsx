import React, { useState, useEffect }from 'react'
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel, } from '@syncfusion/ej2-react-charts';
import axios from 'axios';
import ChartsHeader from './ChartsHeader'
import { useStateContext } from '../contexts/ContextProvider';

const AttendanceChart = ({empNo}) => {
  const { currentMode } = useStateContext();
  const [ attendance, setAttendance ] = useState([]);
  const getAttendance = () => {
    axios
      .get(`http://localhost:8070/attendance/viewAllAttendanceNumber/${empNo}`)
      .then((res) => {
        setAttendance(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => { //useEffect is used to call the function getMaintainence 
    getAttendance ();
  }, []);

  const attCount = attendance.filter((att) => new Date(employeeInTime).getMonth() == new Date().getMonth()).length;

  return (
    <div>
      <ChartsHeader category="Chart" title="Attendance" />
      <ChartComponent>
        <Inject services={[ColumnSeries, Legend, Category, Tooltip, DataLabel]} />
        <SeriesCollectionDirective>
          <SeriesDirective dataSource={attendance} xName="month" yName="count" name="Attendance" type="Column" marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }} >
          </SeriesDirective>
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  )
}

export default AttendanceChart