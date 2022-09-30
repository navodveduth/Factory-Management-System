import React, { useState, useEffect }from 'react'
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip } from '@syncfusion/ej2-react-charts';
import axios from 'axios';
import Header from './Header';
import { useStateContext } from '../contexts/ContextProvider';
const ProductionPieChart = () => {
    const [Order,setOrder] = useState([]);
    const { currentMode } = useStateContext();

    async function getOrders(){
        await axios.get("http://localhost:8070/production/order/allOrders").then((res)=>{
            setOrder(res.data);
        }).catch((err)=>{
            alert(err.message);
        })
    }
  
    useEffect(() => {
      getOrders();
    }, []);
  
    const prodCount = Order.length;
    const prodT= Order.filter((Order) => Order.orderName == 'T-Shirts').length;
    const prodCollars= Order.filter((Order) => Order.orderName == 'Collars').length;
    const prodTrousers= Order.filter((Order) => Order.orderName == 'Trousers').length;
    const prodShirts= Order.filter((Order) => Order.orderName == 'Shirts').length;

  return (
    <div>
        <Header category="Chart" title="Costed product distribution" />
         <AccumulationChartComponent legendSettings={{position:"Right", background: "white"}} tooltip={{enable:true}} background={currentMode == 'Dark' ? '#3f434c' : '#f2f2f2'}>
         <Inject services={[PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip]}/>
            <AccumulationSeriesCollectionDirective>
                <AccumulationSeriesDirective 
                    type="Pie"
                    dataSource={
                        [
                            { x: 'T-Shirts', y: (prodT/prodCount*100).toPrecision(4), text: (prodT/prodCount*100).toPrecision(2) + '%'},
                            { x: 'Collars', y: (prodCollars/prodCount*100).toPrecision(4), text: (prodCollars/prodCount*100).toPrecision(2) + '%'},
                            { x: 'Trousers', y: (prodTrousers/prodCount*100).toPrecision(4), text: (prodTrousers/prodCount*100).toPrecision(2) + '%'},
                            { x: 'Shirts', y: (prodShirts/prodCount*100).toPrecision(4), text: (prodShirts/prodCount*100).toPrecision(2) + '%'},
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
                    >
                    
                </AccumulationSeriesDirective>
            </AccumulationSeriesCollectionDirective>

        </AccumulationChartComponent>
    </div>
  )
}

export default ProductionPieChart;