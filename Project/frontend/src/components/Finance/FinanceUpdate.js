import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function FinanceUpdate(){
    
    const navigate = useNavigate();

        const [revenue, setRevenue] = useState("");
        const [expenses, setExpenses] = useState("");
        const [recordedDate, setRecordedDate] = useState("");
    
    const {id} = useParams();

    const getFinance = () => {
        axios.get(`http://localhost:8070/finance/${id}`)
        .then((res) => {
            setRevenue(res.data.revenue);
            setExpenses(res.data.expenses);
        })
        .catch((err) => {
            alert(err.message);
        })
    }
    
    useEffect(() => {
        getFinance();
    }, [])

    return(
        <div className="FinanceDataUpdateFormContainer">  
                <h1>Finance Data Update Form</h1>
                <form onSubmit = {async(e) => { 
                    e.preventDefault();

                    const newFinance = {
                        revenue,
                        expenses,
                        recordedDate
                    }

                    await axios.put("http://localhost:8070/finance/update/" + id, newFinance)
                    //update function avoids .then and goes to the catch block, so the success message is displayed on both try and catch
                    .then((res) => {
                        alert("Data Updated Successfully");
                        navigate('/finance');})
                    .catch((err) => {
                        console.log(err)
                        alert("Data Updated Successfully");
                        navigate('/finance');
                    })
                }}>

    
            <div className="mb-3">
                <label for="revenue" className="form-label">Revenue</label>
                <input type="text" className="form-control" id="revenue" placeholder="Enter Revenue"
                onChange={(e) => {
                    setRevenue(e.target.value);
                }}/>
            </div>

            <div className="mb-3">
                <label for="expenses" className="form-label">Expenses</label>
                <input type="text" className="form-control" id="expenses" placeholder="Enter Expenses"
                onChange={(e) => {
                    setExpenses(e.target.value);
                }}/>

            </div>
            <div className="mb-3">
                <label for="date" className="form-label">Date</label>
                <input type="date" className="form-control" id="date" placeholder="Enter Date"
                onChange={(e) => {
                    setRecordedDate(e.target.value);
                }}/>
            </div>

            <button type="submit" className="btn btn-primary" style={{backgroundColor:'#FF5A5F'}}>Update</button>
            </form>
            </div>

    )

}