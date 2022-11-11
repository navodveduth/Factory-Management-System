import React, { useState, useEffect }from 'react'
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip } from '@syncfusion/ej2-react-charts';
import axios from 'axios';
import ChartsHeader from './ChartsHeader'
import { useStateContext } from '../contexts/ContextProvider'

const StockUtilPieChart = () => {
    const { currentMode } = useStateContext();
    const [pendingStock, setPendingStock] = useState([]);

    const getPendingStock = async () => {
      axios
        .get('http://localhost:8070/pendingStock')
        .then((res) => {
          setPendingStock(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    };
  
    useEffect(() => {
        getPendingStock();
    }, []);
  
    const count = pendingStock.length;
    const processing = pendingStock.filter((stk) => stk.status === 'Processing').length;
    const resolved= pendingStock.filter((stk) => stk.status === 'Resolved').length;

    const colors = ['#258EA6', '#df9776']

  return (
    <div>
      <ChartsHeader category="Chart" title="Stock Utilisation Distribution By Requests" />
      <AccumulationChartComponent  legendSettings={{position:"Right", background: "white"}} tooltip={{enable:true}} background={currentMode === 'Dark' ? '#3f434c' : '#f2f2f2'} >
            <Inject services={[PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip]} />
            <AccumulationSeriesCollectionDirective>
                <AccumulationSeriesDirective 
                    type="Pie"
                    dataSource={
                        
                      [
                          { x: 'Processing', y: (processing/count*100).toPrecision(4), text: (processing/count*100).toPrecision(2) + '%'},
                          { x: 'Resolved', y: (resolved/count*100).toPrecision(4), text: (resolved/count*100).toPrecision(2) + '%'},
                      ]
                  }
                  xName="x"
                    yName="y"
                    innerRadius="40%"
                    startAngle={0}
                    endAngle={360}
                    radius="70%"
                    palettes={colors}
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
                >
               </AccumulationSeriesDirective>
            </AccumulationSeriesCollectionDirective>

        </AccumulationChartComponent>
    </div>
  )
}

export default StockUtilPieChart;
