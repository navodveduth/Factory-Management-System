import React, { useState, useEffect }from 'react'
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip } from '@syncfusion/ej2-react-charts';
import axios from 'axios';

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
        <AccumulationChartComponent title='Maintenance Progression' legendSettings={{position:"Bottom"}} tooltip={{enable:true}}>
            <Inject services={[PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip]} />
            <AccumulationSeriesCollectionDirective>
                <AccumulationSeriesDirective 
                    type="Pie"
                    innerRadius="50%"
                    dataSource={
                        [
                            { x: 'In progress', y: (maintprog/maintCount*100).toPrecision(4), text: (maintprog/maintCount*100).toPrecision(2) + '%'},
                            { x: 'Completed', y: (maintcomp/maintCount*100).toPrecision(4), text: (maintcomp/maintCount*100).toPrecision(2) + '%'},
                          
                            
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

export default MaintainChart