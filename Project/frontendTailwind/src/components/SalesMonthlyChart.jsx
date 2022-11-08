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




    var salesLen = sales.length;
    var janTotal, febTotal, marTotal, aprTotal, mayTotal, junTotal, julTotal, augTotal, sepTotal, octTotal, novTotal, decTotal;
    janTotal= febTotal= marTotal= aprTotal= mayTotal= junTotal= julTotal= augTotal= sepTotal= octTotal=novTotal = decTotal = 0;
    console.log("at assignment" + novTotal);
    for (let index = 0; index < salesLen; index++) {
      console.log(new Date(sales[index].orderDate).getMonth());
      switch(new Date(sales[index].orderDate).getMonth()){
      case(0):
        janTotal = janTotal + sales[index].totalAmount;
        break;
      case(1):
        febTotal = febTotal + sales[index].totalAmount;
        break;
      case(2):
        marTotal = marTotal + sales[index].totalAmount;
        break;
      case(3):
        aprTotal = aprTotal + sales[index].totalAmount;
        break;
      case(4):
        mayTotal = mayTotal + sales[index].totalAmount;
        break;
      case(5):
        junTotal = junTotal + sales[index].totalAmount;
        break;
      case(6):
        julTotal = julTotal + sales[index].totalAmount;
        break;
      case(7):
        augTotal = augTotal + sales[index].totalAmount;
        break;
      case(8):
        sepTotal = sepTotal + sales[index].totalAmount;
        break;
      case(9):
        octTotal = octTotal + sales[index].totalAmount;
        break;
      case(10):
        novTotal  = (parseInt(novTotal) + sales[index].totalAmount);
        break;
      case(11):
        decTotal = decTotal + sales[index].totalAmount;
        break;
      default:
        break;
    }
    }
    
    console.log(novTotal);
    
    let data = [
      { month: 'Jan', sales: janTotal }, { month: 'Feb', sales: febTotal },
      { month: 'Mar', sales: marTotal }, { month: 'Apr', sales: aprTotal },
      { month: 'May', sales: mayTotal }, { month: 'Jun', sales: junTotal },
      { month: 'Jul', sales: julTotal }, { month: 'Aug', sales: augTotal },
      { month: 'Sep', sales: sepTotal }, { month: 'Oct', sales: octTotal },
      { month: 'Nov', sales: parseInt(novTotal) }, { month: 'Dec', sales: decTotal }
  ];

  return (

   
    <>
    
    <ChartsHeader category = "Chart" title = "Sales Analysis" />
        <ChartComponent title="Monthly Analysis" primaryXAxis={primarxyAxis} primaryYAxis={primaryyAxis} tooltip={tooltip} 
        background={currentMode === 'Dark' ? '#33373E' : '#f3f4f6'} legendSettings={{visible: true}}>

            <Inject services={[LineSeries, Legend, Tooltip, DataLabel, Category]} />
              <SeriesCollectionDirective>
                <SeriesDirective type = "Line" dataSource={data} xName="month" yName="sales" text-white
                name = "Monthly Sales" marker = {{dataLable: {visible: true}, visible: true}}>
                </SeriesDirective>
              </SeriesCollectionDirective>

        </ChartComponent>

        
      </>
  )
}
