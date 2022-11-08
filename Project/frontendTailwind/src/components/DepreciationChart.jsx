import React, { useState, useEffect }from 'react'
import axios from 'axios';
import { ChartComponent, Inject, LineSeries, SeriesCollectionDirective, SeriesDirective, Category, Legend,DataLabel, Tooltip } from '@syncfusion/ej2-react-charts';
import '../App.css';
import ChartsHeader from './ChartsHeader';


function DepreciationChart() {
    // const [machinery, setMachinery] = useState([]);

    // const getMachinery = async () => {  //getMachinery is the function to get the data from the backend
    //     axios.get("http://localhost:8070/machinery/")
    //     .then((res) => { 
    //         setMachinery(res.data); //setMachinery is used to update the state variable
    //     })
    //     .catch((err) => {
    //         alert(err.message);
    //     })
    // }
    
    // useEffect(() => { //useEffect is used to call the function getMachinery
    //     getMachinery();
    // }, [])
  
    // const machCount = machinery.length;
    // const machCut= machinery.filter((mach) => mach.name === 'Cutting machine').length;
    // const machFabIn= machinery.filter((mach) => mach.name === 'Fabrics Inspection machine').length;
    // const machEmb= machinery.filter((mach) => mach.name === 'Embroidery machine').length;
    // const machSew= machinery.filter((mach) => mach.name === 'Sewing machine').length;
    // const machHydro= machinery.filter((mach) => mach.name === 'Digital Hydrometer').length;
    // const machAir= machinery.filter((mach) => mach.name === 'Air compressor').length;
    // const machAC= machinery.filter((mach) => mach.name === 'Air conditioning').length;
    // const machGen= machinery.filter((mach) => mach.name === 'Generator').length;

 
  return (
    <div>
    <ChartsHeader title='Monthly Average Depreciation Rate ' />
   <ChartComponent primaryXAxis={{valueType: "Category", title:"Month"}} 
   primaryYAxis={{title:"Depreciation"}} legendSettings={{visible: true}} tooltip={{enable: true}}> 
     <Inject services={[LineSeries, Category, Legend, DataLabel, Tooltip]}></Inject>
     <SeriesCollectionDirective>
       <SeriesDirective dataSource={

                                            [
                                                { month: 'Jan', Depreciation: 1.2 }, { month: 'Feb', Depreciation: 4 },
                                                { month: 'Mar', Depreciation: 2 }, { month: 'Apr', Depreciation: 2 },
                                                { month: 'May', Depreciation: 4 }, { month: 'Jun', Depreciation: 1 },
                                                { month: 'Jul', Depreciation: 2 }, { month: 'Aug', Depreciation: 0.5 },
                                                { month: 'Sep', Depreciation: 3 }, { month: 'Oct', Depreciation: 2 },
                                                { month: 'Nov', Depreciation: 3 }, { month: 'Dec', Depreciation: 3 }
                                            ]

  } xName="month" yName="Depreciation" type="Line" name="Depreciation Rate" 
       marker={{dataLabel:{visible: true}, visible:true}}></SeriesDirective>
     </SeriesCollectionDirective>
   </ChartComponent>
   </div>
  );
}

export default DepreciationChart;