import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Header } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';

function StockBreakdown() {
    const { currentColor } = useStateContext();

    const [stock, setStock] = useState([]); //stock is the state variable and setStock is the function to update the state variable
    const[stockUtil,setStockUtil] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    var totAdds = 0;
    var totIssues = 0;
    var quantity = 0

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

    const getStockUtil = async () => {  //getStock is the function to get the data from the backend
        axios.get("http://localhost:8070/stockUtilisation")
            .then((res) => {
                setStockUtil(res.data); //setStock is used to update the state variable
                console.log(res.data);
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    const id = useParams();
    
    const deleteStock = async (id) => {
        await axios.delete('http://localhost:8070/stock/delete/' + id)
            .then(() => {
                alert("Data deleted successfully");
                getStock();
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    useEffect(() => { //useEffect is used to call the function getStock
        getStock();
    }, [])

    useEffect(() => { //useEffect is used to call the function getStock
        getStockUtil();  
    }, [])

    const confirmFunc = (id)=>{

		if (confirm("Do you want to delete?") == true) {
            deleteStock(id);
		} else {
			navigate('/StockBreakdown');
		}

    }

    // var totAdds = 0;
    // var totIssues = 0;
    // var price =0;

    // stock.stockUtilisationDetails.filter((stk) => stk.type === "Additions" && stockCode == stockCode).map(
    //     totAdds += stk.units,
    //     price = stk.unitPrice
    // )

    // stock.stockUtilisationDetails.filter((stk) => stk.type === "Issues" && stockCode == stockCode).map(
    //     totIssues += stk.units
    // )

    return (

            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
                <Header category="Table" title="Stocks" />

                <div className=" flex items-center mb-5 ">
          <div>
            <input type="text" className=" block w-400 rounded-md bg-gray-100 focus:bg-white dark:text-black" placeholder="Search Here" 
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }} />
          </div>
          <div className="mr-0 ml-auto">
            <Link to={"/generateSBPDF"}> {/* change this link your preview page */}
              <button type="button"  className="py-1 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" >Generate Report</button>
            </Link>
          </div>

          </div>

                <div className="block w-full overflow-x-auto rounded-lg">
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
                                <TableHeader value="Manage" />
                            </tr>
                        </thead>
                        <tbody>
                            {stock.filter((data) => {
                                if(searchTerm == ""){
                                    return data;
                                }else if((data.stockCode.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                  (data.stockName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                  (data.stockCategory.toLowerCase().includes(searchTerm.toLowerCase())))
                                  
                                  {
                                  return data;
                                  }
                              }).map((data, key) => {//map is used to iterate the array
                                //const date = new Date(data.lastUpdated).toISOString().split('T')[0];

                            {stockUtil.filter((stockUtil) => stockUtil.type === "Additions" && 
                            stockUtil.stockCode === data.stockCode).map((stockUtil) => {
                                totAdds += stockUtil.quantity
                            })}
                            {stockUtil.filter((stockUtil) => stockUtil.type === "Issues" &&
                            stockUtil.stockCode === data.stockCode).map((stockUtil) => {
                                    totIssues += stockUtil.quantity
                            })}
                               
                                {quantity = totAdds - totIssues}
                                return (
                                    <tr className="text-sm h-10 border dark:border-slate-600">
                                        <TableData value={data.stockCode} />
                                        <TableData value={data.stockName} />
                                        <TableData value={data.stockCategory} />
                                        <TableData value={quantity} />
                                        <TableData value={totAdds}/>
                                        <TableData value={totIssues} />
                                        <TableData values={data.damagedQty} />
                                        <TableData value={"Rs." + data.unitPrice} />
                                        <TableData value={data.reorderLevel} />
                                        <TableData value={data.sufficientStock} />

                                        <td className="text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">
                                            <Link to={`/StockUpdate/${data._id}`}>
                                                <button
                                                    type="button"
                                                    className="font-bold py-1 px-4 rounded-full mx-3 text-white"
                                                    style={{ background: currentColor }}
                                                >
                                                    <i className="fas fa-edit" />
                                                </button>
                                            </Link>
                                            <button
                      type="button"
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 ml-2 rounded-full"
                      onClick={() => {
                        confirmFunc(data._id);
                      }}
                    >
                      <i className="fas fa-trash" />
                    </button>
                  </td>
                </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

    )
}

export default StockBreakdown