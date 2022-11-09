import { React, useState, useEffect } from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import ChartsHeader from './ChartsHeader'
import axios from 'axios'
import { ChartComponent, LineSeries, Legend, Tooltip, DataLabel, Category, Inject, SeriesCollectionDirective, SeriesDirective } from '@syncfusion/ej2-react-charts';

export default function DepreciationChart() {

    const { currentMode } = useStateContext();
    const [machinery, setMachinery] = useState([]);

    const tooltip = { enable: true, shared: false };

    const primaryYAxis = { labelFormat: '{value}%', 
                           title: "Depreciation by Rate (percentage%)", 
                           labelStyle: { 
                              color: currentMode === 'Dark' ? '#e9ecef' : '#343a40'}, 
                           titleStyle: { 
                            color: currentMode === 'Dark' ? '#e9ecef' : '#343a40', 
                            fontSize: '16px'},
                           interval: 2,
                         };
                         
    const primaryXAxis = { valueType: 'Category', 
                           title: "Month",
                           labelStyle: { 
                            color: currentMode === 'Dark' ? '#e9ecef' : '#343a40'}, 
                           titleStyle: { 
                            color: currentMode === 'Dark' ? '#e9ecef' : '#343a40', 
                            fontSize: '16px'} 
                         };

                         const getMachinery = async () => {  //getMachinery is the function to get the data from the backend
                          axios.get("http://localhost:8070/machinery/")
                            .then((res) => {
                              setMachinery(res.data); //setMachinery is used to update the state variable
                      
                      
                            })
                            .catch((err) => {
                              alert(err.message);
                            })
                        }
                      
                      
                      
                        useEffect(() => {
                          getMachinery(); // <== CHANGE ACCORDING TO YOUR OWN FUNCTIONS, YOU CAN REMOVE THIS LINE IF YOU DON'T NEED IT
                      
                        }, []);



    var MachLen = machinery.length;
    var janTotal, febTotal, marTotal, aprTotal, mayTotal, junTotal, julTotal, augTotal, sepTotal, octTotal, novTotal, decTotal;
    janTotal= febTotal= marTotal= aprTotal= mayTotal= junTotal= julTotal= augTotal= sepTotal= octTotal=novTotal = decTotal = 0;
    for (let index = 0; index < MachLen; index++) {
      console.log(new Date(machinery[index].dateOfPurchased).getMonth());
      switch(new Date(machinery[index].dateOfPurchased).getMonth()){
      case(0):
        janTotal = janTotal + ((machinery[index].machineryCost - machinery[index].salvage) / machinery[index].numberOfYrs)/machinery[index].machineryCost*100;
        break;
      case(1):
        febTotal = febTotal +((machinery[index].machineryCost - machinery[index].salvage) / machinery[index].numberOfYrs)/machinery[index].machineryCost*100;
        break;
      case(2):
        marTotal = marTotal + ((machinery[index].machineryCost - machinery[index].salvage) / machinery[index].numberOfYrs)/machinery[index].machineryCost*100;
        break;
      case(3):
        aprTotal = aprTotal + ((machinery[index].machineryCost - machinery[index].salvage) / machinery[index].numberOfYrs)/machinery[index].machineryCost*100;
        break;
      case(4):
        mayTotal = mayTotal + ((machinery[index].machineryCost - machinery[index].salvage) / machinery[index].numberOfYrs)/machinery[index].machineryCost*100;
        break;
      case(5):
        junTotal = junTotal + ((machinery[index].machineryCost - machinery[index].salvage) / machinery[index].numberOfYrs)/machinery[index].machineryCost*100;
        break;
      case(6):
        julTotal = julTotal + ((machinery[index].machineryCost - machinery[index].salvage) / machinery[index].numberOfYrs)/machinery[index].machineryCost*100;
        break;
      case(7):
        augTotal = augTotal + ((machinery[index].machineryCost - machinery[index].salvage) / machinery[index].numberOfYrs)/machinery[index].machineryCost*100;
        break;
      case(8):
        sepTotal = sepTotal + ((machinery[index].machineryCost - machinery[index].salvage) / machinery[index].numberOfYrs)/machinery[index].machineryCost*100;
        break;
      case(9):
        octTotal = octTotal + ((machinery[index].machineryCost - machinery[index].salvage) / machinery[index].numberOfYrs)/machinery[index].machineryCost*100;
        break;
      case(10):
        novTotal  = (parseInt(novTotal) + ((machinery[index].machineryCost - machinery[index].salvage) / machinery[index].numberOfYrs)/machinery[index].machineryCost*100);
        break;
      case(11):
        decTotal = decTotal + ((machinery[index].machineryCost - machinery[index].salvage) / machinery[index].numberOfYrs)/machinery[index].machineryCost*100;
        break;
      default:
        break;
    }
    }
    
    console.log(novTotal);
    
    let data = [
      { month: 'Jan', machinery: janTotal }, { month: 'Feb', machinery: febTotal },
      { month: 'Mar', machinery: marTotal }, { month: 'Apr', machinery: aprTotal },
      { month: 'May', machinery: mayTotal }, { month: 'Jun', machinery: junTotal },
      { month: 'Jul', machinery: julTotal }, { month: 'Aug', machinery: augTotal },
      { month: 'Sep', machinery: sepTotal }, { month: 'Oct', machinery: octTotal },
      { month: 'Nov', machinery: parseInt(novTotal) }, { month: 'Dec', machinery: decTotal }
  ];

  return (

   
    <>
    
    <ChartsHeader category = "Chart" title = "Machinery Depreciation" />
        <ChartComponent primaryXAxis={primaryXAxis} primaryYAxis={primaryYAxis} tooltip={tooltip} 
        background={currentMode === 'Dark' ? '#33373E' : '#f3f4f6'}>

            <Inject services={[LineSeries, Tooltip, DataLabel, Category]} />
              <SeriesCollectionDirective>
                <SeriesDirective type = "Line" dataSource={data} xName="month" yName="machinery"
                name = "Monthly Depreciation" marker = {{dataLable: {visible: true}, visible: true}}>
                </SeriesDirective>
              </SeriesCollectionDirective>

        </ChartComponent>

        
      </>
  )
}
