import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { DashTopBox, DashTopButton } from '../../components';

import { useStateContext } from '../../contexts/ContextProvider';
import TransportPieChart from '../../components/TransportPieChart';

const TransportDashboard = () => {
  const { currentColor, currentMode } = useStateContext();

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
  const pendingTr = transport.filter(
    (data) => data.status === 'Pending'
  ).length;
  const completeTr = transport.filter(
    (data) => data.status === 'Completed'
  ).length;

  return (
    <div className="mt-5">
      <div className="flex flex-wrap lg:flex-nowrap justify-left ml-10 mt-5">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* top buttons in the dashboard */}{' '}
          {/* use for navigation buttons */}
          <Link to="/TransportViewAll">
            <DashTopButton value="View All Transport Details" />
          </Link>
          <Link to="/TransportCreate">
            <DashTopButton value="Create New Record" />
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* small top boxes in the dashboard */}
          {/* use minimum 3, maximum 5 */}
          <DashTopBox
            icon={<i className="fa-solid fa-truck " />}
            label="Total Transports"
            data={totTransport}
          />
          <DashTopBox
            icon={<i className="fa-solid fa-hourglass px-2" />}
            label="Pending Transports"
            data={pendingTr}
          />
          <DashTopBox
            icon={<i className="fa-solid fa-circle-check p-1" />}
            label="Completed Transports"
            data={completeTr}
          />
        </div>
      </div>

      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
        <TransportPieChart />
      </div>
    </div>
  );
};

export default TransportDashboard;
