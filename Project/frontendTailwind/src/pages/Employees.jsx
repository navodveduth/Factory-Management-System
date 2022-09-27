import React from 'react';
import axios from 'axios'
import {useEffect, useState } from 'react'
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';

import { Button, Header } from '../components';

const Employees = () => {
  
  const [Emp, setData] = useState([]); 
    const getData = async () => {  
        axios.get("http://localhost:8070/employee/viewEmployee")
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

  const toolbarOptions = ['Search'];

  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Employees" />
      <GridComponent
        dataSource={Emp}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <ColumnDirective field="employeeNumber" headerText="Employee Number" width="100" />
          <ColumnDirective field="employeeFullName" headerText="Name" width="100" />
          <ColumnDirective field="employeeNIC" headerText="NIC" width="100" />
          <ColumnDirective field="employeeGender" headerText="Gender" width="100" />
          <ColumnDirective field="employeeDesignation" headerText="Designation" width="100" />
          <ColumnDirective field="employeeDepartment" headerText="Department" width="100" />
        
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />

      </GridComponent>
    </div>
  );
};
export default Employees;
