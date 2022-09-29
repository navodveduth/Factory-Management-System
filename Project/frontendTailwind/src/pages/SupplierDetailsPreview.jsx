import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import TableData from '../components/Table/TableData';
import TableHeader from '../components/Table/TableHeader';
import {jsPDF} from "jspdf";

const SupplierDetailsPreview = () => {
		const { currentColor } = useStateContext();

		const[supplier, setSupplier] = useState([]);

		const getSupplier = async () => {
				axios.get("http://localhost:8070/supplier/")
				.then((res) => { 
						setSupplier(res.data); 
				})
				.catch((err) => {
						alert(err.message);
				})
		}

		useEffect(() => { 
				getSupplier();
		}, [])


		const createPDF = () => {
            const pdf = new jsPDF("landscape", "px", "a1",false);
            const data = document.querySelector("#tableContainer");
            pdf.html(data).then(() => {
                pdf.save("SupplierDetails.pdf");
               });
        };

		return (

			<div>
			<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
				<Header category="Table" title="Supplier Details" />

				  {/* <div className="w-full h-5"> */}
					<button type="button"  onClick={createPDF} className="py-1 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" >Download Report</button>
				 {/* </div> */}

	  
				<div className="block w-full overflow-x-auto rounded-lg" id="tableContainer">
							<table className="w-full rounded-lg">
								<thead>
									<tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
										<TableHeader value="Supplier ID"/>
										<TableHeader value="Company Name" />
										<TableHeader value="Contact Person" />
										<TableHeader value="Email" />
										<TableHeader value="Phone" />
										<TableHeader value="Address" />
										<TableHeader value="Product Details" />
										<TableHeader value="Lead Time" />
										<TableHeader value="Order Capacity" />
										
									</tr>
								</thead>
								<tbody>

				  {supplier.map((data) => {
						  return(
					  <tr className="text-sm h-10 border dark:border-slate-600" >
											<TableData value={data.supplierId} />
											<TableData value={data.companyname} />
											<TableData value={data.contactPerson} />
											<TableData value={data.email} />
											<TableData value={data.phone} />
											<TableData value={data.address} />
											<TableData value={data.productDetails} />
											<TableData value={data.leadTime} />
											<TableData value={data.orderCapacity} />
	
										</tr>
						  )
					})}
				  </tbody>
				</table>
			  </div>
			</div>
		  </div>

);

}

export default SupplierDetailsPreview;



