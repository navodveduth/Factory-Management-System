import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jsPDF} from "jspdf";
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';
// import { Link } from "react-router-dom"

function SalesInvoice() {

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
        axios.get(`http://localhost:8070/sales/${id}`)
        .then(res => {

          setInvoice(res.data.invoiceNo);
          setOrderDate(res.data.orderDate);
          setCustomerName(res.data.customerName);
          setCustomerContactNo(res.data.customerContactNo);
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
  
    return (
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

          <p className="text-2xl mt-10 text-center underline">INVOICE</p>
          
  
          <div className="mt-8 text-right">
              <p>Invoice No: {invoiceNo}</p>
              <p>Invoice Date: {orderDate}</p>
              <p>Due Date: {currentdate}</p> 
          </div>
  
          <div className="mt-5 text-left">
              <p className="text-xl mb-3">Billed to:</p>
              <p>Name: {}</p>
              <p>PhoneNo: {}</p>
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
    )
  }
  
  export default SalesInvoice