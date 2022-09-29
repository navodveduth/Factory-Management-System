import React, { useState, useEffect }from 'react'
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip } from '@syncfusion/ej2-react-charts';
import axios from 'axios';

const DamagedStockPieChart = () => {
    const [damagedStock, setDamagedStock] = useState([]); //damagedStock is the state variable and setDamagedStock is the function to update the state variable

    const getdamagedStock = async () => {  //getdamagedStock is the function to get the data from the backend
        axios.get("http://localhost:8070/damagedStock/")
            .then((res) => {
                setDamagedStock(res.data); //setDamagedStock is used to update the state variable
                console.log(res.data);
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    useEffect(() => { //useEffect is used to call the function getdamagedStock
        getdamagedStock();
    }, [])
  
    const itemCount = damagedStock.length;
    const dsUsables= damagedStock.filter((ds) => ds.usability === 'Usable').length;
    const dsNotUsable= damagedStock.filter((ds) => ds.usability === 'Not usable').length;   

  return (
    <div>
        <AccumulationChartComponent title='Damaged Stock Distribution ' legendSettings={{position:"Right"}} tooltip={{enable:true}}>
            <Inject services={[PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip]} />
            <AccumulationSeriesCollectionDirective>
                <AccumulationSeriesDirective 
                    type="Pie"
                    innerRadius="50%"
                    dataSource={
                        [
                            { x: 'Usable', y: (dsUsables/itemCount*100).toPrecision(4), text: (dsUsables/itemCount*100).toPrecision(2) + '%'},
                            { x: 'Not Usable', y: (dsNotUsable/itemCount*100).toPrecision(4), text: (dsNotUsable/itemCount*100).toPrecision(2) + '%'},
                            
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

export default DamagedStockPieChart;