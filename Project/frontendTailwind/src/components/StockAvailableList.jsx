/**
 * ListView Default Sample
 */
 import React, { useState, useEffect } from 'react'
 import * as ReactDOM from 'react-dom';
 import axios from 'axios';
 import { ListBoxComponent } from '@syncfusion/ej2-react-dropdowns';
 import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
 import { Query } from '@syncfusion/ej2-data';

 function StockAvailableList() {

  const [stock, setStock] = useState([]); //stock is the state variable and setStock is the function to update the state variable

    const getStock = async () => {  //getStock is the function to get the data from the backend
        axios.get("http://localhost:8070/stock")
            .then((res) => {
                setStock(res.data); //setStock is used to update the state variable
                console.log(res.data);
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    useEffect(() => { //useEffect is used to call the function getStock
        getStock();
    }, [])

    const divStyle = {
        margin: 100,
        width: 300
    }

    const remoteData = new DataManager({
        url: "http://localhost:8070/stock",
        adaptor: new WebApiAdaptor
    })

    const dataQuery = new Query().select(['stockCode']).take(10).requiresCount();

     return (
       <div style={divStyle}>

         <ListBoxComponent
            dataSource={remoteData} query={dataQuery}
            fields={{
                value: "stockCode",
                text: "stockCode"
            }}
            
         ></ListBoxComponent>

       </div>
     )
   
  }

 export default StockAvailableList