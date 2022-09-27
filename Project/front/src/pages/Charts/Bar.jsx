import React from 'react';
import axios from 'axios'
import {useEffect, useState } from 'react'

import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel } from '@syncfusion/ej2-react-charts';

import { barCustomSeries, barPrimaryXAxis, barPrimaryYAxis } from '../../data/dummy';
import { ChartsHeader } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';

const Bar = () => {
  const { currentMode,  } = useStateContext();

  const [Emp, setData] = useState([]); 
    const getData = async () => {  
        axios.get("http://localhost:8070/dashDummy")
        .then((res) => { 
            setData(res.data); 
        })
        .catch((err) => { 
            alert(err.message); 
        })
    }

    useEffect(() => { 
        getData();
    }, [])
        
  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <ChartsHeader category="Bar" title="Olympic Medal Counts - RIO" />
      <div className=" w-full">
        <ChartComponent
          id="charts"
          primaryXAxis={{
            valueType: 'Category',
            title: 'Name',
            interval: 1,
            labelStyle: { color: currentMode === 'Dark' ? '#fff' : '#000' },
            
          }}
          primaryYAxis={{
            title: 'Values',
            labelStyle: { color: currentMode === 'Dark' ? '#fff' : '#000' },
            minimum: 0,
            maximum: 100,
            interval: 10,
            majorGridLines: { width: 0 },
          }}
          chartArea={{ border: { width: 0 } }}
          tooltip={{ enable: true }}
          background={currentMode === 'Dark' ? '#33373E' : '#fff'}
          legendSettings={{ background: 'white' }}
        >
          <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]} />
          <SeriesCollectionDirective>
            <SeriesDirective type="Column" dataSource={Emp} xName="name" yName="value" name="Sales" />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default Bar;
