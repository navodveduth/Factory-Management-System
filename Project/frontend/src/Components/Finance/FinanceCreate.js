import {useState} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import financeForm from "../styles/financeForm.css";

export default function FinanceCreate(){

    const navigate = useNavigate(); //useNavigate is a hook that is used to navigate to a specific route

    const[revenue, setRevenue] = useState("");
    const[expenses, setExpenses] = useState("");
    const[recordedDate, setRecordedDate] = useState("");

    return(
        <div>
            <h1>Finance Data Form</h1>
            <form id="masterEntry" onSubmit={async(e) => {
               e.preventDefault();
               
               const newFinanceData = {
                revenue,
                expenses,
                recordedDate
               } 

               await axios.post("http://localhost:8070/finance/add", newFinanceData)
                .then((res) => {
                    alert("Data Added Successfully!")
                })
                .catch((err) => {
                    console.log(err);
                    alert("Error Occurred!")
                })
            }}>


                <div className="form-group">
                    <label for="revenue">Revenue</label>
                    <input type="text" className="form-control" id="revenue" placeholder="Enter Revenue"
                    onChange={(e) => {
                        setRevenue(e.target.value);
                    }}
                    />
                </div>
                <div className="form-group">
                    <label for="Expenses">Expenses</label>
                    <input type="text" className="form-control" id="expenses" placeholder="Enter Expenses"
                    onChange={(e) => {
                        setExpenses(e.target.value);
                    }}
                    />
                </div>
                <div className='form-group'>
                    <label for="date">Date</label>
                    <input type="date" className="form-control" id="date" placeholder="Enter Date"
                    onChange={(e) => {
                        setRecordedDate(e.target.value);
                    }}
                    />
                </div>
                <button type="submit" className="btn btn-primary" style={{"marginTop": "10px"}}>Submit</button>
            </form>
        </div>
    )

}
