import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';
import { DashTopBox, DashTopButton, } from '../../components';
import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import logo from '../../data/logo.png';
import { jsPDF } from "jspdf";

function PurchaseOrderPreview() {

    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();
    const [purchaseOrder, setPurchaseOrder] = useState([]);

    const getPurchaseOrder = async () => {
        axios.get("http://localhost:8070/purchaseOrder/")
            .then((res) => {
                setPurchaseOrder(res.data);
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

    const createPDF = () => {
      const toDayte = new Date(Date.now()).toISOString().split('T')[0];
        const pdf = new jsPDF("landscape", "px", "a1",false);
        const data = document.querySelector("#tableContainer");
        pdf.html(data).then(() => {
            pdf.save("PurchaseOrderDetails.pdf");
           });
    };

    const current = new Date();
    const currentdate = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 2,
      currencyDisplay: 'symbol'
    })

    return (
        <div>
    
          <div className={currentMode === "Dark" ? "dark" : ""}>
            <div className="flex relative dark:bg-main-dark-bg">
              <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
                {" "}
                {/* THEME SETTINGS BUTTON */}
                <TooltipComponent content="Settings" position="Top">
                  <button
                    type="button"
                    onClick={() => setThemeSettings(true)}
                    style={{ background: currentColor, borderRadius: "50%" }}
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
                className={
                  // MAIN BACKGROUND IMPLEMENTATION
                  activeMenu
                    ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                    : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
                }
              >
                {/* NAVBAR IMPLEMENTATION */}
                <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                  <Navbar />
                </div>
    
                <div>
                  {themeSettings && <ThemeSettings />}

			<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
				<Header category="Table" title="Purchase Order Details" />

				  {/* <div className="w-full h-5"> */}
                  <button onClick={createPDF} type="button"  className="font-bold py-1 px-4 rounded-full m-3 text-white absolute top-40 right-20 hover:bg-slate-700 bg-slate-500" >Download Report</button>
				 {/* </div> */}

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

<p className="text-right text-xl mt-2 mb-3">Generated On : {currentdate}</p>
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
                                    										
									</tr>
								</thead>
								<tbody>

                                    {purchaseOrder.map((data) => {
                                      let formattedAmount = formatter.format(data.cost)
						  return(
					  <tr className="text-sm h-10 border dark:border-slate-600" >
                                            <TableData value={data.orderID} />
                                            <TableData value={data.supplierID} />
                                            <TableData value={data.qty} />
                                            <TableData value={data.productDetails} />
                                            <TableData value={new Date(data.deliveryDate).toISOString().split('T')[0]} />
                                            <TableData value={formattedAmount} />
                                            <TableData value={data.orderStatus} />

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

export default PurchaseOrderPreview;

                                    



