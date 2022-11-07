import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams,useNavigate} from "react-router-dom";
import Header from "../../components/Header";
import { useStateContext } from '../../contexts/ContextProvider';

export default function UpdateOrder(){
    const navigate = useNavigate();

//values for the order to be posted 
    const [invoiceNo, setInvoice] =useState('');
    const [customerName,setCustomerName] = useState('')
    const [product, setItemName] =useState('');
    const [unitQty, setQuantity] =useState('');
    const [materialCost,setMatCost] = useState('');
    const [requestDate,setOrderDate] = useState('');
    const [supervisor,setSupervisor] =useState('');
    const [teamLead, setTeamLead] = useState('');
    const [member1,setMember1] = useState('');
    const [member2,setMember2] = useState('');
   // const [status,setStatus] = "Stock Requested";
    const totalMatCost = unitQty * materialCost;

   // const [totalCost, setTotalCost] =useState('');
    
    //Determinant values 

    let maxDate = new Date();
    //auxiliary content to pass the value
    const [Days, setDays] = useState('');
    const [rate,setRate] = useState('');
    const status =  "Stock Requested"
    const totalLabCost = (Days * rate * 8 * 4);
    const approvedDate = requestDate;
    const costedDate = requestDate;
    const overHeadCost = 0;
    const totalCost = 0;

    const {id} = useParams(); //get the id from the url

    const getSale = () => {
        axios.get(`http://localhost:8070/sales/${id}`)
        .then((res) => {
            
            setInvoice(res.data.invoiceNo);
            setCustomerName(res.data.customerName);
           // setOrderDate(res.data.orderDate);
            //setCustomerID(res.data.customerID);
            setItemName(res.data.itemName);
            setQuantity(res.data.quantity);
           // setTotalAmount(res.data.totalAmount);
            //setStatus(res.data.status);
            })
            .catch((err) => {
                alert(err.message);
            })
        }

    //View Employee Names in the Drop Down
   // const {id} = useParams();   // gets the id from the url
    const [employee,setEmployee] = useState([]);
    const getEmployees = async () => {
        axios
          .get('http://localhost:8070/employee/viewEmployee')
          .then((res) => {
            setEmployee(res.data);
          })
          .catch((err) => {
            alert(err.message);
          });
      };
    

        useEffect(()=>{ //This will run the page when loaded
        getSale();
        getEmployees();
    },[]);

    return (
        <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white '>
         <Header category="Form" title="Request Stocks" />
         <div className=" flex items-center justify-center">
            <form onSubmit={async(e)=>{
                        e.preventDefault();
        
                    const newOrder = {
                        invoiceNo,
                        customerName,
                        product,
                        materialCost,
                        unitQty,
                        requestDate,
                        approvedDate,
                        costedDate,
                        supervisor,
                        teamLead,
                        member1,
                        member2,
                        totalMatCost,
                        totalLabCost,
                        overHeadCost,
                        totalCost,
                        status,
                }
                console.log(newOrder);
                await axios.post("http://localhost:8070/production/order/orderCreate",newOrder).then(()=>{
                    alert("Order Created");
                    navigate('/viewRequested');

                }).catch((error)=>{
                    console.log(error);
                    alert("This Production Voucher already exits.");
                })
            }}>
                <div className="mb-3">
                    <label for="name" className="text-md">Invoice Number</label>
                    <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="name" placeholder={invoiceNo} onChange={(e)=>{
                        setInvoice(e.target.value);    //event has to be created in any onclick. event has to be passed down to get the values
                    }}
                    readOnly/>
                </div>
                <div className="mb-3">
                    <label for="name" className="text-md">Quantity</label>
                    <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="name" placeholder={unitQty} onChange={(e)=>{
                        setQuantity(unitQty);    //event has to be created in any onclick. event has to be passed down to get the values
                    }}
                    readOnly/>
                </div>
                <div className="mb-3">
                    <label for="name" className="text-md">Product</label>
                    <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="name" placeholder={product} onChange={(e)=>{
                        setItemName(e.target.value);
                    }}
                    readOnly/>
                </div>
                <div className="mb-3">
                    <label for="name" className="text-md">Material Cost</label>
                    <input type="Number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="name" placeholder={materialCost} onChange={(e)=>{
                        setMatCost(e.target.value);
                    }}/>
                </div>

                <div className="mb-3">
                    <label for="name" className="text-md">Request Date</label>
                    <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="name" placeholder={materialCost} onChange={(e)=>{
                        setOrderDate(e.target.value);
                    }} maximum={maxDate}/>
                </div>
                
                <div className="mb-3">
                        <label for="category" className="form-label">Select The Supervisor </label>
                            < select class="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"  id="category" required onChange={(e) => {
                                setSupervisor(e.target.value);
                        }}
                        placeholder={"Select The Supervisor"}>

                            {employee.map((data)=>{
                                return(
                                        <option value={data.employeeFullName} label={data.employeeFullName}>{data.employeeFullName} </option>
                                    )
                             })}

                        </select>
                    </div>
                    <div className="mb-3">
                        <label for="category" className="form-label">Select The Team Lead</label>
                            < select class="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"  id="category" required onChange={(e) => {
                                setTeamLead(e.target.value);
                        }}>

                            {employee.map((data)=>{
                                return(
                                        <option value={data.employeeFullName} label={data.employeeFullName}>{data.employeeFullName} </option>
                                    )
                             })}

                        </select>
                    </div>

                    <div className="mb-3">
                        <label for="category" className="form-label">Select Technical Member</label>
                            < select class="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"  id="category" required onChange={(e) => {
                                setMember1(e.target.value);
                        }}>

                            {employee.map((data)=>{
                                return(
                                        <option value={data.employeeFullName} label={data.employeeFullName}>{data.employeeFullName} </option>
                                    )
                             })}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label for="category" className="form-label">Select Production Member</label>
                            < select class="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"  id="category" required onChange={(e) => {
                                setMember2(e.target.value);
                        }}>

                            {employee.map((data)=>{
                                return(
                                        <option value={data.employeeFullName} label={data.employeeFullName}>{data.employeeFullName} </option>
                                    )
                             })}

                        </select>
                    </div>
                    <div className="mb-3">
                    <label for="name" className="text-md">Enter the Estimated Labour Rate</label>
                    <input type="Number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="name"  onChange={(e)=>{
                        setRate(e.target.value);
                    }}/>
                </div>
                    <div className="mb-3">
                    <label for="name" className="text-md">Enter the Estimated Days (8 hours a day)</label>
                    <input type="Number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="name"  onChange={(e)=>{
                        setDays(e.target.value);
                    }}/>
                </div>
                                
                <div className="mb-3">
                    <label for="address" className="text-md">Total Labour Cost</label>
                    <input type="Number" placeholder={totalLabCost} className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" id="address"   onChange={(e)=>{
                        //setTotalLabCost(); 
                    }} />
                </div>

                <div>
                <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Request Stock</button>
                </div>
            </form>
            </div>
    </div>
    );
};
