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
    interval: 1,
    majorGridLines: { width: 0 },
    };
    const barPrimaryYAxis = {
    majorGridLines: { width: 0 },   
    majorTickLines: { width: 0 },
    lineStyle: { width: 0 },
    labelStyle: { color: 'transparent' },
    };

    const barChartData = [
        [
          { x: 'Under 50,000 LKR ', y: under50 },
        ],
        [
          { x: 'Between 50,001 LKR & 150,000 LKR', y: between50and150 },
        ],
        [
          { x: 'Between 150,001 LKR & 250,000 LKR', y: over150 },
        ],
        [
          { x: 'Between 250,001 LKR & 250,000 LKR', y: over150 },
        ],
        [
          { x: 'Between 350,001 LKR & 500,000 LKR', y: over150 },
        ],  
        [
          { x: 'Over 500,001 LKR', y: over150 },
        ],
      ]
    
      const barCustomSeries = [
        {
          dataSource: barChartData[0],
          xName: 'x',
          yName: 'y',
          name: ' < 50,000 LKR',
          type: 'Column',
          marker: {
            dataLabel: {
              visible: false,
              position: 'Top',
              font: { fontWeight: '600', color: '#ffffff' },
            },
          },
        },
        {
          dataSource: barChartData[1],
          xName: 'x',
          yName: 'y',
          name: '50,000 LKR - 150,000 LKR',
          type: 'Column',
          marker: {
            dataLabel: {
              visible: false,
              position: 'Top',
              font: { fontWeight: '600', color: '#ffffff' },
            },
          },
        },
        {
          dataSource: barChartData[2],
          xName: 'x',
          yName: 'y',
          name: '> 150,000 LKR',
          type: 'Column',
          marker: {
            dataLabel: {
              visible: false,
              position: 'Top',
              font: { fontWeight: '600', color: '#ffffff' },
            },
          },
        },
      ];
    
    
      return (
        <div className="m-0 md:m-10 mt-0 p-0 max-h-21 bg-white dark:bg-secondary-dark-bg rounded-3xl">
          <ChartsHeader category="Salary Ranges of Employees"  />
          <div className=" w-full">
            <ChartComponent
            
              id="charts"
              primaryXAxis={barPrimaryXAxis}
              primaryYAxis={barPrimaryYAxis}
              chartArea={{ border: { width: 0 } }}
              tooltip={{ enable: true }}
              background={currentMode === 'Dark' ? '#33373E' : '#f3f4f6'}
              legendSettings={{ background: '#f3f4f6' }}
            >
              <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]} />
              <SeriesCollectionDirective>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                {barCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
              </SeriesCollectionDirective>
            </ChartComponent>
          </div>
        </div>
      );
    };
    
    export default SalaryBarChart;