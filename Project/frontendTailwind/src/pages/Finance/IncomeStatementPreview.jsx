import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../../components';
import { jsPDF } from "jspdf";
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';
import { useStateContext } from '../../contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import logo from '../../data/logo.png';
import Swal from "sweetalert2";

const IncomeStatementPreview = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

  const [transactions, setTransactions] = useState([]);
   const [DS, setDateStart] = useState("");
  const [DE, setDateEnd] = useState("");
  const [sales, setSales] = useState([]);
  const [purchaseOrder, setPurchaseOrder] = useState([]);
  const [transport, setTransport] = useState([]);
  const [salary, setSalary] = useState([]);
  const [maintainance, setMaintainence] = useState([]);
  const [mach_maintainance, setMaintainenceMachine] = useState([]);
  const [vehi_maintainance, setMaintainenceVehi] = useState([]);
  const [machinery, setMachinery] = useState([]);
  const [Order,setOrder] = useState([]);
  const navigate = useNavigate();

  function subtractYears(date, years) {
    date.setFullYear(date.getFullYear() - years);
    return date;
  }

  const downloadConf = ()=>{
    Swal.fire({
      title: 'Downloading!',
      text: "Your download has begun!",
      icon: 'success',
      showCancelButton: false,
      color: '#f8f9fa',
      background: '#6c757d',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK!'
    })
  };

  var curDate = new Date();   
  var curDate_minus1 = new Date(curDate);
  curDate_minus1 = subtractYears(curDate_minus1, 1);
  var dateStart = curDate.toLocaleDateString()
  var dateEnd = curDate_minus1.toLocaleDateString()
  var DS1 = curDate.toISOString().split('T')[0];
  var DE1 = curDate_minus1.toISOString().split('T')[0];


  
  let dateRangeRef = (dateRange) => {
    dateRangeRef = dateRange; // dateRangeRef is a reference to the DateRangePickerComponent
  };

  const filterDate = () => {
    if (dateRangeRef.value && dateRangeRef.value.length > 0) {

        const start = (dateRangeRef.value[0]);
        const end = (dateRangeRef.value[1]);

        setDateStart(start);
        setDateEnd(end);
        navigate('/IncomeStatementDateRange',{state:{DS:start,DE:end}});

    } else {
      alert("Please select a date range")
      setDateStart('');
      setDateEnd('');
    }

};

  //finance get function
  const getFinanceDate = async () => {
    axios
    .get('http://localhost:8070/finance/date/'+curDate_minus1+'/'+curDate)
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
      .get('http://localhost:8070/sales/date/'+curDate_minus1+'/'+curDate)
      .then((res) => {
        setSales(res.data);
      })
      .catch((err) => {
        alert(err.message);
      })
  }
  //purchaseOrder get function

  const getPurchaseOrder = async () => {
    axios.get('http://localhost:8070/purchaseOrder/date/'+curDate_minus1+'/'+curDate)
        .then((res) => {
            setPurchaseOrder(res.data);
        })
        .catch((err) => {
            alert(err.message);
        })
}

  //salary get function

  const getSalary = async () => {
    axios
      .get('http://localhost:8070/salary/SalaryView')
      .then((res) => {
        setSalary(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  //machinery maintainance get function

  const getMMaintainence = async () => {  //getMaintainence is the function to get the data from the backend
    axios.get("http://localhost:8070/maintainenceMachine/date/"+curDate_minus1+'/'+curDate)
      .then((res) => {
        setMaintainenceMachine(res.data); //setMaintainence  is used to update the state variable

      })
      .catch((err) => {
        alert(err.message);
      })
  }

  //noraml maintinance get function

  const getMaintainence = async () => {  //getMaintainence is the function to get the data from the backend
    axios.get("http://localhost:8070/maintainence/date/"+curDate_minus1+'/'+curDate)
      .then((res) => {
        setMaintainence(res.data); //setMaintainence  is used to update the state variable

      })
      .catch((err) => {
        alert(err.message);
      })
    }

  //vehicle maintainance get function

  const getVMaintainence = async () => {  //getMaintainence is the function to get the data from the backend
    axios.get("http://localhost:8070/maintainenceVehicle/date/"+curDate_minus1+'/'+curDate)
      .then((res) => {
        setMaintainenceVehi(res.data); //setMaintainence  is used to update the state variable

      })
      .catch((err) => {
        alert(err.message);
      })
  }

  //machinery get function

  const getMachinery = async () => {  //getMachinery is the function to get the data from the backend
    axios.get("http://localhost:8070/machinery/date/"+curDate_minus1+'/'+curDate)
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
        "http://localhost:8070/transport/date/"+curDate_minus1+'/'+curDate)
      .then((res) => {
        setTransport(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  //production cost function

  const getProduction = async () => {
    axios
      .get('http://localhost:8070/production/order/date/'+curDate_minus1+'/'+curDate)
      .then((res) => {
        setOrder(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };



  
  useEffect(() => {
    getFinanceDate();
    getProduction();
    getSale();
    getSalary();
    getPurchaseOrder();
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

  const createPDF = () => {
    const date = new Date(Date.now()).toISOString().split('T')[0];
    const pdf = new jsPDF("landscape", "px", "a1", false);
    const data = document.querySelector("#tableContainer");
    pdf.html(data).then(() => {
        pdf.save("IncomeStatement-(" + DS1 + ").pdf");
    });
};

  var saleTotal , revenueTotal, expenseTotal , MMaintTotal , VehiMaintTotal , maintTotal , transportTotal, machineryTotal, salaryTotal, productionTotal, purchasesTotal;
  saleTotal = expenseTotal = revenueTotal = expenseTotal  = MMaintTotal = VehiMaintTotal = maintTotal = transportTotal = machineryTotal = salaryTotal = productionTotal = machineryTotal =purchasesTotal = 0;

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
  for(var i = 0; i < salary.length; i++){
    salaryTotal += (salary[i].employeeIncentive + salary[i].employeeAllowance + salary[i].employeeBasicSalary);
  }
  for(var i = 0; i < Order.length; i++){
    if(Order[i].status == "Costed"){
      productionTotal += Order[i].totalCost;
    }
  }

  for (var i = 0; i < purchaseOrder.length; i++) {
    purchasesTotal += purchaseOrder[i].cost;
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 2,
    currencyDisplay: 'symbol'
  })

  var totalCost = productionTotal+transportTotal+machineryTotal+salaryTotal+maintTotal+MMaintTotal+VehiMaintTotal+purchasesTotal;
  var totalRevenue = revenueTotal+saleTotal
  var grossProfit = formatter.format(saleTotal-productionTotal-purchasesTotal);
  var nettProfit = totalRevenue - totalCost;

  if(nettProfit < 0){
    nettProfit = nettProfit * (-1); 
    nettProfit = "("+formatter.format(nettProfit)+")";
  }else{
    nettProfit = formatter.format(totalRevenue-totalCost);
  }


  saleTotal = formatter.format(saleTotal);
  revenueTotal = formatter.format(revenueTotal);
  expenseTotal = formatter.format(expenseTotal);
  transportTotal = formatter.format(transportTotal);
  machineryTotal = formatter.format(machineryTotal);
  salaryTotal = formatter.format(salaryTotal);
  productionTotal = formatter.format(productionTotal);
  purchasesTotal = formatter.format(purchasesTotal);
  var maintainanceTotal = formatter.format(maintTotal+MMaintTotal+VehiMaintTotal);
  
  


  
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
                          <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">

                            <div className=" flex items-center mb-5 ">
                                <div className="mr-0 ml-auto">
                                    <button onClick={()=>{createPDF(); downloadConf();}} type="button" className="py-1 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" >Download</button>
                                </div>
                            </div>

                            <div className="block w-full overflow-x-auto rounded-lg">
                              <div id="tableContainer">
                                <div className="block w-full overflow-x-auto rounded-lg" >
                                    <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
                                    <img className="h-200 w-400 mb-5" src={logo} alt="logo" />
                                    </div>
                                    <div className="text-center mb-10">
                                
                                    <p className="text-xl mt-2">Lanka MountCastle (Pvt) Ltd,</p>
                                    <p className="text-xl">No.124, Hendala, Wattala</p>
                                    <p>011 2942 672</p>
                                    </div>
                                    <p className="text-right text-xl mt-2 mb-3">Generated On : {DS1}</p>
                            <Header title={`Income Statement from `+dateEnd+` to ` + dateStart} />

                                        
                              <table className="w-full rounded-lg">
                                <thead>
                                  <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800 dark:text-white">
                                    <td className="px-4 py-3 text-md whitespace-nowrap font-semibold text-left text-black-300">Description</td>
                                    <td className="px-4 py-3 text-md whitespace-nowrap font-semibold text-right text-black-300">Amount</td>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="text-sm h-10 border dark:border-slate-600 dark:text-white">
                                    <td className="text-left px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">Sales Income</td>
                                    <td className=" text-right px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">{(saleTotal)}</td>
                                  </tr>
                                  <tr className="text-sm h-10 border dark:border-slate-600 dark:text-white">
                                    <td className="text-left px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">Purchase Expense</td>
                                    <td className=" text-right px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">{"("+(purchasesTotal)+")"}</td>
                                  </tr>
                                  <tr className="text-sm h-10 border dark:border-slate-600 dark:text-white">
                                    <td className="text-left px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">Production Expense</td>
                                    <td className=" text-right px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">{"("+(productionTotal)+")"}</td>
                                  </tr>
                                  <tr className="text-sm h-10 border dark:border-slate-600 dark:text-white">
                                    <td className="text-left px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">Other Income</td> 
                                    <td className=" text-right px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">{(revenueTotal)}</td>
                                  </tr>
                                  <tr className=" h-10 border dark:border-slate-600 dark:text-white text-xl" >
                                    <td className="text-left px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">Gross Profit</td>
                                    <td className=" text-right px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">{(grossProfit)}</td>
                                  </tr>
                                  <br></br>
                                  <tr className="text-sm h-10 border dark:border-slate-600 dark:text-white">
                                    <td className="text-left px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">Transport Expenses</td>
                                    <td className=" text-right px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">{"("+(transportTotal)+")"}</td>
                                  </tr>
                                  <tr className="text-sm h-10 border dark:border-slate-600 dark:text-white">
                                    <td className="text-left px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">Maintance Expenses</td>
                                    <td className=" text-right px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3"> {"("+(maintainanceTotal)+")"}</td>
                                  </tr>
                                  <tr className="text-sm h-10 border dark:border-slate-600 dark:text-white">
                                    <td className="text-left px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">Salary Expenses</td>
                                    <td className=" text-right px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">{"("+(salaryTotal)+")"}</td>
                                  </tr>
                                  <tr className="text-sm h-10 border dark:border-slate-600 dark:text-white">
                                    <td className="text-left px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">Other Expenses</td>
                                    <td className=" text-right px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">{"("+(expenseTotal)+")"}</td>
                                  </tr>
                                  <br></br>
                                  <tr className="text-xl h-10 border dark:border-slate-600 dark:text-white">
                                    <td className="text-left px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">Net Profit or Loss</td>
                                    <td className=" text-right px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">{(nettProfit)}</td>
                                  </tr>
                                </tbody>
                              </table>
                              </div>
                              </div>
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
                                
  );
};

export default IncomeStatementPreview;
