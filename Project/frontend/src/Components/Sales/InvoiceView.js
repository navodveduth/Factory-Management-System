import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react"
import {useParams, useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom"
import '../styles/salesStyle/Invoice.css'

function InvoiceView() {

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
    <div className='screenView'>

      <h1>Invoice Preview</h1>

      <div><button onClick={''} type="button" className="btn btn-primary">Print</button></div>
      
      <div className='viewContainer'>
        <div className='factory-details'>
          <h2>Lanka MountCastle (Pvt) Ltd</h2>
          <h6>Lanka MountCastle (Pvt) Ltd,</h6>
          <h6>No.124, Hendala, Wattala</h6>
          <h6>"Telephone"</h6>
        </div><br></br><br></br>
          <h3 style={{'text-decoration': 'underline'}}>INVOICE</h3>
        <br></br><br></br>

        <div>
          <sector className='invoice-align'>
            <h6>Invoice No: {invoiceNo}</h6>
            <h6>Invoice Date: {orderDate}</h6>
            <h6>Due Date: {currentdate}</h6>
          </sector>
        </div>

        <div> <br></br><br></br>
          <sector className='customer-align'>
            <h5>Billed to:</h5>
            <h6>Name: {customerName}</h6>
            <h6>PhoneNo: {customerContactNo}</h6>
          </sector>
        </div><br></br>

        <div >
        <table className="table table-striped table-hover mt-1">
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
        </table>

        <div className='hline'> <h6>Thank You!</h6>
        <hr/></div>
        
        </div>
        <br></br>
    </div>
    </div>
  )
}

export default InvoiceView