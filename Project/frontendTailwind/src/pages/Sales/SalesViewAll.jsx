import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Header } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';

const SalesViewAll = () => {
  const { currentColor } = useStateContext();

  const [sales, setSale] = useState([]);

  const getSale = async () => {
    axios
      .get(`http://localhost:8070/sales/`)
      .then((res) => {
        setSale(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getSale();
  }, []);

  const deleteSale = async (id) => {
    await axios
      .delete(`http://localhost:8070/sales/delete/${id}`)
      .then((res) => {
        alert('Deleted Successfully');
        getSale();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
        <Header category="Table" title="Sales" />
        <div className="block w-full overflow-x-auto rounded-lg">
          <table className="w-full rounded-lg">
            <thead>
              <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                <TableHeader value="Invoice No." />
                <TableHeader value="Date of Order" />
                <TableHeader value="Customer Name" />
                <TableHeader value="Contact No." />
                <TableHeader value="Total Amount" />
                <TableHeader value="Status" />
                <TableHeader value="Materials" />
              </tr>
            </thead>
            <tbody>
              {sales.map((data) => (
                <tr className="text-sm h-10 border dark:border-slate-600">
                  <TableData value={data.invoiceNo} />
                  <TableData value={new Date(data.orderDate).toISOString().split('T')[0]} />
                  <TableData value={data.customerName} />
                  <TableData value={data.customerContactNo} />
                  <TableData value={data.totalAmount} />
                  <TableData value={data.status} />
                  <TableData value={data.materialsSupplied} />

                  <td className="text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">
                    <Link to={`/SalesUpdate/${data._id}`}>
                      <button
                        type="button"
                        className="font-bold py-1 px-4 rounded-full mx-3  text-white"
                        style={{ background: currentColor }}
                      >
                        <i className="fas fa-edit" />
                      </button>
                    </Link>

                    <Link to={`/SalesInvoice/${data._id}`}>
                      <button
                        type="button"
                        className="font-bold py-1 px-4 rounded-full mx-3  text-white"
                        style={{ background: currentColor }}
                      >
                        <i className="fa-regular fa-file-lines" />
                      </button>
                    </Link>

                    <button
                      type="button"
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 ml-2 rounded-full"
                      onClick={() => {
                        deleteSale(data._id);
                      }}
                    >
                      <i className="fas fa-trash" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesViewAll;
