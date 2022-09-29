import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import{RiMoneyDollarCircleFill} from 'react-icons/ri';
import { DashTopBox, DashTopButton, TransactionPieChart } from '../../components';

import { useStateContext } from '../../contexts/ContextProvider';
import { ParetoSeries } from '@syncfusion/ej2-react-charts';


const FinanceDashboard = () => {
  const { currentColor, currentMode } = useStateContext();

  const [TRN, setTransactions] = useState([]);

  const getFinance = async () => {
    axios
      .get('http://localhost:8070/finance/viewTransaction')
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getFinance();
  }, []);

  var totalRev = 0, totalExp = 0;

  return (

    <div className="mt-5">

      {TRN.filter((TRN) => TRN.trnType === 'Revenue').map((TRN) => {
        totalRev += TRN.trnAmount;
        })}
        {TRN.filter((TRN) => TRN.trnType === 'Expense').map((TRN) => {
          totalExp += TRN.trnAmount;
          })}

      <div className="flex flex-wrap lg:flex-nowrap justify-left ml-10 mt-5">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* top buttons in the dashboard */} {/* use for navigation buttons*/}
          <Link to="/FinanceViewAll">
            <DashTopButton value="View All Transactions" />
          </Link>
          <Link to="/FinanceNew">
            <DashTopButton value="Cash Transactions" />
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* small top boxes in the dashboard */} {/* use minimum 3, maximum 5 */}
          <DashTopBox icon={<RiMoneyDollarCircleFill />} label="Revenue Total" data= {"Rs."+totalRev} />
          <DashTopBox icon={<RiMoneyDollarCircleFill />} label="Expenses Total" data={"Rs."+totalExp} />
          <DashTopBox icon={<RiMoneyDollarCircleFill />} label="Total Employees" data="100" />
          <DashTopBox icon={<RiMoneyDollarCircleFill />} label="Total Employees" data="100" />       
        </div>
      </div>

      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
          <TransactionPieChart />
      </div>
    </div>

    /* <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
        ----------use this div to create your graphs.--------------
        ----------one div per graph -------------------------------
       <div>*/
  );
};

export default FinanceDashboard;