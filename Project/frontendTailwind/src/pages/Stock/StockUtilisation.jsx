import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';
import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { DashTopBox, DashTopButton,  } from '../../components';


function StockUtilisation() {
    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();
    const navigate = useNavigate();

    const [stockUtil, setStockUtilisation] = useState([]); //stock is the state variable and setStock is the function to update the state variable
    const [searchTerm, setSearchTerm] = useState("");

    const getStockUtil = async () => {  //getStock is the function to get the data from the backend
        axios.get("http://localhost:8070/stockUtilisation")
            .then((res) => {
                setStockUtilisation(res.data); //setStock is used to update the state variable
                console.log(res.data);
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    const id = useParams();

    const deleteStockUtil = async (id) => {
        await axios.delete('http://localhost:8070/stockUtilisation/delete/' + id)
            .then(() => {
                alert("Data deleted successfully");
                getStockUtil();
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    useEffect(() => { //useEffect is used to call the function getStock
        getStockUtil();
        const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
    }, [])

    const confirmFunc = (id)=>{

		if (confirm("Do you want to delete?") == true) {
            deleteStockUtil(id);
		} else {
			navigate('/StockUtilisation');
		}

    }


    return (

        <div>

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
                            
                        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
                <Header category="Table" title="Stocks Utilisation" />

                <div className=" flex items-center mb-5 ">
          <div>
            <input type="text" className=" block w-400 rounded-md bg-gray-100 focus:bg-white dark:text-black" placeholder="Search Here" 
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }} />
          </div>
          <div className="mr-0 ml-auto">
            <Link to={"/generateSUPDF"}> {/* change this link your preview page */}
              <button type="button"  className="py-1 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" >Generate Report</button>
            </Link>
          </div>

          </div>

                <div className="block w-full overflow-x-auto rounded-lg">
                    <table className="w-full rounded-lg">
                        <thead>
                            <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                                <TableHeader value="Code" />
                                <TableHeader value="Bundle Name" />
                                <TableHeader value="Category" />
                                <TableHeader value="Date" />
                                <TableHeader value="Type" />
                                <TableHeader value="unitPrice" />
                                <TableHeader value="Units" />
                                <TableHeader value="Total value" />
                                <TableHeader value="Supplier" />
                                <TableHeader value="Manage" />
                            </tr>
                        </thead>
                        <tbody>
                            {stockUtil.filter((data) => {
                                if(searchTerm == ""){
                                    return data;
                                }else if((data.stockCode.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                  (data.type.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                  (data.supplier.toLowerCase().includes(searchTerm.toLowerCase())))
                                  
                                  {
                                  return data;
                                  }
                              }).map((data, key) => {//map is used to iterate the array
                                const dbDate = new Date(data.date).toISOString().split('T')[0];

                                var datacolor = "text-black";
                                if (data.type === "Additions") {
                                    datacolor = "text-green-500 font-bold";
                                } else {
                                    datacolor = "text-red-600 font-bold";
                                }

                                return (
                                    <tr className="text-sm h-10 border dark:border-slate-600">
                                        <TableData value={data.stockCode} />
                                        <TableData value={data.stockName} />
                                        <TableData value={data.stockCategory} />
                                        <TableData value={dbDate} />
                                        <td className={`${datacolor} text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3`}>{data.type}</td>
                                        <TableData value={"Rs." + data.unitPrice} />
                                        <TableData value={data.quantity} />
                                        <TableData value={"Rs." + data.totalValue} />
                                        <TableData value={data.supplier} />
                                    

                                        <td className="text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">
                                            <Link to={`/StockUtilUpdate/${data._id}`}>
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
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
                            
                        </div>
                        <Footer />
                    </div>  
                </div>
            </div>
        </div>
    </div>
  );
};

export default StockUtilisation