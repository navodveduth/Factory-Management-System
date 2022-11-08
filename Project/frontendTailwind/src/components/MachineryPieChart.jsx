import React, { useState, useEffect }from 'react'
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip } from '@syncfusion/ej2-react-charts';
import axios from 'axios';

import ChartsHeader from './ChartsHeader';

const MachineryPieChart = () => {
    const [machinery, setMachinery] = useState([]);

    const getMachinery = async () => {  //getMachinery is the function to get the data from the backend
        axios.get("http://localhost:8070/machinery/")
        .then((res) => { 
            setMachinery(res.data); //setMachinery is used to update the state variable
        })
        .catch((err) => {
            alert(err.message);
        })
    }
    
    useEffect(() => { //useEffect is used to call the function getMachinery
        getMachinery();
    }, [])
  
    const machCount = machinery.length;
    const machCut= machinery.filter((mach) => mach.name === 'Cutting machine').length;
    const machFabIn= machinery.filter((mach) => mach.name === 'Fabrics Inspection machine').length;
    const machEmb= machinery.filter((mach) => mach.name === 'Embroidery machine').length;
    const machSew= machinery.filter((mach) => mach.name === 'Sewing machine').length;
    const machHydro= machinery.filter((mach) => mach.name === 'Digital Hydrometer').length;
    const machAir= machinery.filter((mach) => mach.name === 'Air compressor').length;
    const machAC= machinery.filter((mach) => mach.name === 'Air conditioning').length;
    const machGen= machinery.filter((mach) => mach.name === 'Generator').length;
    

  return (
    <div>
        <ChartsHeader  title='Machinery Distribution ' />
        <AccumulationChartComponent  legendSettings={{position:"Right", background: "white"}} tooltip={{enable:true}} >
            <Inject services={[PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip]} />
            <AccumulationSeriesCollectionDirective>
                <AccumulationSeriesDirective 
                    type="Pie"
                    dataSource={
                        [
                            { x: 'Cutting machine', y: (machCut/machCount*100).toPrecision(4), text: (machCut/machCount*100).toPrecision(2) + '%'},
                            { x: 'Fabrics Inspection machine', y: (machFabIn/machCount*100).toPrecision(4), text: (machFabIn/machCount*100).toPrecision(2) + '%'},
                            { x: 'Embroidery machine', y: (machEmb/machCount*100).toPrecision(4), text: (machEmb/machCount*100).toPrecision(2) + '%'},
                            { x: 'Sewing machine', y: (machSew/machCount*100).toPrecision(4), text: (machSew/machCount*100).toPrecision(2) + '%'},
                            { x: 'Digital Hydrometer', y: (machHydro/machCount*100).toPrecision(4), text: (machHydro/machCount*100).toPrecision(2) + '%'},
                            { x: 'Air compressor', y: (machAir/machCount*100).toPrecision(4), text: (machAir/machCount*100).toPrecision(2) + '%'},
                            { x: 'Air conditioning', y: (machAC/machCount*100).toPrecision(4), text: (machAC/machCount*100).toPrecision(2) + '%'},
                            { x: 'Generator', y: (machGen/machCount*100).toPrecision(4), text: (machGen/machCount*100).toPrecision(2) + '%'},
                            
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

export default MachineryPieChart