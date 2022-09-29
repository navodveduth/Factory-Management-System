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

const TransportPieChart = () => {
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
      <AccumulationChartComponent
        title="Transport Distribution"
        legendSettings={{ position: 'Bottom' }}
        tooltip={{ enable: true }}
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
            innerRadius="50%"
            dataSource={[
              {
                x: 'Employee',
                y: ((empTr / totTransport) * 100).toPrecision(4),
                text: `${((empTr / totTransport) * 100).toPrecision(2)}%`,
              },
              {
                x: 'Staff',
                y: ((staffTr / totTransport) * 100).toPrecision(4),
                text: `${((staffTr / totTransport) * 100).toPrecision(2)}%`,
              },
              {
                x: 'Goods',
                y: ((staffTr / totTransport) * 100).toPrecision(4),
                text: `${((goodsTr / totTransport) * 100).toPrecision(2)}%`,
              },
            ]}
            xName="x"
            yName="y"
            dataLabel={{
              visible: true,
              position: 'Outside',
              name: 'text',
            }}
          />
        </AccumulationSeriesCollectionDirective>
      </AccumulationChartComponent>
    </div>
  );
};

export default TransportPieChart;
