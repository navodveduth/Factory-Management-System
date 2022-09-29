import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {jsPDF} from "jspdf";
import TableHeader from "../../components/Table/TableHeader";
import TableData from '../../components/Table/TableData';
import Header from "../../components/Header";
import { useStateContext } from '../../contexts/ContextProvider';

export default function PreviewOrder(){
    const { currentColor } = useStateContext();
    const [transactions, setTransactions] = useState([])

        async function getFinance(){
            await axios.get("http://localhost:8070/finance/viewTransaction").then((res)=>{
                setTransactions(res.data);
            }).catch((err)=>{
                alert(err.message);
            })
        }

        useEffect(()=>{
            getFinance();
        })

        const createPDF = () => {
            const date = new Date(Date.now()).toISOString().split('T')[0];
            const pdf = new jsPDF("landscape", "px", "a1",false);
            const data = document.querySelector("#tableContainer");
            pdf.html(data).then(() => {
                pdf.save("CashTransactions-"+ date + ".pdf");
               });
        };

        return(
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
            <Header category="Table" title="CashTransactions" />
            {/* <div className="w-full h-5"> */}
                <button onClick={createPDF} type="button"  className="font-bold py-1 px-4 rounded-full m-3 text-white absolute top-40 right-20 hover:bg-slate-700 bg-slate-500" >Download Report</button>
            {/* </div> */}
    
            <div className="block w-full overflow-x-auto rounded-lg" id="tableContainer">
            <table className="w-full rounded-lg">
                <thead>
                    <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                    <TableHeader value="Transaction ID" />
                    <TableHeader value="Description" />
                    <TableHeader value="Amount" />
                    <TableHeader value="Type" />
                    <TableHeader value="Date of Transaction" />
                    </tr>
                </thead>
                <tbody>
                    { transactions.map((data)=>{
                        return ( 
                            <tr className="text-sm h-10 border dark:border-slate-600">
                                <TableData value={data.trnID} />
                                <TableData value={data.trnDesc} />
                                <TableData value={data.trnAmount} />
                                <TableData value={data.trnType} />
                                <TableData value={new Date(data.trnRecordedDate).toISOString().split('T')[0]} /> 
                            </tr>
                        )
                    })}
                    
                </tbody>
            </table>
            </div>
        </div>
        );
}