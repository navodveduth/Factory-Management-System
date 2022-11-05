import React, {useState, useEffect} from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel } from '@syncfusion/ej2-react-charts';
import axios from 'axios';
import { ChartsHeader } from '../components';
import { useStateContext } from '../contexts/ContextProvider';

const MaintainBarChart = () => {
    const [maintainence, setMaintainence] = useState([]);
    const [maintainenceVehi, setMaintainenceVehi] = useState([]);
    const [maintainenceMachine, setMaintainenceMachine] = useState([]);
    const { currentMode } = useStateContext();  

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
    const maintp = maintainence.filter((maint) => maint.status === "In progress").length;
    

    const getVMaintainence = async () => {  //getMaintainence is the function to get the data from the backend
        axios.get("http://localhost:8070/maintainenceVehicle/")
        .then((res) => { 
          setMaintainenceVehi (res.data); //setMaintainence  is used to update the state variable
          
        })
        .catch((err) => {
            alert(err.message);
        })
    }
    
    
      useEffect(() => {
        getVMaintainence();
      }, []);

        const maintVehiCount = maintainenceVehi.length;
        const maintVehip = maintainenceVehi.filter((maint) => maint.status === "In progress").length;


        const getMMaintainence = async () => {  //getMaintainence is the function to get the data from the backend
            axios.get("http://localhost:8070/maintainenceMachine/")
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
            const maintMachinep = maintainenceMachine.filter((maint) => maint.status === "In progress").length;
        
    const barPrimaryXAxis = {
        valueType: 'Category',
        interval: 1,
        majorGridLines: { width: 0 },
        };
        const barPrimaryYAxis = {
        majorGridLines: { width: 0 },   
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 },
        labelStyle: { color: 'transparent' },
        };

        const barChartData = [
            [
              { x: 'Machines ', y: maintMachinep },
            ],
            [
              { x: 'Vehicles', y: maintVehip },
            ],
            [
              { x: 'Property & others', y: maintp },
            ],
                
          ]
        
          const barCustomSeries = [
            {
              dataSource: barChartData[0],
              xName: 'x',
              yName: 'y',
              name: 'Machines',
              type: 'Column',
              marker: {
                dataLabel: {
                  visible: false,
                  position: 'Top',
                  font: { fontWeight: '600', color: '#ffffff' },
                },
              },
            },
            {
              dataSource: barChartData[1],
              xName: 'x',
              yName: 'y',
              name: 'Vehicles',
              type: 'Column',
              marker: {
                dataLabel: {
                  visible: false,
                  position: 'Top',
                  font: { fontWeight: '600', color: '#ffffff' },
                },
              },
            },
            {
              dataSource: barChartData[2],
              xName: 'x',
              yName: 'y',
              name: 'Property & others',
              type: 'Column',
              marker: {
                dataLabel: {
                  visible: false,
                  position: 'Top',
                  font: { fontWeight: '600', color: '#ffffff' },
                },
              },
            },
          ];
        
        
          return (
            <div className="m-0 md:m-10 mt-0 p-0 max-h-21 bg-white dark:bg-secondary-dark-bg rounded-3xl">
              <ChartsHeader category="Maintenance in progress"  />
              <div className=" w-full">
                <ChartComponent
                
                  id="charts"
                  primaryXAxis={barPrimaryXAxis}
                  primaryYAxis={barPrimaryYAxis}
                  chartArea={{ border: { width: 0 } }}
                  tooltip={{ enable: true }}
                  background={currentMode === 'Dark' ? '#33373E' : '#f3f4f6'}
                  legendSettings={{ background: '#f3f4f6' }}
                >
                  <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]} />
                  <SeriesCollectionDirective>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    {barCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
                  </SeriesCollectionDirective>
                </ChartComponent>
              </div>
            </div>
          );
        };
        
        export default MaintainBarChart;