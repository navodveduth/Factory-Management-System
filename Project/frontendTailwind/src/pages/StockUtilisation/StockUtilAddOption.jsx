import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';
import { FiUser } from 'react-icons/fi';
import { DashTopBox, DashTopButton, } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';

import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';
import StockAvailableList from '../../components/StockAvailableList';


function StockAddExisting() {

    //useNavigate is a hook that is used to navigate to another page
    const navigate = useNavigate();
    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

    const [stock, setStock] = useState([]);

    const getStock = async () => {  //getStock is the function to get the data from the backend
        axios.get("http://localhost:8070/stock")
            .then((res) => {
                setStock(res.data); //setStock is used to update the state variable
                console.log(res.data);
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    useEffect(() => { //useEffect is used to call the function getStock
        getStock();
        const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
            setCurrentColor(currentThemeColor);
            setCurrentMode(currentThemeMode);
        }
    }, [])

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

                                <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
                                    <Header category="Form" title=" Add New Stock" />
                                    <Header title="Choose an option" />
                                    <div className=" flex items-center justify-center ">

                                        <div className="block w-1000 overflow-x-auto rounded-lg">
                                            <table className="w-full rounded-lg">
                                                <tbody>
                                                < tr className="text-sm h-10 border dark:border-slate-900" >
                                                        <TableData value="Add new entry for new stock" />
                                                        <td>
                                                            <Link to={`/StockAdd/`}>
                                                                <button
                                                                    type="button"
                                                                    className="font-bold bg-neutral-400 py-1 px-4 rounded-full mx-3 text-white"
                                                                    //style={{ background: currentColor }}
                                                                >
                                                                    <i class="fa fa-plus-circle"></i>
                                                                </button>
                                                            </Link>
                                                        </td>
                                                    </tr>

                                                    {stock.map((stock) => {//map is used to iterate the array
                                                        
                                                        return (
                                                            < tr className="text-sm h-10 border dark:border-slate-900" >
                                                                <TableData value ={<span>{stock.stockCode}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{stock.stockName}</span>} />
                                                                <td>
                                                                    <Link to={`/StockAddExisting/${stock._id}`}>
                                                                        <button
                                                                            type="button"
                                                                            className="font-bold bg-neutral-400 py-1 px-4 rounded-full mx-3 text-white"
                                                                            //style={{ background: currentColor }}
                                                                        >
                                                                            <i class="fa fa-circle-plus" />
                                                                        </button>
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>

                                </div >

                            </div>
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockAddExisting;