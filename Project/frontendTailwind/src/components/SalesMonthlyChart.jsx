import { React, useState, useEffect } from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import ChartsHeader from './ChartsHeader'
import axios from 'axios'
import { ChartComponent, LineSeries, Legend, Tooltip, DataLabel, Category, Inject, SeriesCollectionDirective, SeriesDirective } from '@syncfusion/ej2-react-charts';

export default function SalesMonthlyChart() {

    const { currentMode } = useStateContext();
    const [sales, setSales] = useState([]);

    const tooltip = { enable: true, shared: false };
    const primaryyAxis = { labelFormat: '{value}K', title: "Sales by Amount (LKR)" };
    const primarxyAxis = { valueType: 'Category', title: "Month" };

    const getSales = async () => {
      axios
        .get('http://localhost:8070/sales/')
        .then((res) => {
          setSales(res.data)
        })
        .catch((err) => {
          alert(err.message)
        })
    }
  
    useEffect(() => {
      getSales()
    }, [])

    
    
    let data = [
      { month: 'Jan', sales: 35 }, { month: 'Feb', sales: 28 },
      { month: 'Mar', sales: 34 }, { month: 'Apr', sales: 32 },
      { month: 'May', sales: 40 }, { month: 'Jun', sales: 32 },
      { month: 'Jul', sales: 35 }, { month: 'Aug', sales: 55 },
      { month: 'Sep', sales: 38 }, { month: 'Oct', sales: 100 },
      { month: 'Nov', sales: 25 }, { month: 'Dec', sales: 32 }
  ];

  return (

   
    <>
    
    <ChartsHeader category = "Chart" title = "Sales Analysis" />
        <ChartComponent title="Monthly Analysis" primaryXAxis={primarxyAxis} primaryYAxis={primaryyAxis} tooltip={tooltip} 
        background={currentMode === 'Dark' ? '#33373E' : '#f3f4f6'} legendSettings={{visible: true}}>

            <Inject services={[LineSeries, Legend, Tooltip, DataLabel, Category]} />
              <SeriesCollectionDirective>
                <SeriesDirective type = "Line" dataSource={data} xName="month" yName="sales" 
                name = "Monthly Sales" marker = {{dataLable: {visible: true}, visible: true}}>
                </SeriesDirective>
              </SeriesCollectionDirective>

        </ChartComponent>

        
      </>
  )
}
