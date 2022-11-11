import { React, useState, useEffect } from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import ChartsHeader from './ChartsHeader'
import axios from 'axios'
import { ChartComponent, LineSeries, Tooltip, DataLabel, Category, Inject, SeriesCollectionDirective, SeriesDirective } from '@syncfusion/ej2-react-charts';

export default function ProductionLineChart() {

    const { currentMode } = useStateContext();
    const [Orders, setOrder] = useState([]);


    const tooltip = { enable: true, shared: false };

    const primaryYAxis = { labelFormat: '{value}', 
                           title: "Production Cost by Amount (LKR)", 
                           labelStyle: { color: currentMode === 'Dark' ? '#e9ecef' : '#343a40' },
                           titleStyle: { color: currentMode === 'Dark' ? '#e9ecef' : '#343a40', fontSize: '16px'}, interval: 75000,
                         };
                         
    const primaryXAxis = { valueType: 'Category', 
                           title: "Month",
                           labelStyle: { color: currentMode === 'Dark' ? '#e9ecef' : '#343a40' }, 
                           titleStyle: { color: currentMode === 'Dark' ? '#e9ecef' : '#343a40', fontSize: '16px' } 
                         };

    async function getOrders(){
        await axios.get("http://localhost:8070/production/order/allOrders").then((res)=>{
         setOrder(res.data);
        }).catch((err)=>{
            alert(err.message);
        })
    }
  
    useEffect(() => {
      getOrders();
    }, [])

    var janTotal, febTotal, marTotal, aprTotal, mayTotal, junTotal, julTotal, augTotal, sepTotal, octTotal, novTotal, decTotal;
    janTotal= febTotal= marTotal= aprTotal= mayTotal= junTotal= julTotal= augTotal= sepTotal= octTotal=novTotal = decTotal = 0;

    var janMat,febMat,marMat,aprMat,mayMat,junMat,julMat,augMat,sepMat,octMat,novMat,decMat;
    janMat = febMat = marMat = aprMat = mayMat = junMat = julMat = augMat = sepMat = octMat = novMat = decMat = 0;
    var salesLen = Orders.length;

     const filteredOrders = [];
     Orders.map((data)=>{
        for(var i = 0;i < salesLen;i++){
            if(data.status == "Costed"){
                filteredOrders[i] = data[i];
                console.log("Dumbass", filteredOrders);
            }
          
        }
     })

     



 //   const ordervalue = 

    for (let index = 0; index < salesLen; index++) {
      console.log(new Date(Orders[index].requestDate).getMonth());
      console.log(Orders[index].budgetedtotalCost);
      switch(new Date(Orders[index].requestDate).getMonth()){
      case(0):
        janTotal = (parseFloat(janTotal) + Orders[index].budgetedtotalCost);
        janMat = (parseFloat(janMat) + Orders[index].budgetedMatCost);
        break;
      case(1):
        febTotal = febTotal + Orders[index].budgetedtotalCost;
        febMat  = (parseFloat( febMat ) + Orders[index].budgetedMatCost);
        break;
      case(2):
        marTotal = marTotal + Orders[index].budgetedtotalCost;
        marMat = (parseFloat(marMat) + Orders[index].budgetedMatCost);
        break;
      case(3):
        aprTotal = aprTotal + Orders[index].budgetedtotalCost;
        aprMat = (parseFloat(aprMat) + Orders[index].budgetedMatCost);
        break;
      case(4):
        mayTotal = mayTotal + Orders[index].budgetedtotalCost;
        mayMat  = (parseFloat(mayMat) + Orders[index].budgetedMatCost);
        break;
      case(5):
        junTotal = (parseFloat(junTotal) + Orders[index].budgetedtotalCost);
        junMat = (parseFloat(junMat) + Orders[index].budgetedMatCost);
        break;
      case(6):
        julTotal = (parseFloat(julTotal) + Orders[index].budgetedtotalCost);
        julMat = (parseFloat(julMat) + Orders[index].budgetedMatCost);
        break;
      case(7):
        augTotal = (parseFloat(augTotal) + Orders[index].budgetedtotalCosttotalCost);
        augMat = (parseFloat(augMat) + Orders[index].budgetedMatCost);
        break;
      case(8):
        sepTotal = (parseFloat(sepTotal) + Orders[index].budgetedtotalCost);
        sepMat = (parseFloat(sepMat) + Orders[index].budgetedMatCost);
        break;
      case(9):
        octTotal = (parseFloat(octTotal) + Orders[index].budgetedtotalCost);
        octMat = (parseFloat(octMat) + Orders[index].budgetedMatCost);
        break;
      case(10):
        novTotal  = (parseFloat(novTotal) + Orders[index].budgetedtotalCost);
        novMat = (parseFloat(novMat) + Orders[index].budgetedMatCost);
        break;
      case(11):
        decTotal = decTotal + Orders[index].budgetedtotalCost;
        decMat = (parseFloat(decMat) + Orders[index].budgetedMatCost);
        break;
      default:
        break;
    }
    }
    
    let material = [
        { month: 'Jan', Material: janMat }, { month: 'Feb', Material: febMat },
        { month: 'Mar', Material: marMat }, { month: 'Apr', Material: aprMat },
        { month: 'May', Material: mayMat }, { month: 'Jun', Material: junMat },
        { month: 'Jul', Material: julMat }, { month: 'Aug', Material: augMat },
        { month: 'Sep', Material: sepMat }, { month: 'Oct', Material: octMat },
        { month: 'Nov', Material: novMat }, { month: 'Dec',Material: decMat }
    ]

    let data = [
      { month: 'Jan', Total: janTotal }, { month: 'Feb', Total: febTotal },
      { month: 'Mar', Total: marTotal }, { month: 'Apr', Total: aprTotal },
      { month: 'May', Total: mayTotal }, { month: 'Jun', Total: junTotal },
      { month: 'Jul', Total: julTotal }, { month: 'Aug', Total: augTotal },
      { month: 'Sep', Total: sepTotal }, { month: 'Oct', Total: octTotal },
      { month: 'Nov', Total: novTotal }, { month: 'Dec' }
    ]

    const colors = ['#258EA6', '#F3A738', '#32CD32', '#FF8C00', '#4B0082'];
  
  return (
    <>
    <ChartsHeader category = "Chart" title = "Production Cost Analysis" />
      <ChartComponent primaryXAxis={primaryXAxis} primaryYAxis={primaryYAxis} tooltip={tooltip} 
        background={currentMode === 'Dark' ? '#33373E' : '#f3f4f6'} palettes={colors}>
          <Inject services={[LineSeries, Tooltip, DataLabel, Category]} />
            <SeriesCollectionDirective>
              <SeriesDirective type = "Line" dataSource={data} xName="month" yName="Total"
                name = "Monthly Total Cost" marker = {{dataLable: {visible: true}, visible: true}}>
              </SeriesDirective>
              <SeriesDirective type = "Line" dataSource={material} xName="month" yName="Material"
                name = "Monthly Budgeted Total Cost" marker = {{dataLable: {visible: true}, visible: true}}>
              </SeriesDirective>
            </SeriesCollectionDirective>
      </ChartComponent>
    </>
  )
}
