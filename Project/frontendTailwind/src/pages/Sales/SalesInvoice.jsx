import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';
// import { Link } from "react-router-dom"

function SalesInvoice() {

    const navigate = useNavigate();
  
      const [invoiceNo, setInvoice] =useState('');
      const [orderDate, setOrderDate] =useState('');
      const [customerName, setCustomerName] =useState('');
      const [customerContactNo, setCustomerContactNo] =useState('');
      const [totalAmount, setTotalAmount] =useState('');
      const [status, setStatus] =useState('');
  
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
          setTotalAmount(res.data.totalAmount);
          setStatus(res.data.status);
        })
        .catch(err => {
          alert(err.message);
        });
      }, [id]);
  
    return (
      <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white'>
        
        <h1>Invoice Preview</h1>
  
        <div><button onClick={''} type="button" className="font-bold py-1 px-4 rounded-full mx-3 text-white">Print</button></div>
        
        <div className="">
          <div className="text-center">
            <h2>Lanka MountCastle (Pvt) Ltd</h2>
            <h6>Lanka MountCastle (Pvt) Ltd,</h6>
            <h6>No.124, Hendala, Wattala</h6>
            <h6>011 2942 672</h6>
          </div><br></br><br></br>
            <h3 className="underline">INVOICE</h3>
          <br></br><br></br>
  
          <div>
            <sector className="text-right">
              <h6>Invoice No: {invoiceNo}</h6>
              <h6>Invoice Date: {orderDate}</h6>
              <h6>Due Date: {currentdate}</h6>
            </sector>
          </div>
  
          <div className="text-right"> <br></br><br></br>
            <sector className=''>
              <h5>Billed to:</h5>
              <h6>Name: {customerName}</h6>
              <h6>PhoneNo: {customerContactNo}</h6>
            </sector>
          </div><br></br>
  
          <div>
          <table className="w-full rounded-lg">
            <thead>
              <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                <TableHeader value="Invoice No." />
                <TableHeader value="Status" />
                <TableHeader value="Total Amount" />
              </tr>
            </thead>
            <tbody>
                <tr className="text-sm h-10 border dark:border-slate-600">
                  <TableData value={invoiceNo} />
                  <TableData value={status} />
                  <TableData value={totalAmount} />
                </tr>
            </tbody>
            </table>

          {/* <table className="">
                  <thead>
                      <tr>
                      <th scope="col">Invoice No.</th>
                      <th scope="col">Status</th>
                      <th scope="col">Total Amount</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>{invoiceNo}</td>
                          <td>{status}</td>
                          <td>Rs.{totalAmount}</td>
                      </tr>     
                  </tbody>
          </table> */}
  
          <div className='text-center'> <h6>Thank You!</h6>
          <hr/></div>
          </div>
          <br></br>
      </div>
      </div>
    )
  }
  
  export default SalesInvoice