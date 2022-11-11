import React, {useState, useEffect} from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel } from '@syncfusion/ej2-react-charts';
import axios from 'axios';
import { ChartsHeader } from '../components';
import { useStateContext } from '../contexts/ContextProvider';


export default function SalesBarChart() {

    const { currentMode } = useStateContext();
    const [sales, setSales] = useState([]);

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

      //const salesCount = sales.length;
     
      const shirts= sales.filter((sale) => sale.itemName === 'Shirts').length;
      const tshirts= sales.filter((sale) => sale.itemName === 'T-Shirts').length;
      const caps= sales.filter((sale) => sale.itemName === 'Caps' ).length;
      const blouse= sales.filter((sale) => sale.itemName === 'Blouse').length;
      const jeans= sales.filter((sale) => sale.itemName === 'Jeans').length;
      const pants= sales.filter((sale) => sale.itemName === 'Pants').length;
      const shorts= sales.filter((sale) => sale.itemName === 'Shorts').length;
      const skirts= sales.filter((sale) => sale.itemName === 'Skirts').length;

      const barPrimaryXAxis = {
        valueType: 'Category',
        majorGridLines: { width: 0 },
        majorTickLines: { width: 2 },
        title: "Item Type",
        labelStyle: { 
          color: currentMode === 'Dark' ? '#e9ecef' : '#343a40'}, 
       titleStyle: { 
        color: currentMode === 'Dark' ? '#e9ecef' : '#343a40', 
        fontSize: '16px'}
        }

        const barPrimaryYAxis = {
        majorGridLines: { width: 2 },   
        majorTickLines: { width: 4 },
        lineStyle: { width: 4 },
        labelFormat: '{value}', 
        title: "Sales Count",
        labelStyle: { 
          color: currentMode === 'Dark' ? '#e9ecef' : '#343a40'}, 
       titleStyle: { 
        color: currentMode === 'Dark' ? '#e9ecef' : '#343a40', 
        fontSize: '16px'}
        }

        const barChartData = [
              {x:'Shirts', y: shirts, color: '#004777' },
              {x:'T-Shirts', y: tshirts, color: '#a30000' },
              {x:'Caps', y: caps, color: '#ff7700' },
              {x:'Blouse', y: blouse, color: '#DC7F9B'},
              {x:'Pants', y: pants, color: '#BD4089' },
              {x:'Jeans', y: jeans, color: '#7FB7BE' },
              {x:'Shorts', y: shorts, color: '#0DAB76' },
              {x:'Skirts', y:skirts, color: '#74B3CE' },
          ];
  
  return (
    <div >
              <ChartsHeader category = "Chart" title = "Item Analysis"  />
              <div className=" w-full">
                <ChartComponent
                
                  id="charts"
                  primaryXAxis={barPrimaryXAxis}
                  primaryYAxis={barPrimaryYAxis}
                  tooltip={{ enable: true }}
                  legendSettings={{ background: '#f3f4f6' }}
                  background={currentMode === 'Dark' ? '#3f434c' : '#f2f2f2'}
                >
                  <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]} />
                  <SeriesCollectionDirective>
                    <SeriesDirective dataSource={barChartData} xName="x" yName="y" name="Iteam Analysis" type="Column" pointColorMapping='color' columnWidth="0.5" marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }} />
                  </SeriesCollectionDirective>
                </ChartComponent>
              </div>
            </div>
  )
}
