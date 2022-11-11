import React, { useState, useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel } from '@syncfusion/ej2-react-charts';
import axios from 'axios';
import { ChartsHeader } from '../components';
import { useStateContext } from '../contexts/ContextProvider';


const StockBarChart = () => {
  const { currentMode } = useStateContext();

  const [stock, setStock] = useState([]); //stock is the state variable and setStock is the function to update the state variable

  const getStock = async () => {  //getStock is the function to get the data from the backend
    axios.get("http://localhost:8070/stock")
      .then((res) => {
        setStock(res.data); //setStock is used to update the state variable
        console.log(res.data);
      })
      .catch((err) => {
        alert(err.message);
      })
  }

  useEffect(() => { //useEffect is used to call the function getStock
    getStock();
  }, [])

  const itemCount = stock.length;
  const countRM = stock.filter((stk) => stk.stockCategory === 'Raw materials').length;
  const countWIP = stock.filter((stk) => stk.stockCategory === 'Work in progress').length;

  const barPrimaryXAxis = {
    valueType: 'Category',
    interval: 1,
    majorGridLines: { width: 0 },
    majorTickLines: { width: 2 },
    labelStyle: {
      color: currentMode === 'Dark' ? '#e9ecef' : '#343a40'
    },
    titleStyle: {
      color: currentMode === 'Dark' ? '#e9ecef' : '#343a40',
      fontSize: '16px'
    }
  }

const barPrimaryYAxis = {
  majorGridLines: { width: 2 },
  majorTickLines: { width: 4 },
  lineStyle: { width: 4 },
  labelFormat: '{value}',
  labelStyle: {
    color: currentMode === 'Dark' ? '#e9ecef' : '#343a40'
  },
  titleStyle: {
    color: currentMode === 'Dark' ? '#e9ecef' : '#343a40',
    fontSize: '16px'
  },
  interval: 1,
}

const barChartData = [
    { x: 'Total stock', y: itemCount, color: "#258EA6"},
    { x: 'Raw Materials', y: countRM, color: "#F3A738" },
    { x: 'Work in Progress', y: countWIP, color: "#FF5A5F" },
];

return (
  <div>
    <ChartsHeader category="Stocks Analysis" />
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
          <SeriesDirective dataSource={barChartData} xName='x' yName='y' name='Stock Analysis' type='Column' columnWidth="0.5" pointColorMapping ="color" marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }}/>
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  </div>
);
};

export default StockBarChart;