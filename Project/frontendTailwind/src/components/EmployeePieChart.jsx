import React, { useState, useEffect }from 'react'
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip } from '@syncfusion/ej2-react-charts';
import axios from 'axios';
import ChartsHeader from './ChartsHeader'
import { useStateContext } from '../contexts/ContextProvider';

const EmployeePieChart = () => {
    const { currentMode } = useStateContext();
    const [employee, setEmployee] = useState([]);

    const getEmployee = async () => {
      axios
        .get('http://localhost:8070/employee/viewEmployee')
        .then((res) => {
          setEmployee(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    };
  
    useEffect(() => {
      getEmployee();
    }, []);
  
    const empCount = employee.length;
    const empFin= employee.filter((emp) => emp.employeeDepartment === 'Finance').length;
    const empSales= employee.filter((emp) => emp.employeeDepartment === 'Sales').length;
    const empTrans= employee.filter((emp) => emp.employeeDepartment === 'Transportation').length;
    const empProd= employee.filter((emp) => emp.employeeDepartment === 'Production').length;
    const empMaint= employee.filter((emp) => emp.employeeDepartment === 'Maintenance').length;
    const empHR= employee.filter((emp) => emp.employeeDepartment === 'Human Resources').length;

  return (
    <div>
      <ChartsHeader category="Chart" title="Employee Distribution by Departments" />
        <AccumulationChartComponent legendSettings={{position:"Right", background: "white"}} tooltip={{enable:true}} background={currentMode === 'Dark' ? '#3f434c' : '#f2f2f2'} >
            <Inject services={[PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip]} />
            <AccumulationSeriesCollectionDirective>
                <AccumulationSeriesDirective 
                  type="Pie"
                  dataSource={
                      [
                          { x: 'Finance', y: (empFin/empCount*100).toPrecision(4), text: (empFin/empCount*100).toPrecision(2) + '%'},
                          { x: 'Sales', y: (empSales/empCount*100).toPrecision(4), text: (empSales/empCount*100).toPrecision(2) + '%'},
                          { x: 'Transportation', y: (empTrans/empCount*100).toPrecision(4), text: (empTrans/empCount*100).toPrecision(2) + '%'},
                          { x: 'Production', y: (empProd/empCount*100).toPrecision(4), text: (empProd/empCount*100).toPrecision(2) + '%'},
                          { x: 'Maintenance', y: (empMaint/empCount*100).toPrecision(4), text: (empMaint/empCount*100).toPrecision(2) + '%'},
                          { x: 'Human Resources', y: (empHR/empCount*100).toPrecision(4), text: (empHR/empCount*100).toPrecision(2) + '%'},
                      ]
                  }
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

export default EmployeePieChart;
