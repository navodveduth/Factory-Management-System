import React, { useState, useEffect }from 'react'
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip } from '@syncfusion/ej2-react-charts';
import axios from 'axios';

const TransactionPieChart = () => {
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
          

        <AccumulationChartComponent title='Transaction Distribution by Type' legendSettings={{position:"Bottom"}} tooltip={{enable:true}}>
            <Inject services={[PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip]} />
            <AccumulationSeriesCollectionDirective>
                <AccumulationSeriesDirective 
                    type="Pie"
                    innerRadius="50%"
                    dataSource={
                        [
                            { x: 'Revenue', y: (totalRev), text: (totalRev/total*100).toPrecision(2) + '%'},
                            { x: 'Expenses', y: (totalExp), text: (totalExp/total*100).toPrecision(2) + '%'},
                        ]
                    }
                    xName="x"
                    yName="y"
                    dataLabel={{
                        visible: true,
                        position: 'Outside',
                        name: 'text',
                    }}
                    >
                    
                </AccumulationSeriesDirective>
            </AccumulationSeriesCollectionDirective>

        </AccumulationChartComponent>
    </div>
  )
}

export default TransactionPieChart