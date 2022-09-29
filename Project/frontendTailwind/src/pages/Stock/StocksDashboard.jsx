import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {  GiRolledCloth, GiSewingNeedle, GiClothes } from 'react-icons/gi';
import { FaCoins } from 'react-icons/fa';
import { AiOutlineStock } from 'react-icons/ai';
import { DashTopBox, DashTopButton } from '../../components';

import { useStateContext } from '../../contexts/ContextProvider';
import StockBarChart from '../../components/StockBarChart';


const StocksDashboard = () => {
  const { currentColor, currentMode } = useStateContext();
  const [stock, setStock] = useState([]); //stock is the state variable and setStock is the function to update the state variable

  const getStock = async () => {  //getStock is the function to get the data from the backend
      axios.get("http://localhost:8070/stock/")
          .then((res) => {
              setStock(res.data); //setStock is used to update the state variable
          })
          .catch((err) => {
              alert(err.message);
          })
  }

  useEffect(() => { //useEffect is used to call the function getStock
      getStock();
  }, [])


  const itemCount = stock.length;
  const countRawMaterials= stock.filter((stk) => stk.stockCategory === 'Raw materials').length;
  const countWorkInProgress= stock.filter((stk) => stk.stockCategory === 'Work in progress').length;
  const countFinishedGoods= stock.filter((stk) => stk.stockCategory === 'Finished goods').length;
  var total = 0;
   for (let index = 0; index < itemCount; index++) {
      total = total + stock[index].totalValue; 
 }

  return (
    <div className="mt-5">

      <div className="flex flex-wrap lg:flex-nowrap justify-left ml-10 mt-5">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* top buttons in the dashboard */} {/* use for navigation buttons*/}
          <Link to="/StockView">
            <DashTopButton value="View All Stocks" />
          </Link>

          <Link to="/StockUtilisation">
            <DashTopButton value="View Stocks Utilisation" />
          </Link>

          <Link to="/StockAdd">
            <DashTopButton value="Add New Stock" />
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* small top boxes in the dashboard */} {/* use minimum 3, maximum 5 */}
          <DashTopBox icon={<FaCoins />} label="Total Stocks Value" data={total} />  
          <DashTopBox icon={<AiOutlineStock />} label="Total Items" data={itemCount} />
          <DashTopBox icon={<GiRolledCloth />} label="Total Raw Materials" data={countRawMaterials}/>
          <DashTopBox icon={<GiSewingNeedle />} label="Total Work In Progress" data={countWorkInProgress} />
          <DashTopBox icon={<GiClothes />} label="Total Finished Goods" data={countFinishedGoods} />       
        </div>
      </div>
    

    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
        <StockBarChart/>
       </div>
       </div>
  );
};

export default StocksDashboard;
