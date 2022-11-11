import React, {useState, useEffect} from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel } from '@syncfusion/ej2-react-charts';
import axios from 'axios';
import ChartsHeader from './ChartsHeader'
import { useStateContext } from '../contexts/ContextProvider';

const SalaryBarChart = () => {
const { currentMode } = useStateContext();  
const [sal, setSalary] = useState([]); 

  const getSalary = async () => {
    axios
      .get('http://localhost:8070/salary/SalaryView')
      .then((res) => {
        setSalary(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getSalary();
  }, []);

const salCount = sal.length;

const under50 = sal.filter((sal) => (sal.employeeIncentive + sal.employeeAllowance + sal.employeeBasicSalary) < 50000).length;
const between50and150 = sal.filter((sal) => (sal.employeeIncentive + sal.employeeAllowance + sal.employeeBasicSalary) > 50000 && (sal.employeeIncentive + sal.employeeAllowance + sal.employeeBasicSalary) < 150000).length;
const over150 = sal.filter((sal) => (sal.employeeIncentive + sal.employeeAllowance + sal.employeeBasicSalary) > 150000).length;
    
const barPrimaryXAxis = {
  valueType: 'Category', 
  majorGridLines: { width: 0 } ,
  title: 'Salary Range',
  labelStyle: { 
      color: currentMode === 'Dark' ? '#e9ecef' : '#343a40'}, 
  titleStyle: { 
      color: currentMode === 'Dark' ? '#e9ecef' : '#343a40', 
      fontSize: '16px',
      fontWeight: 'bold'}
    };
    const barPrimaryYAxis = {
      labelFormat: '{value} employees', 
      title : "No. of Employees",
      interval: 1,
      labelStyle: { 
          color: currentMode === 'Dark' ? '#e9ecef' : '#343a40'}, 
      titleStyle: { 
          color: currentMode === 'Dark' ? '#e9ecef' : '#343a40', 
          fontSize: '16px',
          fontWeight: 'bold'},
    };

    const barChartData = [
          { x: 'Under 50,000 LKR ', y: under50, color: '#004777' },
          { x: 'Between 50,001 LKR & 250,000 LKR', y: between50and150, color: '#A30000' },
          { x: 'Between 250,001 LKR & 500,000 LKR', y: over150, color: '#FF7700' },
          { x: 'Over 500,001 LKR', y: over150, color: '#EAD94C' },
      ];

      return (
        <div>
          <ChartsHeader category="Salary Ranges of Employees"  />
          <div className=" w-full">
            <ChartComponent
            
              id="charts"
              primaryXAxis={barPrimaryXAxis}
              primaryYAxis={barPrimaryYAxis}
              tooltip={{ enable: true }}
              background={currentMode === 'Dark' ? '#3f434c' : '#f2f2f2'}
              legendSettings={{ background: '#f3f4f6' }}
            >
              <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]} />
              <SeriesCollectionDirective>
                <SeriesDirective dataSource={barChartData} xName="x" yName="y" name="Salary Ranges" type="Column" pointColorMapping='color' marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }} />
              </SeriesCollectionDirective>
            </ChartComponent>
          </div>
        </div>
      );
    };
    
    export default SalaryBarChart;