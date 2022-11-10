import React, { useState, useEffect }from 'react'
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip } from '@syncfusion/ej2-react-charts';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';


import ChartsHeader from './ChartsHeader';

const MaintainChart = () => {
    
  const [maintainence, setMaintainence] = useState([]);
    const { currentMode } = useStateContext();

    const getMaintainence = async () => {  //getMaintainence is the function to get the data from the backend
      axios.get("http://localhost:8070/maintainence/")
        .then((res) => {
          setMaintainence(res.data); //setMaintainence  is used to update the state variable
  
        })
        .catch((err) => {
          alert(err.message);
        })
    }
  
    useEffect(() => {
      getMaintainence(); // 
    }, []);

    const count = maintainence.length;
    const machCut= maintainence.filter((mach) => mach.Type === 'Plumbing').length;
    const machCut1= maintainence.filter((mach) => mach.Type === 'Electrical').length;
    const machCut2= maintainence.filter((mach) => mach.Type === 'Flooring').length;
    const machCut3= maintainence.filter((mach) => mach.Type === 'Painting').length;
    const machCut5= maintainence.filter((mach) => mach.Type === 'Plastering').length;
    const machCut6= maintainence.filter((mach) => mach.Type === 'Roofing').length;
    const machCut7= maintainence.filter((mach) => mach.Type === 'Tiling').length;

    
    

  return (
    <div>
        <ChartsHeader  category="Chart" title='Propery Maintenance Distribution ' />
        <AccumulationChartComponent  legendSettings={{position:"Right", background: "white"}} tooltip={{enable:true}} background={currentMode === 'Dark' ? '#3f434c' : '#f2f2f2'} >
            <Inject services={[PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip]} />
            <AccumulationSeriesCollectionDirective>
                <AccumulationSeriesDirective 
                    type="Pie"
                    dataSource={
                        [
                            { x: 'Plumbing', y: (machCut/count*100).toPrecision(4), text: (machCut/count*100).toPrecision(2) + '%',color: '#1363DF'},
                            { x: 'Electrical', y: (machCut1/count*100).toPrecision(4), text: (machCut1/count*100).toPrecision(2) + '%',color: '#F87474'},
                            { x: 'Flooring', y: (machCut2/count*100).toPrecision(4), text: (machCut2/count*100).toPrecision(2) + '%',color: '#C14953'},
                            { x: 'Painting', y: (machCut3/count*100).toPrecision(4), text: (machCut3/count*100).toPrecision(2) + '%',color: '#419D78'},
                            { x: 'Plastering', y: (machCut5/count*100).toPrecision(4), text: (machCut5/count*100).toPrecision(2) + '%',color: '#F5A623'},
                            { x: 'Roofing', y: (machCut6/count*100).toPrecision(4), text: (machCut6/count*100).toPrecision(2) + '%',color: '#47B5FF'},
                            { x: 'Tiling', y: (machCut7/count*100).toPrecision(4), text: (machCut7/count*100).toPrecision(2) + '%',color: '#FF8B8B'},
                           
                        ]
                    }
                    pointColorMapping = "color"
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