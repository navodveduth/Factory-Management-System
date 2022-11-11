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
  [
    { x: 'Total stock', y: itemCount },
  ],
  [
    { x: 'Raw Materials', y: countRM },
  ],
  [
    { x: 'Work in Progress', y: countWIP },
  ],
]

const barCustomSeries = [
  {
    dataSource: barChartData[0],
    xName: 'x',
    yName: 'y',
    name: 'Total',
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
    name: 'Raw Materials',
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
    name: 'Work in Progress',
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

const colors = ['#1363DF', '#F87474', '#47B5FF', '#FF8C00', '#4B0082'];

return (
  <div className="m-0 md:m-10 mt-0 p-0 max-h-21 bg-white dark:bg-secondary-dark-bg rounded-3xl">
    <ChartsHeader category="Stocks Analysis" />
    <div className=" w-full">
      <ChartComponent

        id="charts"
        primaryXAxis={barPrimaryXAxis}
        primaryYAxis={barPrimaryYAxis}
        chartArea={{ border: { width: 2 } }}
        tooltip={{ enable: true }}
        background={currentMode === 'Dark' ? '#33373E' : '#f3f4f6'}
        palettes={colors}
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

export default StockBarChart;