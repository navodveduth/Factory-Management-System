import React, { useState, useEffect }from 'react'
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip } from '@syncfusion/ej2-react-charts';
import axios from 'axios';
import Header from './Header';
import ChartsHeader from './ChartsHeader'
import { useStateContext } from '../contexts/ContextProvider';

const SalesPieChart = () => {
  const { currentMode } = useStateContext();
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
    const finishedOrders= sales.filter((sale) => sale.totalAmount > 50000).length;
    const ongoingOrders= sales.filter((sale) => sale.totalAmount < 50000).length;
    const newOrders= sales.filter((sale) => sale.totalAmount > 100000).length;

  return (
    <div>
      <ChartsHeader category="Chart" title="Invoices Distribution by Amount" />
      <AccumulationChartComponent legendSettings={{position:"Right", background: "white"}} tooltip={{enable:true}} background={currentMode === 'Dark' ? '#3f434c' : '#f2f2f2'}>
            <Inject services={[PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip]} />
            <AccumulationSeriesCollectionDirective>
                <AccumulationSeriesDirective 
                    type="Pie"
                    innerRadius="50%"
                    dataSource={
                        [
                            { x: 'Orders > Rs.100,000', y: (newOrders/salesCount*100).toPrecision(4), text: (newOrders/salesCount*100).toPrecision(2) + '%', color: '#1363DF' },
                            { x: 'Orders < Rs.50,000', y: (ongoingOrders/salesCount*100).toPrecision(4), text: (ongoingOrders/salesCount*100).toPrecision(2) + '%', color: '#F87474' },
                            { x: 'Orders > Rs.50,000', y: (finishedOrders/salesCount*100).toPrecision(4), text: (finishedOrders/salesCount*100).toPrecision(2) + '%', color: '#47B5FF' }
                            
                        ]
                    }
                    pointColorMapping = "color"
                    xName="x"
                    yName="y"
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
                    }}
                    >
                    
                </AccumulationSeriesDirective>
            </AccumulationSeriesCollectionDirective>

        </AccumulationChartComponent>
    </div>
  )
}

export default SalesPieChart