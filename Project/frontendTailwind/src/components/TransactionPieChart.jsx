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
  
    const trnCount = TRN.length;
    const trnRev= TRN.filter((trn) => trn.trnType === 'Revenue').length;
    const trnExpenses= TRN.filter((trn) => trn.trnType === 'Expense').length;
  return (
    <div >
        <AccumulationChartComponent title='Transaction Distribution by Type' legendSettings={{position:"Bottom"}} tooltip={{enable:true}}>
            <Inject services={[PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip]} />
            <AccumulationSeriesCollectionDirective>
                <AccumulationSeriesDirective 
                    type="Pie"
                    innerRadius="50%"
                    dataSource={
                        [
                            { x: 'Revenue', y: (trnRev/trnCount*100).toPrecision(4), text: (trnRev/trnCount*100).toPrecision(2) + '%'},
                            { x: 'Expenses', y: (trnExpenses/trnCount*100).toPrecision(4), text: (trnExpenses/trnCount*100).toPrecision(2) + '%'},
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