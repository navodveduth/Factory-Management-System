import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiUser } from 'react-icons/fi';
import { DashTopBox, DashTopButton, ProductionPieChart } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import {RiShirtFill} from "react-icons/ri"
import {FaTshirt} from "react-icons/fa"
import {SiSpreadshirt} from "react-icons/si"
import {GiArmoredPants} from "react-icons/gi"
import {CgBox} from "react-icons/cg"

const ProductionDashBoard = () => {
  const { currentColor, currentMode } = useStateContext();
  const [Order,setOrder] = useState([]);

  async function getOrders(){
      await axios.get("http://localhost:8070/production/order/allOrders").then((res)=>{
          setOrder(res.data);
      }).catch((err)=>{
          alert(err.message);
      })
  }

  useEffect(() => {
    getOrders();
  }, []);

  const prodCount = Order.length;
  const prodT= Order.filter((Order) => Order.orderName == 'T-Shirts').length;
  const prodCollars= Order.filter((Order) => Order.orderName == 'Collars').length;
  const prodTrousers= Order.filter((Order) => Order.orderName == 'Trousers').length;
  const prodShirts= Order.filter((Order) => Order.orderName == 'Shirts').length;
  return (

    <div className="mt-5">
      <div className="flex flex-wrap lg:flex-nowrap justify-left ml-10 mt-5">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* top buttons in the dashboard */} {/* use for navigation buttons*/}
          <Link to="/vieworders">
            <DashTopButton value="View All Orders" />
          </Link>
          <Link to="/newOrder">
            <DashTopButton value="Create New Production Voucher"/>
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* small top boxes in the dashboard */} {/* use minimum 3, maximum 5 */}
          <DashTopBox icon={<CgBox />} label="Total Products" data={prodCount} />
          <DashTopBox icon={<FaTshirt />} label="Total T-shirts" data={prodT} />
          <DashTopBox icon={<SiSpreadshirt/>} label="Total Collars" data={prodCollars} />
          <DashTopBox icon={<GiArmoredPants/>} label="Total Trousers" data={prodTrousers} />
          <DashTopBox icon={<RiShirtFill />} label="Total Shirts" data={prodShirts} />       
        </div>
      </div>
  

        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
         <ProductionPieChart/>
        </div>
      </div>
  );
};

export default ProductionDashBoard;
