import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';
import { jsPDF } from "jspdf";

function StockBreakdownPDF() {

    const { currentColor } = useStateContext();

    const [stock, setStock] = useState([]); //stock is the state variable and setStock is the function to update the state variable
    const [searchTerm, setSearchTerm] = useState("");

    const getStock = async () => {  //getStock is the function to get the data from the backend
        axios.get("http://localhost:8070/stock")
            .then((res) => {
                setStock(res.data); //setStock is used to update the state variable
                console.log(res.data);
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
            pdf.save("stocks_" + date + ".pdf");
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
                            <TableHeader value="Bundle Name" />
                            <TableHeader value="Category" />
                            <TableHeader value="Units" />
                            <TableHeader value="Additions" />
                            <TableHeader value="Issues" />
                            <TableHeader value="Damaged Units" />
                            <TableHeader value="Unit price" />
                            <TableHeader value="Reorder Level" />
                            <TableHeader value="Buffer stock" />
                        </tr>
                    </thead>
                    <tbody>
                        {stock.map((data, key) => {//map is used to iterate the array
                            //const date = new Date(data.lastUpdated).toISOString().split('T')[0];

                            var totAdds = 0;
                            var totIssues = 0;
                            var price = 0;
                            data.stockUtilisationDetails.filter((stk) => stk.type === "Additions" &&
                            stk.stockCode == data.stockCode).map(
                                totAdds += stk.units,
                                price = stl.unitPrice
                            )

                            data.stockUtilisationDetails.filter((stk) => stk.type === "Issues" &&
                            stk.stockCode == data.stockCode).map(
                                totIssues += stk.units
                            )

                            return (
                                <tr className="text-sm h-10 border dark:border-slate-600">
                                    <TableData value={data.stockCode} />
                                    <TableData value={data.stockName} />
                                    <TableData value={data.stockCategory} />
                                    <TableData value={data.quantity} />
                                    <TableData value={totAdds} />
                                    <TableData value={totIssues} />
                                    <TableData values={data.damagedQty} />
                                    <TableData value={"Rs." + price} />
                                    <TableData value={data.reorderLevel} />
                                    <TableData value={data.sufficientStock} />
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default StockBreakdownPDF