import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';
import { jsPDF } from "jspdf";

function StockUtilPDF() {

    const { currentColor } = useStateContext();

    const [stock, setStock] = useState([]); //stock is the state variable and setStock is the function to update the state variable

    const getStock = async () => {  //getStock is the function to get the data from the backend
        axios.get("http://localhost:8070/stock/")
            .then((res) => {
                setStock(res.data); //setStock is used to update the state variable
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    useEffect(() => { //useEffect is used to call the function getStock
        getStock();
    }, [])

    const createPDF = async () => {
        const date = new Date().toISOString().split('T')[0];
        const pdf = new jsPDF("landscape", "px", "a2", false);
        const data = await document.querySelector("#tblPDF");
        pdf.html(data).then(() => {
            pdf.save("stocksUtil_" + date + ".pdf");
        });
    };

    return (

        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
            <Header category="Table" title="Preview" />

            <div className=" flex items-center mb-5 ">
                <div className="mr-0 ml-auto">
                    <button onClick={createPDF} type="button" className="py-1 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" >Download</button>
                </div>
            </div>

            <div id="tblPDF" className="block w-full overflow-x-auto rounded-lg">
                <table className="w-full rounded-lg">
                    <thead>
                        <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                            <TableHeader value="Code" />
                            <TableHeader value="Name" />
                            <TableHeader value="Category" />
                            <TableHeader value="Last updated" />
                            <TableHeader value="Quantity" />
                            <TableHeader value="Reorder level" />
                            <TableHeader value="Buffer Stock" />
                        </tr>
                    </thead>
                    <tbody>
                        {stock.map((data) => {//map is used to iterate the array
                            const date = new Date(data.lastUpdated).toISOString().split('T')[0];

                            var datacolor = "text-black";
                            if (data.sufficientStock === "Available") {
                                datacolor = "text-green-500 font-bold";
                            } else if (data.sufficientStock === "-") {
                                datacolor = "text-black font-bold";
                            } else {
                                datacolor = "text-red-600 font-bold";
                            }

                            return (
                                <tr className="text-sm h-10 border dark:border-slate-600">
                                    <TableData value={data.stockCode} />
                                    <TableData value={data.stockName} />
                                    <TableData value={data.stockCategory} />
                                    <TableData value={date} />
                                    <TableData value={data.quantity} />
                                    <TableData value={data.reorderLevel} />
                                    <td className={`${datacolor} text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3`}>{data.sufficientStock} </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default StockUtilPDF