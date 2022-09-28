import {useState} from 'react';
import axios from 'axios';
import "../../styles/salesStyle/SalesForm.css";
import {useNavigate} from 'react-router-dom';

function SalesForm() {
    const navigate = useNavigate();         //useNavigate is a hook that is used to navigate to another page

    const [invoiceNo, setInvoice] =useState('');
    const [orderDate, setOrderDate] =useState('');
    const [customerName, setCustomerName] =useState('');
    const [customerContactNo, setCustomerContactNo] =useState('');
    const [materialsSupplied, setMaterialsSupplied] =useState('');
    const [totalAmount, setTotalAmount] =useState('');
    const [status, setStatus] =useState('');
    
    // const [count, setCount] = useState(0);
    //const inv = 'INV'
    // const incrementCount = () => {
    //   // Update state with incremented value
    //   setCount(count + 1);
    //    };


    return (
        <div className='SalesFormContainer'>
              
              <form onSubmit={async(e)=>{
                  e.preventDefault()
                  
                 

                  const newOrder = {
                    invoiceNo,     
                    orderDate,
                    customerName,
                    customerContactNo,
                    materialsSupplied,
                    totalAmount,
                    status
                  }
                  
                  await axios.post("http://localhost:8070/sales/create", newOrder)
                      .then((res)=>{
                          alert("Order saved successfully");
                             //navigate to the sales view page
                      navigate('/sales');
                      })
                      .catch((err)=>{
                          console.log(err);
                          alert("Error Occured!")
                      }) 
              }}>
                
              <h1>New Order Form</h1>
              <div className="mb-3">
                <label className="form-label">Invoice No</label>
                <input type="text"  className="form-control" id="invoiceNo" maxLength={8} defaultValue='INV' required 
                onChange={(e)=>{
                    setInvoice(e.target.value);
                }}/>
                
              </div>
              
              <div className="mb-3">
                <label className="form-label">Order Date</label>
                <input type="date" className="form-control" id="orderDate" required
                onChange={(e)=>{
                    setOrderDate(e.target.value);
              }}/>
              </div>

              <div className="mb-3">
                <label className="form-label">Customer Name</label>
                <input type="text" className="form-control" id="customerName" placeholder='Enter Customer Name' required
                onChange={(e)=>{
                    setCustomerName(e.target.value);
              }}/>
              </div>

              <div className="mb-3">
                <label className="form-label">Contact Number</label>
                <input type="text" className="form-control" id="cusConatct" placeholder='Enter Contact Number' required pattern="[0-9]{10}"
                onChange={(e)=>{
                    setCustomerContactNo(e.target.value);
              }}/>
              </div>

              <div className="mb-3">
                <label className="form-label">Supplied Materials</label> <br></br> 
                <select
                    id='materials'
                    name='materials'
                    className='form-control'
                    
                    onChange={(e) => {
                      setMaterialsSupplied(e.target.value);
                    }}
                  >
                    <option value=''>Select...</option>
                    <option value='With Materials'>With Materials</option>
                    <option value='Without Materials'>Without Materials</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Total Amount</label>
                <input type="text" className="form-control" id="totamount"  placeholder='Enter Total Amount'
                onChange={(e)=>{
                    setTotalAmount(e.target.value);
              }}/>
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                    id='status'
                    name='status'
                    className='form-control'
                    defaultValue={'Placed'}
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                  >
                    <option value=''>Select...</option>
                    <option value='Placed'>Placed</option>
                    {/* <option value='Pending'>Pending</option>
                    <option value='Finished'>Finished</option> */}
                    
                </select>
              </div>
              
              <button type="submit" className="btn btn-light" style={{backgroundColor:'#FF5A5F'}}>Submit</button>
            </form>
          </div>
    )

}

export default SalesForm