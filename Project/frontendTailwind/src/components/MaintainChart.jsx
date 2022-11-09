import React, { useState, useEffect }from 'react'
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel, } from '@syncfusion/ej2-react-charts';
import axios from 'axios';
import ChartsHeader from './ChartsHeader'
import { useStateContext } from '../contexts/ContextProvider';

const MaintainChart = ({machineID}) => {
  const { currentMode } = useStateContext();
  
  const [maintainenceMachine, setMaintainenceMachine] = useState([]);
  

  const tooltip = { enable: true, shared: false };

  const primaryYAxis = { labelFormat: '{value} Days', 
                          title: "Maintenance Days", 
                          labelStyle: { 
                            color: currentMode === 'Dark' ? '#e9ecef' : '#343a40'}, 
                          titleStyle: { 
                          color: currentMode === 'Dark' ? '#e9ecef' : '#343a40', 
                          fontSize: '16px',
                          fontWeight: 'bold'},
                          interval: 2,
                        };
                        
  const primaryXAxis = { valueType: 'Category', 
                          title: "Month",
                          labelStyle: { 
                          color: currentMode === 'Dark' ? '#e9ecef' : '#343a40'}, 
                          titleStyle: { 
                          color: currentMode === 'Dark' ? '#e9ecef' : '#343a40', 
                          fontSize: '16px',
                          fontWeight: 'bold'} 
                        };

                        const getMMaintainence = async () => {  //getMaintainence is the function to get the data from the backend
                          axios.get(`http://localhost:8070/maintainenceMachine/viewMaintainenceMachineNum/${machineID}`)
                          .then((res) => { 
                            setMaintainenceMachine (res.data); //setMaintainence  is used to update the state variable
                            
                          })
                          .catch((err) => {
                              alert(err.message);
                          })
                      }
                      
                      
                        useEffect(() => {
                          getMMaintainence(); 
                         
                        }, []);
                              

 const maintMachineCount = maintainenceMachine.length;

// get the number of attendance for each month in a array
  const jan = maintainenceMachine.filter((att) => new Date(att.lastMaintainedDate).getMonth() == 0).length;
  const feb = maintainenceMachine.filter((att) => new Date(att.lastMaintainedDate).getMonth() == 1).length;
  const mar = maintainenceMachine.filter((att) => new Date(att.lastMaintainedDate).getMonth() == 2).length;
  const apr = maintainenceMachine.filter((att) => new Date(att.lastMaintainedDate).getMonth() == 3).length;
  const may = maintainenceMachine.filter((att) => new Date(att.lastMaintainedDate).getMonth() == 4).length;
  const jun = maintainenceMachine.filter((att) => new Date(att.lastMaintainedDate).getMonth() == 5).length;
  const jul = maintainenceMachine.filter((att) => new Date(att.lastMaintainedDate).getMonth() == 6).length;
  const aug = maintainenceMachine.filter((att) => new Date(att.lastMaintainedDate).getMonth() == 7).length;
  const sep = maintainenceMachine.filter((att) => new Date(att.lastMaintainedDate).getMonth() == 8).length;
  const oct = maintainenceMachine.filter((att) => new Date(att.lastMaintainedDate).getMonth() == 9).length;
  const nov = maintainenceMachine.filter((att) => new Date(att.lastMaintainedDate).getMonth() == 10).length;
  const dec = maintainenceMachine.filter((att) => new Date(att.lastMaintainedDate).getMonth() == 11).length;

  

  // maintainenceMachine data
  const maintainenceMachineData = [
    { month: "Jan", maintainenceMachine: jan },
    { month: "Feb", maintainenceMachine: feb },
    { month: "Mar", maintainenceMachine: mar },
    { month: "Apr", maintainenceMachine: apr },
    { month: "May", maintainenceMachine: may },
    { month: "Jun", maintainenceMachine: jun },
    { month: "Jul", maintainenceMachine: jul },
    { month: "Aug", maintainenceMachine: aug },
    { month: "Sep", maintainenceMachine: sep },
    { month: "Oct", maintainenceMachine: oct },
    { month: "Nov", maintainenceMachine: nov },
    { month: "Dec", maintainenceMachine: dec },
  ];


  const colors = ['#258EA6', '#F3A738', '#32CD32', '#FF8C00', '#4B0082'];

  return (
    <div>
      <ChartsHeader category="Chart" title="Maintenance by month" />
      <ChartComponent primaryXAxis={primaryXAxis} primaryYAxis={primaryYAxis} tooltip={tooltip} 
        background={currentMode === 'Dark' ? '#3f434c' : '#f2f2f2'} palettes={colors} legendSettings={{background: "white"}}>
        <Inject services={[ColumnSeries, Legend, Category, Tooltip, DataLabel]} />
        <SeriesCollectionDirective>
          <SeriesDirective dataSource={maintainenceMachineData} xName="month" yName="maintainenceMachine" name="Maintainence" type="Column" marker={{ visible: true, width: 10, height: 10 }} >
          </SeriesDirective>
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  )
}

export default MaintainChart