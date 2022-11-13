import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';
import {jsPDF} from "jspdf";

function DStockPDF() {
    const { currentColor } = useStateContext();

    const [damagedStock, setDamagedStock] = useState([]); //damagedStock is the state variable and setDamagedStock is the function to update the state variable

    const getdamagedStock = async () => {  //getdamagedStock is the function to get the data from the backend
        axios.get("http://localhost:8070/damagedStock/")
            .then((res) => {
                setDamagedStock(res.data); //setDamagedStock is used to update the state variable
                console.log(res.data);
            })
            .catch((err) => {
                alert(err.message);
            })
    }
  
    useEffect(() => { //useEffect is used to call the function getdamagedStock
        getdamagedStock();
    }, [])

    const createPDF = async () => {
        const date = new Date().toISOString().split('T')[0];
        const pdf = new jsPDF("landscape", "px", "a2", false);
        const data = await document.querySelector("#tblPDF");
        pdf.html(data).then(() => {
            pdf.save("Damagedstocks_" + date + ".pdf");
        });
    };

    return (
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
                <Header category="Table" title="Preview" />
                
                <div className=" flex items-center mb-5 ">
                    <div className="mr-0 ml-auto">
                        <button onClick={createPDF} type="button"  className="py-1 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" >Download</button>
                    </div>
                </div>

                <div id="tblPDF" className="block w-full overflow-x-auto rounded-lg">
                    <table className="w-full rounded-lg">
                        <thead>
                            <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                                <TableHeader value="Code" />
                                <TableHeader value="Name" />
                                <TableHeader value="Category" />
                                <TableHeader value="Quantity" />
                                <TableHeader value="Last updated" />
                                <TableHeader value="Unit price" />
                                <TableHeader value="Total value" />
                                <TableHeader value="Usability" />
                            </tr>
                        </thead>
                        <tbody>
                            {damagedStock.map((data) => {//map is used to iterate the array
                                const date = new Date(data.updatedDate).toISOString().split('T')[0];

                                return (
                                    <tr className="text-sm h-10 border dark:border-slate-600">
                                        <TableData value={data.stockCode} />
                                        <TableData value={data.damagedStockName} />
                                        <TableData value={data.damagedStockCategory} />
                                        <TableData value={data.quantity} />
                                        <TableData value={date} />
                                        <TableData value={data.value} />
                                        <TableData value={data.totalValue} />
                                        <TableData value={data.usability} />

                                        
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
    )
}

export default DStockPDF