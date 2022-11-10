import React, { useState, useEffect }from 'react'
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip } from '@syncfusion/ej2-react-charts';
import axios from 'axios';
import ChartsHeader from './ChartsHeader'
import { useStateContext } from '../contexts/ContextProvider';

const PurchaseOrderStatusPieChart = () => {
    const { currentMode } = useStateContext();
    const [purchaseOrder, setPurchaseOrder] = useState([]);

    const getPurchaseOrder = async () => {
        axios.get("http://localhost:8070/purchaseOrder/")
            .then((res) => {
                setPurchaseOrder(res.data);
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    useEffect(() => {
        getPurchaseOrder();
    }, []);


    const purOrder = purchaseOrder.length;
    const placedOrders = purchaseOrder.filter((order) => order.orderStatus === 'Order Placed').length;
    const completedOrders = purchaseOrder.filter((order) => order.orderStatus === 'Order Completed').length;

    return (
        <div>
            <ChartsHeader category="Chart" title="Purchase Order Status" />
            <AccumulationChartComponent legendSettings={{ position: "Right", background: "white" }} tooltip={{ enable: true }} background={currentMode === 'Dark' ? '#3f434c' : '#f2f2f2'} >
                <Inject services={[PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip]} />
                <AccumulationSeriesCollectionDirective>
                    <AccumulationSeriesDirective
                        type="Pie"
                        dataSource={
                            [
                                { x: 'Placed Orders', y: (placedOrders / purOrder * 100).toPrecision(4), text: (placedOrders) + ' ' + 'Orders', color: '#419D78' },
                                { x: 'Completed Orders', y: (completedOrders / purOrder * 100).toPrecision(4), text: (completedOrders) + ' ' + 'Orders', color: '#C14953' },
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

export default PurchaseOrderStatusPieChart;

                            


                            

            


