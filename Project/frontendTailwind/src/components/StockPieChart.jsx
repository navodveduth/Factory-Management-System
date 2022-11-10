import React, { useState, useEffect }from 'react'
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip } from '@syncfusion/ej2-react-charts';
import axios from 'axios';
import ChartsHeader from './ChartsHeader'
import { useStateContext } from '../contexts/ContextProvider';

const StockPieChart = () => {
    const { currentMode } = useStateContext();
    const [stock, setStock] = useState([]);

    const getStock = async () => {
      axios
        .get('http://localhost:8070/stock')
        .then((res) => {
          setStock(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    };
  
    useEffect(() => {
      getStock();
    }, []);
  
    const stockCnt = stock.length;
    const shirts= stock.filter((stk) => stk.stockName === 'Shirts').length;
    const tshirts= stock.filter((stk) => stk.stockName === 'T-Shirts').length;
    const caps= stock.filter((stk) => stk.stockName === 'Caps').length;
    const blouse= stock.filter((stk) => stk.stockName === 'Blouse').length;
    const pants= stock.filter((stk) => stk.stockName === 'Pants').length;
    const jeans= stock.filter((stk) => stk.stockName === 'Jeans').length;
    const shorts= stock.filter((stk) => stk.stockName === 'Shorts').length;
    const skirts= stock.filter((stk) => stk.stockName === 'Skirts').length;

  return (
    <div>
      <ChartsHeader category="Chart" title="Stock Distribution by Bundles" />
        <AccumulationChartComponent legendSettings={{position:"Right", background: "white"}} tooltip={{enable:true}} background={currentMode === 'Dark' ? '#3f434c' : '#f2f2f2'} >
            <Inject services={[PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip]} />
            <AccumulationSeriesCollectionDirective>
                <AccumulationSeriesDirective 
                  type="Pie"
                  dataSource={
                      [
                          { x: 'Shirts', y: (shirts/stockCnt*100).toPrecision(4), text: (shirts/stockCnt*100).toPrecision(2) + '%'},
                          { x: 'T-Shirts', y: (tshirts/stockCnt*100).toPrecision(4), text: (tshirts/stockCnt*100).toPrecision(2) + '%'},
                          { x: 'Caps', y: (caps/stockCnt*100).toPrecision(4), text: (caps/stockCnt*100).toPrecision(2) + '%'},
                          { x: 'Blouse', y: (blouse/stockCnt*100).toPrecision(4), text: (blouse/stockCnt*100).toPrecision(2) + '%'},
                          { x: 'Pants', y: (pants/stockCnt*100).toPrecision(4), text: (pants/stockCnt*100).toPrecision(2) + '%'},
                          { x: 'Jeans', y: (jeans/stockCnt*100).toPrecision(4), text: (jeans/stockCnt*100).toPrecision(2) + '%'},
                          { x: 'Shorts', y: (shorts/stockCnt*100).toPrecision(4), text: (shorts/stockCnt*100).toPrecision(2) + '%'},
                          { x: 'Skirts', y: (skirts/stockCnt*100).toPrecision(4), text: (skirts/stockCnt*100).toPrecision(2) + '%'},
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

export default StockPieChart;
