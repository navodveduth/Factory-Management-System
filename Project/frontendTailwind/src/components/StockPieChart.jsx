import React, { useState, useEffect }from 'react'
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip } from '@syncfusion/ej2-react-charts';
import axios from 'axios';
import ChartsHeader from './ChartsHeader'
import { useStateContext } from '../contexts/ContextProvider';

const StockPieChart = () => {
    const { currentMode } = useStateContext();
    const [stock, setStock] = useState([]);
    const [stockUtil,setStockUtil] = useState([]);

    const getStockUtil = async () => {
      axios
        .get('http://localhost:8070/stockUtilisation')
        .then((res) => {
          setStockUtil(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    };

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
      getStockUtil();
    }, []);

    const currentDate = new Date().toISOString().split('T')[0];
    console.log(currentDate);
  
    const stockCnt = stockUtil.length;
    const shirts= stockUtil.filter((stk) => stk.stockName === 'Shirts' && new Date(stk.date).toISOString().split('T')[0] === currentDate).length;
    const tshirts= stockUtil.filter((stk) => stk.stockName === 'T-Shirts' && new Date(stk.date).toISOString().split('T')[0] === currentDate).length;
    const caps= stockUtil.filter((stk) => stk.stockName === 'Caps' && new Date(stk.date).toISOString().split('T')[0] === currentDate).length;
    const blouse= stockUtil.filter((stk) => stk.stockName === 'Blouse' && new Date(stk.date).toISOString().split('T')[0] === currentDate).length;
    const pants= stockUtil.filter((stk) => stk.stockName === 'Pants' && new Date(stk.date).toISOString().split('T')[0] === currentDate).length;
    const jeans= stockUtil.filter((stk) => stk.stockName === 'Jeans' && new Date(stk.date).toISOString().split('T')[0] === currentDate).length;
    const shorts= stockUtil.filter((stk) => stk.stockName === 'Shorts' && new Date(stk.date).toISOString().split('T')[0] === currentDate).length;
    const skirts= stockUtil.filter((stk) => stk.stockName === 'Skirts' && new Date(stk.date).toISOString().split('T')[0] === currentDate).length;

    const colors = ['#258EA6', '#c40bde', '#0bdeb8', '#FF8C00', '#4B0082','#ded90b','#df9776', '#94e1ab'];

  return (
    <div>
      <ChartsHeader category="Chart" title="Daily Stock Distribution by Bundles" />
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
                />
            </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
    </div>
  );
};

export default StockPieChart;
