import React, {useState, useEffect} from 'react';
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
    const countFG = stock.filter((stk) => stk.stockCategory === 'Finished goods').length;

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
      { x: 'Total stock', y: itemCount },
    ],
    [
      { x: 'Raw Materials', y: countRM },
    ],
    [
      { x: 'Work in Progress', y: countWIP },
    ],
    [
      { x: 'Finished Goods', y: countFG },
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
    {
        dataSource: barChartData[3],
        xName: 'x',
        yName: 'y',
        name: 'Finished Goods',
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
      <ChartsHeader category="Stock Information"  />
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

export default StockBarChart;