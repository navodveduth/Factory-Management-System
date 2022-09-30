import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Header } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';

function DamagedStockView() {
    const { currentColor } = useStateContext();

    const [damagedStock, setDamagedStock] = useState([]); //damagedStock is the state variable and setDamagedStock is the function to update the state variable
    const [searchTerm, setSearchTerm] = useState("");

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

    const id = useParams();

    const deleteDamagedStock = async (id) => {
        await axios.delete('http://localhost:8070/damagedStock/delete/' + id)
            .then(() => {
                alert("Data deleted successfully");
                getdamagedStock();
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    useEffect(() => { //useEffect is used to call the function getdamagedStock
        getdamagedStock();
    }, [])

    const confirmFunc = (id)=>{

		if (confirm("Do you want to delete?") == true) {
            deleteDamagedStock(id);
		} else {
			navigate('/DamagedStockView');
		}

    }

    return (
       
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
                <Header category="Table" title="Damaged Stocks" />
                
                <div className=" flex items-center mb-5 ">
          <div>
            <input type="text" className=" block w-400 rounded-md bg-gray-100 focus:bg-white dark:text-black" placeholder="Search Here" 
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }} />
          </div>
          <div className="mr-0 ml-auto">
            <Link to={"/generateDPDF"}> {/* change this link your preview page */}
              <button type="button"  className="py-1 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" >Generate Report</button>
            </Link>
          </div>

          </div>

                <div className="block w-full overflow-x-auto rounded-lg">
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
                                <TableHeader value="Manage" />
                            </tr>
                        </thead>
                        <tbody>
                            {damagedStock.filter((data) => {
                                if(searchTerm == ""){
                                    return data;
                                }else if((data.stockCode.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                  (data.damagedStockName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                  (data.damagedStockCategory.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                  (data.usability.includes(searchTerm)))
                                  
                                  {
                                  return data;
                                  }
                              }).map((data, key) => {//map is used to iterate the array
                                const date = new Date(data.updatedDate).toISOString().split('T')[0];

                                return (
                                    <tr className="text-sm h-10 border dark:border-slate-600">
                                        <TableData value={data.stockCode} />
                                        <TableData value={data.damagedStockName} />
                                        <TableData value={data.damagedStockCategory} />
                                        <TableData value={data.quantity} />
                                        <TableData value={date} />
                                        <TableData value={"Rs." + data.value} />
                                        <TableData value={"Rs." + data.totalValue} />
                                        <TableData value={data.usability} />

                                        <td className="text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">
                                            <Link to={`/DamagedStockUpdate/${data._id}`}>
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

export default DamagedStockView