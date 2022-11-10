import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Header } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';
import { FiUser } from 'react-icons/fi';
import { DashTopBox, DashTopButton,  } from '../../components';

import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

const IncomeStatement = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

  const [transactions, setTransactions] = useState([]);
  const [DS, setDateStart] = useState("");
  const [DE, setDateEnd] = useState("");
  const [sales, setSales] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [transport, setTransport] = useState([]);
  const [salary, setSalary] = useState([]);
  const [prodCost, setProdCost] = useState([]);
  const [maintainance, setMaintainence] = useState([]);
  const [mach_maintainance, setMaintainenceMachine] = useState([]);
  const [vehi_maintainance, setMaintainenceVehi] = useState([]);
  const [machinery, setMachinery] = useState([]);

  
  const navigate = useNavigate();
  
  const toDateRange=()=>{
    navigate('/IncomeStatementDateRange',{state:{DS:DS,DE:DE}});
  }

  const location = useLocation();

  //finance get function
  const getFinanceDate = async () => {
    axios
    .get('http://localhost:8070/finance/date/'+location.state.DS+'/'+location.state.DE)
    .then((res) => {
      setTransactions(res.data);
    })
    .catch((err) => {
      alert(err.message);
    });
  };
  //sales get function
  const getSale = async () => {
    axios
      .get('http://localhost:8070/sales/date/'+location.state.DS+'/'+location.state.DE)
      .then((res) => {
        setSales(res.data);
      })
      .catch((err) => {
        alert(err.message);
      })
  }
  //purchases get function

  //machinery maintainance get function

  const getMMaintainence = async () => {  //getMaintainence is the function to get the data from the backend
    axios.get("http://localhost:8070/maintainenceMachine/date/"+location.state.DS+'/'+location.state.DE)
      .then((res) => {
        setMaintainenceMachine(res.data); //setMaintainence  is used to update the state variable

      })
      .catch((err) => {
        alert(err.message);
      })
  }

  //noraml maintinance get function

  const getMaintainence = async () => {  //getMaintainence is the function to get the data from the backend
    axios.get("http://localhost:8070/maintainence/date/"+location.state.DS+'/'+location.state.DE)
      .then((res) => {
        setMaintainence(res.data); //setMaintainence  is used to update the state variable

      })
      .catch((err) => {
        alert(err.message);
      })
  }

  //vehicle maintainance get function

  const getVMaintainence = async () => {  //getMaintainence is the function to get the data from the backend
    axios.get("http://localhost:8070/maintainenceVehicle/date/"+location.state.DS+'/'+location.state.DE)
      .then((res) => {
        setMaintainenceVehi(res.data); //setMaintainence  is used to update the state variable

      })
      .catch((err) => {
        alert(err.message);
      })
  }

  //machinery get function

  const getMachinery = async () => {  //getMachinery is the function to get the data from the backend
    axios.get("http://localhost:8070/machinery/date/"+location.state.DS+'/'+location.state.DE)
      .then((res) => {
        setMachinery(res.data); //setMachinery is used to update the state variable


      })
      .catch((err) => {
        alert(err.message);
      })
  }

  //transport get function

  const getTransport = async () => {
    axios
      .get(
        "http://localhost:8070/transport/date/"+location.state.DS+'/'+location.state.DE)
      .then((res) => {
        setTransport(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };



  
  useEffect(() => {
    getFinanceDate();
    getSale();
    getMMaintainence();
    getVMaintainence();
    getMaintainence();
    getMachinery();
    getTransport();
    const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  var saleTotal , revenueTotal, expenseTotal , MMaintTotal , VehiMaintTotal , maintTotal , transportTotal, machineryTotal;
  saleTotal = expenseTotal = revenueTotal = expenseTotal  = MMaintTotal = VehiMaintTotal = maintTotal = transportTotal = machineryTotal = 0;

  for (var i = 0; i < sales.length; i++) {
    saleTotal += sales[i].totalAmount;
  }

  for(var i = 0; i < transactions.length; i++){
    if(transactions[i].trnType == "Revenue"){
      revenueTotal += transactions[i].trnAmount;
    }else{
      expenseTotal += transactions[i].trnAmount;
    }
  }
  for(var i = 0; i < transport.length; i++){
    transportTotal += transport[i].transportCost;
  }
  for(var i = 0; i < mach_maintainance.length; i++){
    MMaintTotal += mach_maintainance[i].others;
  }
  for(var i = 0; i < vehi_maintainance.length; i++){
    VehiMaintTotal += vehi_maintainance[i].others;
  }
  for(var i = 0; i < maintainance.length; i++){
    maintTotal += maintainance[i].others;
  }
  for(var i = 0; i < machinery.length; i++){
    machineryTotal += machinery[i].machineryCost;
  }

 const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 2,
      currencyDisplay: 'symbol'
    })

  var curDate = new Date();
  var dateStart = curDate.toLocaleDateString()

  var dateEnd = new Date(curDate);
  dateEnd.setFullYear(dateEnd.getFullYear() - 1);
  dateEnd = dateEnd.toLocaleDateString();


  
  return (

    <div>

      {/* DON'T CHANGE ANYTHING HERE */}

        <div className={currentMode === 'Dark' ? 'dark' : ''}>

            <div className="flex relative dark:bg-main-dark-bg">

                <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}> {/* THEME SETTINGS BUTTON */}
                    <TooltipComponent content="Settings" position="Top">
                    <button
                        type="button"
                        onClick={() => setThemeSettings(true)}
                        style={{ background: currentColor, borderRadius: '50%' }}
                        className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                    >
                        <FiSettings />
                    </button>
                    </TooltipComponent>
                </div>


                {activeMenu ? ( // SIDEBAR IMPLEMENTATION
                    <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                    <Sidebar />
                    </div>
                ) : (
                    <div className="w-0 dark:bg-secondary-dark-bg">
                    <Sidebar />
                    </div>
                )}

                <div
                    className={ // MAIN BACKGROUND IMPLEMENTATION
                    activeMenu
                        ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                        : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                    }
                >
                    
                    {/* NAVBAR IMPLEMENTATION */}
                    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                        <Navbar />
                    </div>

                    <div>
                        {themeSettings && <ThemeSettings />}
                        <div>
                          {/* start */}
                          <div>
                          <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">

                            <Header category="Table" title={`Income Statement from `+location.state.DS+` to ` + location.state.DE}/>
                            <div>
                              <input type="date" className=" block w-100 rounded-md bg-gray-100 focus:bg-white dark:text-black mx-3" placeholder="Start Date" 
                                onChange={(e) => {
                                  setDateStart(e.target.value);
                                }} />
                              </div>

                              <div>
                              <input type="date" className=" block w-100 rounded-md bg-gray-100 focus:bg-white dark:text-black mr-3" placeholder="End Date" 
                                onChange={(e) => {
                                  setDateEnd(e.target.value);
                                }} />
                              </div>
                              <div className=" mx-1">
                                  <button type="button" className=" rounded-lg text-white hover:bg-slate-700 bg-slate-500" onClick={()=>{toDateRange()}}  >filter</button>
                              </div>

                              <div className="mr-0 ml-auto">
                                <Link to={"/financePreview"}> {/* change this link your preview page */}
                                  <button type="button"  className="py-1 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" >Generate Report</button>
                                </Link>
                              </div>

                            <div className="block w-full overflow-x-auto rounded-lg">
                              <table className="w-full rounded-lg">
                                <thead>
                                  <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800 dark:text-white">
                                    <TableHeader value="Description" />
                                    <TableHeader value="Amount" />
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="text-sm h-10 border dark:border-slate-600 dark:text-white">
                                    <td>Sales Income</td>
                                    <td>{formatter.format(saleTotal)}</td>
                                  </tr>
                                  <tr className="text-sm h-10 border dark:border-slate-600 dark:text-white">
                                    <td>Purchase Expense</td>
                                    <td>{}</td>
                                  </tr>
                                  <tr className="text-sm h-10 border dark:border-slate-600 dark:text-white">
                                    <td>Other Income</td>
                                    <td>{formatter.format(revenueTotal)}</td>
                                  </tr>
                                  <tr className="text-sm h-10 border dark:border-slate-600 dark:text-white">
                                    <td>Gross Profit</td>
                                    <td>{formatter.format(saleTotal+revenueTotal)}</td>
                                  </tr>
                                  <br></br>
                                  <tr className="text-sm h-10 border dark:border-slate-600 dark:text-white">
                                    <td>Transport Expenses</td>
                                    <td>{formatter.format(transportTotal)}</td>
                                  </tr>
                                  <tr className="text-sm h-10 border dark:border-slate-600 dark:text-white">
                                    <td>Maintance Expenses</td>
                                    <td>{formatter.format(MMaintTotal+VehiMaintTotal+maintTotal)}</td>
                                  </tr>
                                  {/* {transactions.filter((data) => {
                                        if(searchTerm == ""){
                                            return data;
                                        }else if(data.trnID.toString().toLowerCase().includes(searchTerm.toLowerCase())){
                                            return data;
                                        }
                                    }).map((data, key) => {
                                      let total = formatter.format(data.trnAmount);
                                    return(
                                    <tr className="text-sm h-10 border dark:border-slate-600" key={key}>
                                      <TableData value={data.trnID} />
                                      <TableData value={data.trnDesc} />
                                      <TableData value={total} />
                                      <TableData value={data.trnType} />
                                      <TableData value={new Date(data.trnRecordedDate).toISOString().split('T')[0]} /> 

                                      <td className="text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">
                                        <Link to={`/FinanceUpdate/${data._id}`}>
                                          <button
                                            type="button"
                                            className="font-bold py-1 px-4 rounded-full mx-3 text-white"
                                            style={{ background: currentColor }}
                                          >
                                            <i className="fas fa-edit" />
                                          </button>
                                        </Link>
                                        <button
                                          type="button"
                                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 ml-2 rounded-full"
                                          onClick={() => {
                                            confirmFunc(data._id);
                                          }}
                                        >
                                          <i className="fas fa-trash" />
                                        </button>
                                      </td>
                                    </tr>
                                    )
                                  })} */}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                          {/* end */}                            
                        </div>
                        <Footer />
                    </div>  
                </div>
            </div>
        </div>
        </div>
                                
  );
};

export default IncomeStatement;