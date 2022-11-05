import React, { useState, useEffect }from 'react'
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip } from '@syncfusion/ej2-react-charts';
import axios from 'axios';
import ChartsHeader from './ChartsHeader';

const MaintainChart = () => {
    const [maintainence, setMaintainence] = useState([]);

    const getMaintainence = async () => {  //getMaintainence is the function to get the data from the backend
        axios.get("http://localhost:8070/maintainence/")
        .then((res) => { 
            setMaintainence (res.data); //setMaintainence  is used to update the state variable
          
        })
        .catch((err) => {
            alert(err.message);
        })
    }
    
    useEffect(() => { //useEffect is used to call the function getMaintainence 
        getMaintainence ();
    }, [])
    
    const maintCount = maintainence.length;
    const maintp = maintainence.filter((maint) => maint.Type === "Plumbing").length;
    const maintH = maintainence.filter((maint) => maint.Type === "HVAC").length;
    const maintF = maintainence.filter((maint) => maint.Type === "Flooring").length;
    const maintP = maintainence.filter((maint) => maint.Type === "Painting").length;
    const maintB = maintainence.filter((maint) => maint.Type === "Buildings").length;
    const maintE = maintainence.filter((maint) => maint.Type === "Electrical").length;
    

  return (
    <div>
        <ChartsHeader category="Chart" title='Property Maintenance Progression' />
        <AccumulationChartComponent   legendSettings={{position:"Right", background: "white"}} tooltip={{enable:true}} >
            <Inject services={[PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip]} />
            <AccumulationSeriesCollectionDirective>
                <AccumulationSeriesDirective 
                    type="Pie"
                    dataSource={
                        [
                            { x: 'Plumbing', y: (maintp/maintCount*100).toPrecision(4), text: (maintp/maintCount*100).toPrecision(2) + '%'},
                            { x: 'HVAC', y: (maintH/maintCount*100).toPrecision(4), text: (maintH/maintCount*100).toPrecision(2) + '%'},
                            { x: 'Flooring', y: (maintF/maintCount*100).toPrecision(4), text: (maintF/maintCount*100).toPrecision(2) + '%'},
                            { x: 'Painting', y: (maintP/maintCount*100).toPrecision(4), text: (maintP/maintCount*100).toPrecision(2) + '%'},
                            { x: 'Buildings', y: (maintB/maintCount*100).toPrecision(4), text: (maintB/maintCount*100).toPrecision(2) + '%'},
                            { x: 'Electrical', y: (maintE/maintCount*100).toPrecision(4), text: (maintE/maintCount*100).toPrecision(2) + '%'},

                          
                            
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

export default MaintainChart