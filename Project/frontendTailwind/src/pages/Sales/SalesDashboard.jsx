import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiPackage } from 'react-icons/fi';
import { DashTopBox, DashTopButton, SalesChart } from '../../components';

import { useStateContext } from '../../contexts/ContextProvider';


const SalesDashboard = () => {
  const { currentColor, currentMode } = useStateContext();

  const [sales, setSales] = useState([]);

  const getSale = async () => {
    axios
      .get('http://localhost:8070/sales/')
      .then((res) => {
        setSales(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getSale();
  }, []);

  const salesCount = sales.length;
  const finishedOrders= sales.filter((sale) => sale.status === 'Finished').length;
  const ongoingOrders= sales.filter((sale) => sale.status === 'Pending').length;
  const newOrders= sales.filter((sale) => sale.status === 'Placed').length;
  return (
    <div className="mt-5">

      <div className="flex flex-wrap lg:flex-nowrap justify-left ml-10 mt-5">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* top buttons in the dashboard */} {/* use for navigation buttons*/}
          <Link to="/SalesViewAll">
            <DashTopButton value="View All Orders"/>
          </Link>
          <Link to="/SalesCreate">
            <DashTopButton value="Create New Order"/>
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* small top boxes in the dashboard */} {/* use minimum 3, maximum 5 */}
          <DashTopBox icon={<FiPackage />} label="Total Sales" data={salesCount} />
          <DashTopBox icon={<FiPackage />} label="Ongoing Orders" data={ongoingOrders} />
          <DashTopBox icon={<FiPackage />} label="Placed Orders" data={newOrders} />
          <DashTopBox icon={<FiPackage />} label="Finished Orders" data={finishedOrders} />       
        </div>
      </div>
    

      {/* <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
          <SalesChart/>
      </div> */}
    </div>
  );
};

export default SalesDashboard;
