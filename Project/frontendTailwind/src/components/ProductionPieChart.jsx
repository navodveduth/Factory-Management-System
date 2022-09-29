import React, { useState, useEffect }from 'react'
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip } from '@syncfusion/ej2-react-charts';
import axios from 'axios';

const ProductionPieChart = () => {
    const [Order,setOrder] = useState([]);

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
        <AccumulationChartComponent title='Costed Production Distribution' legendSettings={{position:"Bottom"}} tooltip={{enable:true}}>
            <Inject services={[PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip]} />
            <AccumulationSeriesCollectionDirective>
                <AccumulationSeriesDirective 
                    type="Pie"
                    innerRadius="50%"
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

export default ProductionPieChart;