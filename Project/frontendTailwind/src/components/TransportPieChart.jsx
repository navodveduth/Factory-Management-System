import React, { useState, useEffect } from 'react';
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  PieSeries,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationTooltip,
} from '@syncfusion/ej2-react-charts';
import axios from 'axios';
import ChartsHeader from './ChartsHeader';
import { useStateContext } from '../contexts/ContextProvider';

const TransportPieChart = () => {
  const { currentMode } = useStateContext();
  const [transport, setTransport] = useState([]);

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

  const totTransport = transport.length;
  const empTr = transport.filter((data) => data.type === 'Employee').length;
  const staffTr = transport.filter((data) => data.type === 'Staff').length;
  const goodsTr = transport.filter((data) => data.type === 'Goods').length;

  return (
    <div>
      <ChartsHeader category="Chart" title="Transport Distribution" />
      <AccumulationChartComponent
        legendSettings={{ position: 'Right', background: 'white' }}
        tooltip={{ enable: true }}
        background={currentMode === 'Dark' ? '#3f434c' : '#f2f2f2'}
      >
        <Inject
          services={[
            PieSeries,
            AccumulationDataLabel,
            AccumulationLegend,
            AccumulationTooltip,
          ]}
        />
        <AccumulationSeriesCollectionDirective>
          <AccumulationSeriesDirective
            type="Pie"
            dataSource={[
              {
                x: 'Employees',
                y: ((empTr / totTransport) * 100).toPrecision(4),
                text: `${((empTr / totTransport) * 100).toPrecision(2)}%`,
                color: '#0454d9',
              },
              {
                x: 'Staff',
                y: ((staffTr / totTransport) * 100).toPrecision(4),
                text: `${((staffTr / totTransport) * 100).toPrecision(2)}%`,
                color: '#FF8B8B',
              },
              {
                x: 'Goods',
                y: ((goodsTr / totTransport) * 100).toPrecision(4),
                text: `${((goodsTr / totTransport) * 100).toPrecision(2)}%`,
                color: '#FD841F',
              },
            ]}
            xName="x"
            yName="y"
            innerRadius="40%"
            pointColorMapping="color"
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
          />
        </AccumulationSeriesCollectionDirective>
      </AccumulationChartComponent>
    </div>
  );
};

export default TransportPieChart;
