import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Header } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';
import Swal from 'sweetalert2';
import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';



function PurchaseOrderDateRange() {

    const location = useLocation();

    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();
    const [purchaseOrder, setPurchaseOrder] = useState([]);
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

console.log(location.state.DS + " " + location.state.DE);
    const getPurchaseOrder = async () => {
        axios.get('http://localhost:8070/purchaseOrder/date/'+location.state.DS+'/'+location.state.DE)
            .then((res) => {
                setPurchaseOrder(res.data);
            })
            .catch((err) => {
                alert(err.message);
            })
    }
    const toDateRange=()=>{
        navigate('/PurchaseOrderView');
      }

    const id = useParams();

    const deletePurchaseOrder = async (id) => {
        await axios.delete(`http://localhost:8070/purchaseOrder/delete/${id}`)
            .then((res) => {
                alert("Data deleted successfully");
                getPurchaseOrder();
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    useEffect(() => {
        getPurchaseOrder();
        const currentThemeColor = localStorage.getItem('colorMode');
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
            setCurrentColor(currentThemeColor);
            setCurrentMode(currentThemeMode);
        }
    }, []);

    const generateReport = () => {
        navigate('/PurchaseOrderPreviewDateRange', {state: {DS: location.state.DS, DE: location.state.DE}});
      }    

    
    const confirmFunc = (id) => {

        Swal.fire({
          title: 'Confirm Delete?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          color: '#f8f9fa',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          //background: '#393E46',
          confirmButtonText: 'Yes, Delete it!'})
          .then((result) => {
            if (result.isConfirmed) {
                deletePurchaseOrder(id);
                Swal.fire({
                    icon: 'success',
                    title: 'Data Successfully Deleted!',
                    color: '#f8f9fa',
                    background: '#6c757d',
                    showConfirmButton: false,
                    timer: 2000
                }   
                )
            } else {
                navigate('/PurchaseOrderView');
            }
        })
      }

    var purchasesTotal = 0;

    for(var i = 0; i < purchaseOrder.length; i++){
        purchasesTotal += purchaseOrder[i].cost;
      }

      console.log(purchasesTotal);

      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'LKR',
        minimumFractionDigits: 2,
        currencyDisplay: 'symbol'
      })

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
			<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
				<Header category="Table" title="Purchase Order Details" />
	  
			  <div className=" flex items-center mb-5 ">
				<div>
				  <input type="text" className=" block w-400 rounded-md bg-gray-100 focus:bg-white dark:text-black" placeholder="Search Here" 
				  onChange={(e) => {
					setSearchTerm(e.target.value);
				  }} />
				</div>

                <div className="mx-3">
                                <Link to={"/MachineryViewAll"}> {/* change this link your previous page */}
                                  <button type="button"  className="py-1 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" >Reset Date</button>
                                </Link>
                              </div>

				<div className="mr-0 ml-auto">
				  <Link to={"/PurchaseOrderPreviewDateRange"}> 
					<button type="button"  className="py-1 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" onClick= {()=>generateReport()} >Generate Report</button>
				  </Link>
				</div>
	  
				</div>

                <div className="block w-full overflow-x-auto rounded-lg" id="tableContainer">
							<table className="w-full rounded-lg">
								<thead>
                                <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                                    <TableHeader value="Order ID" />
                                    <TableHeader value="Supplier ID" />
                                    <TableHeader value="Quantity" />
                                    <TableHeader value="Product Details" />
                                    <TableHeader value="Delivery Date" />
                                    <TableHeader value="Total Price" />
                                    <TableHeader value="Order Status" />
                                    <TableHeader value="Manage" />
									</tr>
								</thead>
								<tbody>

                                {purchaseOrder.filter((data) => {
                                    if (searchTerm == "") {
                                        return data
                                    } else if ((data.orderID.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
                                        (data.productDetails.toString().toLowerCase().includes(searchTerm.toLowerCase()))) {
                                        return data;
                                    }
                                }).map((data, key) => {

                                    let formattedAmount = formatter.format(data.cost)

                                    return (
                                        <tr className="text-sm h-10 border dark:border-slate-600" key={key}>
                                            <TableData value={data.orderID} />
                                            <TableData value={data.supplierID} />
                                            <TableData value={data.qty} />
                                            <TableData value={data.productDetails} />
                                            <TableData value={new Date(data.deliveryDate).toISOString().split('T')[0]} />
                                            <TableData value={formattedAmount} />
                                            <TableData value={data.orderStatus} />

											<td className="text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">
												
												<Link to={`/PurchaseOrderUpdate/${data._id}`}> 
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

export default PurchaseOrderDateRange;    



				
 



