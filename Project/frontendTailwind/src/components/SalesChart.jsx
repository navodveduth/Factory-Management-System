import React, { useState, useEffect }from 'react'
import axios from 'axios';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, StackingColumnSeries, Tooltip } from '@syncfusion/ej2-react-charts';

const SalesChart = () => {
    const [sales, setSales] = useState([]);

    const getSales = async () => {
      axios
        .get('http://localhost:8070/sales/')
        .then((res) => {
          setSales(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    };
  
    useEffect(() => {
      getSales();
    }, []);
  
    const salesCount = sales.length;
    const finishedOrders= sales.filter((sale) => sale.status === 'Finished').length;
    const ongoingOrders= sales.filter((sale) => sale.status === 'Pending').length;
    const newOrders= sales.filter((sale) => sale.status === 'Placed').length;

    return (
      <ChartComponent
        id="charts"
        primaryXAxis={stackedPrimaryXAxis}
        primaryYAxis={stackedPrimaryYAxis}
        width={width}
        height={height}
        chartArea={{ border: { width: 0 } }}
        tooltip={{ enable: true }}
        background={currentMode === 'Dark' ? '#33373E' : '#fff'}
        legendSettings={{ background: 'white' }}
      >
        <Inject services={[StackingColumnSeries, Category, Legend, Tooltip]} />
        <SeriesCollectionDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {sales.map((item, index) => <SeriesDirective key={salesCount} {...item} />)}
        </SeriesCollectionDirective>
      </ChartComponent>
    );
  };

export default SalesChart