import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Header } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';
import { DashTopBox, DashTopButton } from '../../components';

const CustomerViewAll = () => {
  const { currentColor } = useStateContext();

  const [customer, setCustomer] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getCustomer = async () => {
    axios
      .get(`http://localhost:8070/customer/all`)
      .then((res) => {
        setCustomer(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getCustomer();
  }, []);

  const deleteCustomer = async (id) => {
    await axios
      .delete(`http://localhost:8070/customer/delete/${id}`)
      .then((res) => {
        alert('Deleted Successfully');
        getCustomer();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const confirmFunc = (id)=>{

		if (confirm("Do you want to delete?") == true) {
        deleteCustomer(id);
		} else {
			  navigate('/CustomerViewAll');
		}

    }

  return (
    <div>
      
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
        <Link to="/SalesCreate">
          <DashTopButton value="Create New Order"/>
        </Link>
        <div><br></br></div>
        <Header  title="Customers" />
        
        <div className=" flex items-center mb-5 ">
          <div>
            <input type="text" className=" block w-400 rounded-md bg-gray-100 focus:bg-white dark:text-black" placeholder="Search Here" 
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }} />
          </div>
        
        </div>

        
        <div className="block w-full overflow-x-auto rounded-lg" id="tableContainer">
          <table className="w-full rounded-lg">
            <thead>
              <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                <TableHeader value="Customer ID" />
                <TableHeader value="Customer Name" />
                <TableHeader value="Contact No." />
                <TableHeader value="Customer Address" />
                <TableHeader value="Invoices" />
                <TableHeader value="Manage" />
              </tr>
            </thead>
            <tbody>

            {customer.filter((data) => {
                    if(searchTerm == ""){
                        return data;
                    }else if(
                      (data.customerContactNo.toLowerCase().includes(searchTerm.toLowerCase())) ||
                      (data.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                      (data.customerID.toLowerCase().includes(searchTerm.toLowerCase())))
                      {
                      return data;
                      }
                  }).map((data, key) => {

                    return(  
                        <tr className="text-sm h-10 border dark:border-slate-600" key={key}>
                            <TableData value={data.customerID} />
                            <TableData value={data.customerName} />
                            <TableData value={data.customerContactNo} />
                            <TableData value={data.customerAddress} />
                            <TableData value={data.customerDetails.map((data2) => {
                              
                                return(
                                  <div>
                                    <TableData value={data2.invoiceNo} />
                                  </div>
                                )
                              })} />
      
                              <td className="text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">
                                <Link to={`/CustomerUpdate/${data._id}`}>
                                  <button
                                    type="button"
                                    className="font-bold py-1 px-4 rounded-full mx-3  text-white"
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
    </div>
  );
};

export default CustomerViewAll;
