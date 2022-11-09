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
            [
                {x:'Shirts', y: shirts },
            ],
            [
                {x:'T-Shirts', y: tshirts },
            ],
            [
                {x:'Caps', y: caps },
            ],
            [
                {x:'Blouse', y: blouse },
            ],
            [
                {x:'Pants', y: pants },
            ],
            [
                {x:'Jeans', y: jeans },
            ],
            [
              {x:'Shorts', y: shorts },
          ],
          [
              {x:'Skirts', y:skirts },
          ],
          
        ]
        
          const barCustomSeries = [
            {
              dataSource: barChartData[0],
              xName: 'x',
              yName: 'y',
              name: 'Shirts',
              type: 'Column',
              
            },
            {
              dataSource: barChartData[1],
              xName: 'x',
              yName: 'y',
              name: 'T-Shirts',
              type: 'Column',
              
            },
            {
              dataSource: barChartData[2],
              xName: 'x',
              yName: 'y',
              name: 'Caps',
              type: 'Column',
              
            },
            {
                dataSource: barChartData[3],
                xName: 'x',
                yName: 'y',
                name: 'Blouse',
                type: 'Column',
                
              },
              {
                dataSource: barChartData[4],
                xName: 'x',
                yName: 'y',
                name: 'Pants',
                type: 'Column',
                
              },
              {
                dataSource: barChartData[5],
                xName: 'x',
                yName: 'y',
                name: 'Jeans',
                type: 'Column',
                
              },
              {
                dataSource: barChartData[6],
                xName: 'x',
                yName: 'y',
                name: 'Shorts',
                type: 'Column',
                
              },
              {
                dataSource: barChartData[7],
                xName: 'x',
                yName: 'y',
                name: 'Skirts',
                type: 'Column',
                
              },          
          ];
  
  return (
    <div className="m-0 md:m-10 mt-0 p-0 max-h-21 bg-white dark:bg-secondary-dark-bg rounded-3xl">
              <ChartsHeader category = "Chart" title = "Item Analysis"  />
              <div className=" w-full">
                <ChartComponent
                
                  id="charts"
                  primaryXAxis={barPrimaryXAxis}
                  primaryYAxis={barPrimaryYAxis}
                  chartArea={{ border: { width: 2 } }}
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
  )
}
