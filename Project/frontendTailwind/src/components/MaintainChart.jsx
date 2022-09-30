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
    const maintprog = maintainence.filter((maint) => maint.status === "In progress").length;
    const maintcomp = maintainence.filter((maint) => maint.status === "Completed").length;
    

  return (
    <div>
        <ChartsHeader category="Chart" title='Maintenance Progression' />
        <AccumulationChartComponent   legendSettings={{position:"Right", background: "white"}} tooltip={{enable:true}} >
            <Inject services={[PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip]} />
            <AccumulationSeriesCollectionDirective>
                <AccumulationSeriesDirective 
                    type="Pie"
                    dataSource={
                        [
                            { x: 'In progress', y: (maintprog/maintCount*100).toPrecision(4), text: (maintprog/maintCount*100).toPrecision(2) + '%'},
                            { x: 'Completed', y: (maintcomp/maintCount*100).toPrecision(4), text: (maintcomp/maintCount*100).toPrecision(2) + '%'},
                          
                            
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