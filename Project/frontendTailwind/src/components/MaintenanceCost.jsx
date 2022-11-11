import { React, useState, useEffect } from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import ChartsHeader from './ChartsHeader'
import axios from 'axios'
import { ChartComponent, LineSeries, Legend, Tooltip, DataLabel, Category, Inject, SeriesCollectionDirective, SeriesDirective } from '@syncfusion/ej2-react-charts';

export default function MaintenanceCost() {

    const [maintainence, setMaintainence] = useState([]);
    const [maintainenceVehi, setMaintainenceVehi] = useState([]);
    const [maintainenceMachine, setMaintainenceMachine] = useState([]);
    const { currentMode } = useStateContext();  

    const tooltip = { enable: true, shared: false };

    const primaryYAxis = { labelFormat: '{value}LKR', 
                           title: "Maintenance Cost", 
                           labelStyle: { 
                              color: currentMode === 'Dark' ? '#e9ecef' : '#343a40'}, 
                           titleStyle: { 
                            color: currentMode === 'Dark' ? '#e9ecef' : '#343a40', 
                            fontSize: '16px'},
                           interval: 50000,
                         };
                         
    const primaryXAxis = { valueType: 'Category', 
                           title: "Month",
                           labelStyle: { 
                            color: currentMode === 'Dark' ? '#e9ecef' : '#343a40'}, 
                           titleStyle: { 
                            color: currentMode === 'Dark' ? '#e9ecef' : '#343a40', 
                            fontSize: '16px'} 
                         };

                         
                     
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




    var maint = maintainence.length;
    var maint2 = maintainenceMachine.length;
    var maint3 = maintainenceVehi.length;

    //property

    var janTotal, febTotal, marTotal, aprTotal, mayTotal, junTotal, julTotal, augTotal, sepTotal, octTotal, novTotal, decTotal;
    janTotal= febTotal= marTotal= aprTotal= mayTotal= junTotal= julTotal= augTotal= sepTotal= octTotal=novTotal = decTotal = 0;
    for (let index = 0; index < maint; index++) {
      console.log(new Date(maintainence[index].lastMaintainedDate).getMonth());
      switch(new Date(maintainence[index].lastMaintainedDate).getMonth()){
      case(0):
        janTotal = janTotal + maintainence[index].others;
        break;
      case(1):
        febTotal = febTotal +maintainence[index].others;
        break;
      case(2):
        marTotal = marTotal + maintainence[index].others;
        break;
      case(3):
        aprTotal = aprTotal + maintainence[index].others;
        break;
      case(4):
        mayTotal = mayTotal + maintainence[index].others;
        break;
      case(5):
        junTotal = junTotal + maintainence[index].others;
        break;
      case(6):
        julTotal = julTotal + maintainence[index].others;
        break;
      case(7):
        augTotal = augTotal + maintainence[index].others;
        break;
      case(8):
        sepTotal = sepTotal + maintainence[index].others;
        break;
      case(9):
        octTotal = octTotal + maintainence[index].others;
        break;
      case(10):
        novTotal  = (parseInt(novTotal) + maintainence[index].others);
        break;
      case(11):
        decTotal = decTotal + maintainence[index].others;
        break;
      default:
        break;
    }
    }
    
    console.log(novTotal);
    
    let data = [
      { month: 'Jan', maintainence: janTotal }, { month: 'Feb', maintainence: febTotal },
      { month: 'Mar', maintainence: marTotal }, { month: 'Apr', maintainence: aprTotal },
      { month: 'May', maintainence: mayTotal }, { month: 'Jun', maintainence: junTotal },
      { month: 'Jul', maintainence: julTotal }, { month: 'Aug', maintainence: augTotal },
      { month: 'Sep', maintainence: sepTotal }, { month: 'Oct', maintainence: octTotal },
      { month: 'Nov', maintainence: parseInt(novTotal) }, { month: 'Dec', maintainence: decTotal }
  ];

  //machinery Maintainence

  var janTotal1, febTotal1, marTotal1, aprTotal1, mayTotal1, junTotal1, julTotal1, augTotal1, sepTotal1, octTotal1, novTotal1, decTotal1;
    janTotal1= febTotal1= marTotal1= aprTotal1= mayTotal1= junTotal1= julTotal1= augTotal1= sepTotal1= octTotal1=novTotal1 = decTotal1 = 0;
    for (let index = 0; index < maint2; index++) {
      console.log(new Date(maintainenceMachine[index].lastMaintainedDate).getMonth());
      switch(new Date(maintainenceMachine[index].lastMaintainedDate).getMonth()){
      case(0):
        janTotal1 = janTotal1 + maintainenceMachine[index].others;
        break;
      case(1):
        febTotal1 = febTotal1 +maintainenceMachine[index].others;
        break;
      case(2):
        marTotal1 = marTotal1 + maintainenceMachine[index].others;
        break;
      case(3):
        aprTotal1 = aprTotal1 + maintainenceMachine[index].others;
        break;
      case(4):
        mayTotal1 = mayTotal1 + maintainenceMachine[index].others;
        break;
      case(5):
        junTotal1 = junTotal1 + maintainenceMachine[index].others;
        break;
      case(6):
        julTotal1 = julTotal1 + maintainenceMachine[index].others;
        break;
      case(7):
        augTotal1 = augTotal1 + maintainenceMachine[index].others;
        break;
      case(8):
        sepTotal1 = sepTotal1 + maintainenceMachine[index].others;
        break;
      case(9):
        octTotal1 = octTotal1 + maintainenceMachine[index].others;
        break;
      case(10):
        novTotal1  = (parseInt(novTotal1) + maintainenceMachine[index].others);
        break;
      case(11):
        decTotal1 = decTotal1 + maintainenceMachine[index].others;
        break;
      default:
        break;
    }
    }
    
    
    
    let maintainenceMachinedata = [
      { month: 'Jan', maintainenceMachine: janTotal1 }, { month: 'Feb', maintainenceMachine: febTotal1 },
      { month: 'Mar', maintainenceMachine: marTotal1 }, { month: 'Apr', maintainenceMachine: aprTotal1 },
      { month: 'May', maintainenceMachine: mayTotal1 }, { month: 'Jun', maintainenceMachine: junTotal1 },
      { month: 'Jul', maintainenceMachine: julTotal1 }, { month: 'Aug', maintainenceMachine: augTotal1 },
      { month: 'Sep', maintainenceMachine: sepTotal1 }, { month: 'Oct', maintainenceMachine: octTotal1 },
      { month: 'Nov', maintainenceMachine: parseInt(novTotal1) }, { month: 'Dec', maintainenceMachine: decTotal1 }
  ];


  //vehicle Maintainence
  var janTotal2, febTotal2, marTotal2, aprTotal2, mayTotal2, junTotal2, julTotal2, augTotal2, sepTotal2, octTotal2, novTotal2, decTotal2;
    janTotal2= febTotal2= marTotal2= aprTotal2= mayTotal2= junTotal2= julTotal2= augTotal2= sepTotal2= octTotal2=novTotal2 = decTotal2 = 0;
    for (let index = 0; index < maint3; index++) {
      console.log(new Date(maintainenceVehi[index].lastMaintainedDate).getMonth());
      switch(new Date(maintainenceVehi[index].lastMaintainedDate).getMonth()){
      case(0):
        janTotal2 = janTotal2 + maintainenceVehi[index].others;
        break;
      case(1):
        febTotal2 = febTotal2 +maintainenceVehi[index].others;
        break;
      case(2):
        marTotal2 = marTotal2 + maintainenceVehi[index].others;
        break;
      case(3):
        aprTotal2 = aprTotal2 + maintainenceVehi[index].others;
        break;
      case(4):
        mayTotal2 = mayTotal2 + maintainenceVehi[index].others;
        break;
      case(5):
        junTotal2 = junTotal2 + maintainenceVehi[index].others;
        break;
      case(6):
        julTotal2 = julTotal2 + maintainenceVehi[index].others;
        break;
      case(7):
        augTotal2 = augTotal2 + maintainenceVehi[index].others;
        break;
      case(8):
        sepTotal2 = sepTotal2 + maintainenceVehi[index].others;
        break;
      case(9):
        octTotal2 = octTotal2 + maintainenceVehi[index].others;
        break;
      case(10):
        novTotal2  = (parseInt(novTotal2) + maintainenceVehi[index].others);
        break;
      case(11):
        decTotal2 = decTotal2 + maintainenceVehi[index].others;
        break;
      default:
        break;
    }
    }
    
    console.log(novTotal2);
    
    let maintainenceVehidata = [
      { month: 'Jan', maintainenceVehi: janTotal2 }, { month: 'Feb', maintainenceVehi: febTotal2 },
      { month: 'Mar', maintainenceVehi: marTotal2 }, { month: 'Apr', maintainenceVehi: aprTotal2 },
      { month: 'May', maintainenceVehi: mayTotal2 }, { month: 'Jun', maintainenceVehi: junTotal2 },
      { month: 'Jul', maintainenceVehi: julTotal2 }, { month: 'Aug', maintainenceVehi: augTotal2 },
      { month: 'Sep', maintainenceVehi: sepTotal2 }, { month: 'Oct', maintainenceVehi: octTotal2 },
      { month: 'Nov', maintainenceVehi: parseInt(novTotal2) }, { month: 'Dec', maintainenceVehi: decTotal2 }
  ];

  const colors = ['#258EA6', '#F3A738', '#FF5A5F', '#4B0082'];

  return (

   
    <>
    
    <ChartsHeader category = "Chart" title = "Maintenance Cost Analysis" />
        <ChartComponent primaryXAxis={primaryXAxis} primaryYAxis={primaryYAxis} palettes={colors} tooltip={tooltip} 
        background={currentMode === 'Dark' ? '#33373E' : '#f3f4f6'}>

            <Inject services={[LineSeries, Tooltip, DataLabel, Category]} />
              <SeriesCollectionDirective>
                <SeriesDirective type = "Line" dataSource={data} xName="month" yName="maintainence" name = "Poperty Maintenance" marker = {{dataLable: {visible: true}, visible: true}}/>
                <SeriesDirective type = "Line" dataSource={maintainenceMachinedata} xName="month" yName="maintainenceMachine" name = "Machine Maintainence" marker = {{dataLable: {visible: true}, visible: true}}/>
               <SeriesDirective type = "Line" dataSource={maintainenceVehidata} xName="month" yName="maintainenceVehi" name = "Vehicle Maintainence" marker = {{dataLable: {visible: true}, visible: true}}/>
              </SeriesCollectionDirective>

        </ChartComponent>

        
      </>
  )
}
