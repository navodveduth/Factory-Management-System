import { React, useState, useEffect } from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import ChartsHeader from './ChartsHeader'
import axios from 'axios'
import { ChartComponent, LineSeries, Tooltip, DataLabel, Category, Inject, SeriesCollectionDirective, SeriesDirective, Legend } from '@syncfusion/ej2-react-charts';

export default function SalesMonthlyChart() {

    const { currentMode } = useStateContext();
    const [sales, setSales] = useState([]);
    const [prod, setProd] = useState([]);
    const [purchase, setPurchase] = useState([]);
    

    const tooltip = { enable: true, shared: false };

    const primaryYAxis = { labelFormat: '{value}', 
                           title: "Revenue, Expenses, and Profit by Amount (LKR)", 
                           labelStyle: { 
                            color: currentMode === 'Dark' ? '#e9ecef' : '#343a40'}, 
                          titleStyle: { 
                          color: currentMode === 'Dark' ? '#e9ecef' : '#343a40', 
                          fontSize: '16px',
                          fontWeight: 'bold'}, interval: 100000,
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

    //purchaseOrder get function

    const getPurchaseOrder = async () => {
    axios.get('http://localhost:8070/purchaseOrder')
        .then((res) => {
            setPurchase(res.data);
        })
        .catch((err) => {
            alert(err.message);
        })
    }
    //production
    const getProduction = async () => {
      axios
        .get('http://localhost:8070/production/order/allOrders')
        .then((res) => {
          setProd(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    };
  
    useEffect(() => {
      getSales();
      getPurchaseOrder();
      getProduction();
    }, [])

    var janTotalSales, febTotalSales, marTotalSales, aprTotalSales, mayTotalSales, junTotalSales, julTotalSales, augTotalSales, sepTotalSales, octTotalSales, novTotalSales, decTotalSales;
    janTotalSales= febTotalSales= marTotalSales= aprTotalSales= mayTotalSales= junTotalSales= julTotalSales= augTotalSales= sepTotalSales= octTotalSales=novTotalSales = decTotalSales = 0;

    var salesLen = sales.length;

    for (let index = 0; index < salesLen; index++) {
      switch(new Date(sales[index].orderDate).getMonth()){
        case(0):
        janTotalSales = janTotalSales + sales[index].totalAmount;
        break;
      case(1):
        febTotalSales = febTotalSales + sales[index].totalAmount;
        break;
      case(2):
        marTotalSales = marTotalSales + sales[index].totalAmount;
        break;
      case(3):
        aprTotalSales = aprTotalSales + sales[index].totalAmount;
        break;
      case(4):
        mayTotalSales = mayTotalSales + sales[index].totalAmount;
        break;
      case(5):
        junTotalSales = junTotalSales + sales[index].totalAmount;
        break;
      case(6):
        julTotalSales = julTotalSales + sales[index].totalAmount;
        break;
      case(7):
        augTotalSales = augTotalSales + sales[index].totalAmount;
        break;
      case(8):
        sepTotalSales = sepTotalSales + sales[index].totalAmount;
        break;
      case(9):
        octTotalSales = octTotalSales + sales[index].totalAmount;
        break;
      case(10):
        novTotalSales  = (parseInt(novTotalSales) + sales[index].totalAmount);
        break;
      case(11):
        decTotalSales = decTotalSales + sales[index].totalAmount;
        break;
      default:
        break;
    }
    }

    var janTotalPurchase, febTotalPurchase, marTotalPurchase, aprTotalPurchase, mayTotalPurchase, junTotalPurchase, julTotalPurchase, augTotalPurchase, sepTotalPurchase, octTotalPurchase, novTotalPurchase, decTotalPurchase;
    janTotalPurchase= febTotalPurchase= marTotalPurchase= aprTotalPurchase= mayTotalPurchase= junTotalPurchase= julTotalPurchase= augTotalPurchase= sepTotalPurchase= octTotalPurchase=novTotalPurchase = decTotalPurchase = 0;

    var purchaseLen = purchase.length;

    for (let index = 0; index < purchaseLen; index++) {
      switch(new Date(purchase[index].deliveryDate).getMonth()){
      case(0):
        janTotalPurchase = janTotalPurchase + purchase[index].cost;
        break;
      case(1):
        febTotalPurchase = febTotalPurchase + purchase[index].cost;
        break;
      case(2):
        marTotalPurchase = marTotalPurchase + purchase[index].cost;
        break;
      case(3):
        aprTotalPurchase = aprTotalPurchase + purchase[index].cost;
        break;
      case(4):
        mayTotalPurchase = mayTotalPurchase + purchase[index].cost;
        break;
      case(5):
        junTotalPurchase = junTotalPurchase + purchase[index].cost;
        break;
      case(6):
        julTotalPurchase = julTotalPurchase + purchase[index].cost;
        break;
      case(7):
        augTotalPurchase = augTotalPurchase + purchase[index].cost;
        break;
      case(8):
        sepTotalPurchase = sepTotalPurchase + purchase[index].cost;
        break;
      case(9):
        octTotalPurchase = octTotalPurchase + purchase[index].cost;
        break;
      case(10):
        novTotalPurchase  = (parseInt(novTotalPurchase) + purchase[index].cost);
        break;
      case(11):
        decTotalPurchase = decTotalPurchase + purchase[index].cost;
        break;
      default:
        break;
    }
    }

    var janTotalProduction, febTotalProduction, marTotalProduction, aprTotalProduction, mayTotalProduction, junTotalProduction, julTotalProduction, augTotalProduction, sepTotalProduction, octTotalProduction, novTotalProduction, decTotalProduction;
    janTotalProduction= febTotalProduction= marTotalProduction= aprTotalProduction= mayTotalProduction= junTotalProduction= julTotalProduction= augTotalProduction= sepTotalProduction= octTotalProduction=novTotalProduction = decTotalProduction = 0;

    var prodLen = prod.length;

    for (let index = 0; index < prodLen; index++) {
      if(prod[index].status === "Costed"){
      switch(new Date(prod[index].requestDate).getMonth()){
      case(0):
        janTotalProduction = janTotalProduction + prod[index].totalCost;
        break;
      case(1):
        febTotalProduction = febTotalProduction + prod[index].totalCost;
        break;
      case(2):
        marTotalProduction = marTotalProduction + prod[index].totalCost;
        break;
      case(3):
        aprTotalProduction = aprTotalProduction + prod[index].totalCost;
        break;
      case(4):
        mayTotalProduction = mayTotalProduction + prod[index].totalCost;
        break;
      case(5):
        junTotalProduction = junTotalProduction + prod[index].totalCost;
        break;
      case(6):
        julTotalProduction = julTotalProduction + prod[index].totalCost;
        break;
      case(7):
        augTotalProduction = augTotalProduction + prod[index].totalCost;
        break;
      case(8):
        sepTotalProduction = sepTotalProduction + prod[index].totalCost;
        break;
      case(9):
        octTotalProduction = octTotalProduction + prod[index].totalCost;
        break;
      case(10):
        novTotalProduction  = (parseInt(novTotalProduction) + prod[index].totalCost);
        break;
      case(11):
        decTotalProduction = decTotalProduction + prod[index].totalCost;
        break;
      default:
        break;
      }
    }
    }

    var janTotalGross, febTotalGross, marTotalGross, aprTotalGross, mayTotalGross, junTotalGross, julTotalGross, augTotalGross, sepTotalGross, octTotalGross, novTotalGross, decTotalGross;
    janTotalGross= febTotalGross= marTotalGross= aprTotalGross= mayTotalGross= junTotalGross= julTotalGross= augTotalGross= sepTotalGross= octTotalGross=novTotalGross = decTotalGross = 0;


    janTotalGross = janTotalSales - janTotalPurchase - janTotalProduction;
    febTotalGross = febTotalSales - febTotalPurchase - febTotalProduction;
    marTotalGross = marTotalSales - marTotalPurchase - marTotalProduction;
    aprTotalGross = aprTotalSales - aprTotalPurchase - aprTotalProduction;
    mayTotalGross = mayTotalSales - mayTotalPurchase - mayTotalProduction;
    junTotalGross = junTotalSales - junTotalPurchase - junTotalProduction;
    julTotalGross = julTotalSales - julTotalPurchase - julTotalProduction;
    augTotalGross = augTotalSales - augTotalPurchase - augTotalProduction;
    sepTotalGross = sepTotalSales - sepTotalPurchase - sepTotalProduction;
    octTotalGross = octTotalSales - octTotalPurchase - octTotalProduction;
    novTotalGross = novTotalSales - novTotalPurchase - novTotalProduction;
    decTotalGross = decTotalSales - decTotalPurchase - decTotalProduction;


    let data = [
      { month: 'Jan', sales: janTotalSales }, { month: 'Feb', sales: febTotalSales },
      { month: 'Mar', sales: marTotalSales }, { month: 'Apr', sales: aprTotalSales },
      { month: 'May', sales: mayTotalSales }, { month: 'Jun', sales: junTotalSales },
      { month: 'Jul', sales: julTotalSales }, { month: 'Aug', sales: augTotalSales },
      { month: 'Sep', sales: sepTotalSales }, { month: 'Oct', sales: octTotalSales },
      { month: 'Nov', sales: novTotalSales }, { month: 'Dec' }
    ]
    
    let purchases = [
      { month: 'Jan', purchase: janTotalPurchase }, { month: 'Feb', purchase: febTotalPurchase },
      { month: 'Mar', purchase: marTotalPurchase }, { month: 'Apr', purchase: aprTotalPurchase },
      { month: 'May', purchase: mayTotalPurchase }, { month: 'Jun', purchase: junTotalPurchase },
      { month: 'Jul', purchase: julTotalPurchase }, { month: 'Aug', purchase: augTotalPurchase },
      { month: 'Sep', purchase: sepTotalPurchase }, { month: 'Oct', purchase: octTotalPurchase },
      { month: 'Nov', purchase: novTotalPurchase }, { month: 'Dec' }
  ]

  let production = [
    { month: 'Jan', prod: janTotalProduction }, { month: 'Feb', prod: febTotalProduction },
    { month: 'Mar', prod: marTotalProduction }, { month: 'Apr', prod: aprTotalProduction },
    { month: 'May', prod: mayTotalProduction }, { month: 'Jun', prod: junTotalProduction },
    { month: 'Jul', prod: julTotalProduction }, { month: 'Aug', prod: augTotalProduction },
    { month: 'Sep', prod: sepTotalProduction }, { month: 'Oct', prod: octTotalProduction },
    { month: 'Nov', prod: novTotalProduction }, { month: 'Dec',  }
]

let gross = [
  { month: 'Jan', gross: janTotalGross }, { month: 'Feb', gross: febTotalGross },
  { month: 'Mar', gross: marTotalGross }, { month: 'Apr', gross: aprTotalGross },
  { month: 'May', gross: mayTotalGross }, { month: 'Jun', gross: junTotalGross },
  { month: 'Jul', gross: julTotalGross }, { month: 'Aug', gross: augTotalGross },
  { month: 'Sep', gross: sepTotalGross }, { month: 'Oct', gross: octTotalGross },
  { month: 'Nov', gross: novTotalGross }, { month: 'Dec', }
]

const colors = ['#ef476f', '#ffd166', '#06d6a0', '#118ab2', '#e36414'];
return (
  <>
  <ChartsHeader category = "Gross Profit Analysis" />
  <ChartComponent primaryXAxis={primaryXAxis} primaryYAxis={primaryYAxis} tooltip={tooltip} 
        background={currentMode === 'Dark' ? '#3f434c' : '#f2f2f2'} palettes={colors} legendSettings={{background: "white"}}>
        <Inject services={[LineSeries, Tooltip, DataLabel, Category, Legend]} />

          <SeriesCollectionDirective>
            <SeriesDirective type = "Line" dataSource={data} xName="month" yName="sales"
              name = "Monthly Sales" marker = {{dataLable: {visible: true}, visible: true}}>
            </SeriesDirective>
            <SeriesDirective type = "Line" dataSource={purchases} xName="month" yName="purchase"
              name = "Monthly Purchase" marker = {{dataLable: {visible: true}, visible: true}}>
            </SeriesDirective>
            <SeriesDirective type = "Line" dataSource={production} xName="month" yName="prod"
              name = "Monthly Production" marker = {{dataLable: {visible: true}, visible: true}}>
            </SeriesDirective>
            <SeriesDirective type = "Line" dataSource={gross} xName="month" yName="gross" colorName='white'
              name = "Monthly Gross Profit" marker = {{dataLable: {visible: true}, visible: true}}>
            </SeriesDirective>
          </SeriesCollectionDirective>
    </ChartComponent>
  </>
)
}
