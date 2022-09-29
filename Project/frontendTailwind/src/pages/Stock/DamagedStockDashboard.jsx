import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiUser } from 'react-icons/fi';
import { DashTopBox, DashTopButton } from '../../components';

import { useStateContext } from '../../contexts/ContextProvider';


const DamagedStockDashboard = () => {
  const { currentColor, currentMode } = useStateContext();

  const [damagedStock, setDamagedStock] = useState([]); //damagedStock is the state variable and setDamagedStock is the function to update the state variable

    const getdamagedStock = async () => {  //getdamagedStock is the function to get the data from the backend
        axios.get("http://localhost:8070/damagedStock/")
            .then((res) => {
                setDamagedStock(res.data); //setDamagedStock is used to update the state variable
                console.log(res.data);
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    useEffect(() => { //useEffect is used to call the function getdamagedStock
        getdamagedStock();
    }, [])
  
  const itemCount = damagedStock.length;
  const countRawMaterials= damagedStock.filter((dstk) => dstk.damagedStockCategory === 'Raw materials').length;
  const countWorkInProgress= damagedStock.filter((dstk) => dstk.damagedStockCategory === 'Work in progress').length;
  const countFinishedGoods= damagedStock.filter((dstk) => dstk.damagedStockCategory === 'Finished goods').length;
  const countUsable = damagedStock.filter((dstk) => dstk.usability === 'Usable').length;
  const countNotUsable = damagedStock.filter((dstk) => dstk.usability === 'Not usable').length;

  return (
    <div className="mt-5">

      <div className="flex flex-wrap lg:flex-nowrap justify-left ml-10 mt-5">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* top buttons in the dashboard */} {/* use for navigation buttons*/}
          <Link to="/DamagedStockView">
            <DashTopButton value="View All Damaged Stocks" />
          </Link>
          <Link to="/DamagedStockAdd">
            <DashTopButton value="Add New Damaged Stock" />
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* small top boxes in the dashboard */} {/* use minimum 3, maximum 5 */}
          <DashTopBox icon={<FiUser />} label="Total Items" data={itemCount} />
          <DashTopBox icon={<FiUser />} label="Total Raw Materials" data={countRawMaterials} />
          <DashTopBox icon={<FiUser />} label="Total Work in progress" data={countWorkInProgress} />
          <DashTopBox icon={<FiUser />} label="Total Finished Goods" data={countFinishedGoods} />    
          <DashTopBox icon={<FiUser />} label="Total Usables" data={countUsable} />
          <DashTopBox icon={<FiUser />} label="Total Not Usables" data={countNotUsable} />   
        </div>
      </div>
    </div>

    /* <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
        ----------use this div to create your graphs.--------------
        ----------one div per graph -------------------------------
       <div>*/
  );
};

export default DamagedStockDashboard;
