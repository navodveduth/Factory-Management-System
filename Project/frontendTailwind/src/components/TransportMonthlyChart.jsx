import { React, useState, useEffect } from 'react';
import {
  ChartComponent,
  LineSeries,
  Tooltip,
  DataLabel,
  Category,
  Inject,
  SeriesCollectionDirective,
  SeriesDirective,
} from '@syncfusion/ej2-react-charts';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';
import ChartsHeader from './ChartsHeader';

const TransportMonthlyChart = () => {
  const { currentMode } = useStateContext();
  const [transport, setTransport] = useState([]);

  const tooltip = { enable: true, shared: false };

  const primaryYAxis = {
    labelFormat: '{value}',
    title: 'Transportation Cost (LKR)',
    labelStyle: { color: currentMode === 'Dark' ? '#e9ecef' : '#343a40' },
    titleStyle: {
      color: currentMode === 'Dark' ? '#e9ecef' : '#343a40',
      fontSize: '16px',
    },
    interval: 50000,
  };

  const primaryXAxis = {
    valueType: 'Category',
    title: 'Month',
    labelStyle: { color: currentMode === 'Dark' ? '#e9ecef' : '#343a40' },
    titleStyle: {
      color: currentMode === 'Dark' ? '#e9ecef' : '#343a40',
      fontSize: '16px',
    },
  };

  const getTransport = async () => {
    axios
      .get('http://localhost:8070/transport/')
      .then((res) => {
        setTransport(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getTransport();
  }, []);

  let janTotal = 0;
  let febTotal = 0;
  let marTotal = 0;
  let aprTotal = 0;
  let mayTotal = 0;
  let junTotal = 0;
  let julTotal = 0;
  let augTotal = 0;
  let sepTotal = 0;
  let octTotal = 0;
  let novTotal = 0;
  let decTotal = 0;

  const transportLen = transport.length;

  for (let index = 0; index < transportLen; index++) {
    switch (new Date(transport[index].date).getMonth()) {
      case 0:
        janTotal += transport[index].transportCost;
        break;
      case 1:
        febTotal += transport[index].transportCost;
        break;
      case 2:
        marTotal += transport[index].transportCost;
        break;
      case 3:
        aprTotal += transport[index].transportCost;
        break;
      case 4:
        mayTotal += transport[index].transportCost;
        break;
      case 5:
        junTotal += transport[index].transportCost;
        break;
      case 6:
        julTotal += transport[index].transportCost;
        break;
      case 7:
        augTotal += transport[index].transportCost;
        break;
      case 8:
        sepTotal += transport[index].transportCost;
        break;
      case 9:
        octTotal += transport[index].transportCost;
        break;
      case 10:
        novTotal += transport[index].transportCost;
        break;
      case 11:
        decTotal += transport[index].transportCost;
        break;
      default:
        break;
    }
  }

  const data = [
    { month: 'Jan', cost: janTotal },
    { month: 'Feb', cost: febTotal },
    { month: 'Mar', cost: marTotal },
    { month: 'Apr', cost: aprTotal },
    { month: 'May', cost: mayTotal },
    { month: 'Jun', cost: junTotal },
    { month: 'Jul', cost: julTotal },
    { month: 'Aug', cost: augTotal },
    { month: 'Sep', cost: sepTotal },
    { month: 'Oct', cost: octTotal },
    { month: 'Nov', cost: novTotal },
    { month: 'Dec', cost: decTotal },
  ];

  return (
    <>
      <ChartsHeader category="Chart" title="Transportation Cost Analysis" />
      <ChartComponent
        primaryXAxis={primaryXAxis}
        primaryYAxis={primaryYAxis}
        tooltip={tooltip}
        background={currentMode === 'Dark' ? '#33373E' : '#f3f4f6'}
      >
        <Inject services={[LineSeries, Tooltip, DataLabel, Category]} />
        <SeriesCollectionDirective>
          <SeriesDirective
            type="Line"
            dataSource={data}
            xName="month"
            yName="cost"
            name="Monthly Transportation Cost"
            marker={{ dataLable: { visible: true }, visible: true }}
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </>
  );
};

export default TransportMonthlyChart;
