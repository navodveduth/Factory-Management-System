import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiUsers} from 'react-icons/fi';
import { TbBuilding } from "react-icons/tb";
import { DashTopBox, DashTopButton } from '../components';

import { useStateContext } from '../contexts/ContextProvider';


const SupplierDashboard = () => {
  const { currentColor, currentMode } = useStateContext();

  const [supplier, setSupplier] = useState([]);

  const getSupplier = async () => {
    axios
      .get('http://localhost:8070/supplier/')
      .then((res) => {
        setSupplier(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getSupplier();
  }, []);

  const supCount = supplier.length;


  return (
    <div className="mt-5">

      <div className="flex flex-wrap lg:flex-nowrap justify-left ml-10 mt-5">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* top buttons in the dashboard */} {/* use for navigation buttons*/}
          <Link to="/SupplierViewAll">
            <DashTopButton value="View All suppliers" />
          </Link>
          <Link to="/SupplierCreate">
            <DashTopButton value="Create New suppliers" />
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* small top boxes in the dashboard */} {/* use minimum 3, maximum 5 */}
          <DashTopBox icon={<FiUsers />} label="Total Suppliers" data={supCount} />  
          <DashTopBox icon={<TbBuilding />} label="Total Companies" data={supCount} /> 

        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;
