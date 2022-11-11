import { React, useState, useEffect } from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import ChartsHeader from './ChartsHeader'
import axios from 'axios'
import { ChartComponent, LineSeries, Tooltip, DataLabel, Category, Inject, SeriesCollectionDirective, SeriesDirective } from '@syncfusion/ej2-react-charts';

export default function SalesMonthlyChart() {

    const { currentMode } = useStateContext();
    const [sales, setSales] = useState([]);

    const tooltip = { enable: true, shared: false };

    const primaryYAxis = { labelFormat: '{value}', 
                           title: "Sales by Amount (LKR)", 
                           labelStyle: { color: currentMode === 'Dark' ? '#e9ecef' : '#343a40' },
                           titleStyle: { color: currentMode === 'Dark' ? '#e9ecef' : '#343a40', fontSize: '16px'}, interval: 50000,
                         };
                         
    const primaryXAxis = { valueType: 'Category', 
                           title: "Month",
                           labelStyle: { color: currentMode === 'Dark' ? '#e9ecef' : '#343a40' }, 
                           titleStyle: { color: currentMode === 'Dark' ? '#e9ecef' : '#343a40', fontSize: '16px' } 
                         };

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

    var janTotal, febTotal, marTotal, aprTotal, mayTotal, junTotal, julTotal, augTotal, sepTotal, octTotal, novTotal, decTotal;
    janTotal= febTotal= marTotal= aprTotal= mayTotal= junTotal= julTotal= augTotal= sepTotal= octTotal=novTotal = decTotal = 0;

    var salesLen = sales.length;

    for (let index = 0; index < salesLen; index++) {
      
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
    
    let data = [
      { month: 'Jan', sales: janTotal }, { month: 'Feb', sales: febTotal },
      { month: 'Mar', sales: marTotal }, { month: 'Apr', sales: aprTotal },
      { month: 'May', sales: mayTotal }, { month: 'Jun', sales: junTotal },
      { month: 'Jul', sales: julTotal }, { month: 'Aug', sales: augTotal },
      { month: 'Sep', sales: sepTotal }, { month: 'Oct', sales: octTotal },
      { month: 'Nov', sales: novTotal }, { month: 'Dec' }
  ]

  return (
    <>
    <ChartsHeader category = "Chart" title = "Sales Analysis" />
      <ChartComponent primaryXAxis={primaryXAxis} primaryYAxis={primaryYAxis} tooltip={tooltip} 
        background={currentMode === 'Dark' ? '#33373E' : '#f3f4f6'}>
          <Inject services={[LineSeries, Tooltip, DataLabel, Category]} />
            <SeriesCollectionDirective>
              <SeriesDirective type = "Line" dataSource={data} xName="month" yName="sales"
                name = "Monthly Sales" marker = {{dataLable: {visible: true}, visible: true}}>
              </SeriesDirective>
            </SeriesCollectionDirective>
      </ChartComponent>
    </>
  )
}
