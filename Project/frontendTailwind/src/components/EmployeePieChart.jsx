import React, { useState, useEffect }from 'react'
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip } from '@syncfusion/ej2-react-charts';
import axios from 'axios';

const EmployeePieChart = () => {
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

  return (
    <div>
        <AccumulationChartComponent title='Employee Distribution by Departments' legendSettings={{position:"Bottom"}} tooltip={{enable:true}}>
            <Inject services={[PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip]} />
            <AccumulationSeriesCollectionDirective>
                <AccumulationSeriesDirective 
                    type="Pie"
                    innerRadius="50%"
                    dataSource={
                        [
                            { x: 'Finance', y: (empFin/empCount*100).toPrecision(4), text: (empFin/empCount*100).toPrecision(2) + '%'},
                            { x: 'Sales', y: (empSales/empCount*100).toPrecision(4), text: (empSales/empCount*100).toPrecision(2) + '%'},
                            { x: 'Transportation', y: (empTrans/empCount*100).toPrecision(4), text: (empTrans/empCount*100).toPrecision(2) + '%'},
                            { x: 'Production', y: (empProd/empCount*100).toPrecision(4), text: (empProd/empCount*100).toPrecision(2) + '%'},
                        ]
                    }
                    xName="x"
                    yName="y"
                    dataLabel={{
                        visible: true,
                        position: 'Outside',
                        name: 'text',
                    }}
                    >
                    
                </AccumulationSeriesDirective>
            </AccumulationSeriesCollectionDirective>

        </AccumulationChartComponent>
    </div>
  )
}

export default EmployeePieChart