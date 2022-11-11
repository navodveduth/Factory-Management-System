import React, { useState, useEffect }from 'react'
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip } from '@syncfusion/ej2-react-charts';
import axios from 'axios';
import ChartsHeader from './ChartsHeader'
import { useStateContext } from '../contexts/ContextProvider';

const TransactionPieChart = () => {
    const { currentMode } = useStateContext();
    const [TRN, setTransactions] = useState([]);

    const getFinance = async () => {
      axios
        .get('http://localhost:8070/finance/viewTransaction')
        .then((res) => {
          setTransactions(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    };
  
    useEffect(() => {
      getFinance();
    }, []);
  
    var totalRev = 0, totalExp = 0, total = 0;;

  return (
    <div >

      {TRN.filter((TRN) => TRN.trnType === 'Revenue').map((TRN) => {
        totalRev += TRN.trnAmount;
        total += TRN.trnAmount; 
        })}
        {TRN.filter((TRN) => TRN.trnType === 'Expense').map((TRN) => {
          totalExp += TRN.trnAmount;
          total += TRN.trnAmount; 
          })}
          
          <ChartsHeader category="Chart" title="Transaction Distribution by Type" />
          <AccumulationChartComponent legendSettings={{position:"Right", background: "white"}} tooltip={{enable:true}} background={currentMode === 'Dark' ? '#3f434c' : '#f2f2f2'} >
            <Inject services={[PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip]} />
            <AccumulationSeriesCollectionDirective>
                <AccumulationSeriesDirective 
                    type="Pie"
                    dataSource={
                        [
                            { x: 'Revenue', y: (totalRev), text: (totalRev/total*100).toPrecision(2) + '%', color: '#457b9d' },
                            { x: 'Expenses', y: (totalExp), text: (totalExp/total*100).toPrecision(2) + '%', color: '#e63946' },
                        ]
                    }
                    pointColorMapping = "color"
                    xName="x"
                    yName="y"
                    innerRadius="40%"
                    startAngle={0}
                    endAngle={360}
                    radius="70%"
                    explode
                    explodeOffset="10%"
                    explodeIndex={2}
                    dataLabel={{
                      visible: true,
                      position: 'Outside',
                      name: 'text',
                      font: {
                        fontWeight: '600',
                      },
                    }}
                    >
                    
                </AccumulationSeriesDirective>
            </AccumulationSeriesCollectionDirective>

        </AccumulationChartComponent>
    </div>
  )
}

export default TransactionPieChart