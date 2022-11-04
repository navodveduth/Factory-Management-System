import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jsPDF} from "jspdf";
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';
import { useStateContext } from '../../contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
//import { Link } from "react-router-dom"

function SalesInvoice() {
    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

    const navigate = useNavigate();
  
      const [invoiceNo, setInvoice] =useState('');
      const [orderDate, setOrderDate] =useState('');
      const [customerName, setCustomerName] =useState('');
      const [customerContactNo, setCustomerContactNo] =useState('');
      const [customerID, setCustomerID] =useState('');
      const [itemName, setItemName] =useState('');
      const [quantity, setQuantity] =useState('');
      const [totalAmount, setTotalAmount] =useState('');
  
      const current = new Date();
      const currentdate = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
  
      const {id} = useParams();    //get the id from the url
  
      useEffect(() => { 
        const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
          setCurrentColor(currentThemeColor);
          setCurrentMode(currentThemeMode);
        }
        axios.get(`http://localhost:8070/sales/${id}`)
        .then(res => {

          setInvoice(res.data.invoiceNo);
          setOrderDate(res.data.orderDate);
          setCustomerID(res.data.customerID);
          setItemName(res.data.itemName);
          setQuantity(res.data.quantity);
          setTotalAmount(res.data.totalAmount);
        })
        .catch(err => {
          alert(err.message);
        });
      }, [id]);

      const createPDF = () => {
        const pdf = new jsPDF("portrait", "px", "b1", false)
        const data = document.querySelector("#invoiceView");
        pdf.html(data).then(() => {
          pdf.save(invoiceNo +".pdf");
        });
      }

      var d = new Date(orderDate);

      var date = d.getDate();
      var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
      var year = d.getFullYear();
      var formateDate = year + "-" + month + "-" + date;

  
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
                        <div>
        <p className="text-center text-4xl  dark:text-white">Invoice Preview    <button className="text-4xl right-4" onClick={createPDF} type="button" >
          <i className="fa-solid fa-download"></i></button>
        </p>
        
      <div className="bg-contain w-full">
            
        <div id="invoiceView" className="border border-black mx-52 w-3/4 mt-8 px-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
  
        

          <div className="text-center">
            <p className="pt-7 text-3xl">Lanka MountCastle (Pvt) Ltd</p>
            <p className="text-xl mt-2">Lanka MountCastle (Pvt) Ltd,</p>
            <p className="text-xl">No.124, Hendala, Wattala</p>
            <p>011 2942 672</p>
          </div>

          <p className="text-3xl mt-10 text-center underline">INVOICE</p>
          
  
          <div className="mt-8 text-right">
              <p>Invoice No: {invoiceNo}</p>
              <p>Invoice Date: {formateDate}</p>
              <p>Due Date: {currentdate}</p> 
          </div>
 
          <div className="mt-5 text-left">
              <p className="text-xl mb-3">Billed to:</p>
              <p>Name: {}</p>
              <p>PhoneNo: {}</p>
              <p>Customer ID: {customerID}</p>
         </div>
  
          <div>
          <table className="w-3/4 rounded-lg mx-36 mt-10">
            <thead>
              <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                <TableHeader value="Invoice No." />
                <TableHeader value="Item Name" />
                <TableHeader value="Quantity" />
                <TableHeader value="Total Amount" />
              </tr>
            </thead>
            <tbody>
                <tr className="text-sm h-10 border dark:border-slate-600">
                  <TableData value={invoiceNo} />
                  <TableData value={itemName} />
                  <TableData value={quantity} />
                  <TableData value={"Rs." + totalAmount} />
                </tr>
            </tbody>
            </table>
  
          <div className="mt-16 pt-10 text-center"> <p className="mt-10">Thank You!</p>
          <hr className="mt-8"/></div>
          </div>
          <br></br>
        </div>
      </div>
      </div>
                            
                        </div>
                        <Footer />
                    </div>  
                </div>
            </div>
        </div>
    </div>
    )
  }
  
  export default SalesInvoice