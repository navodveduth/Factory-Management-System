import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import Swal from 'sweetalert2';

import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';





function MachMaintenanceCreateForm() {

    const navigate = useNavigate(); //useNavigate hook to redirect to another page after form submission is successful 

    const [mid, setmid] = useState('');
    const [machineID, setmachineID] = useState('');
    const [Description, setDescription] = useState('');
    const [lastMaintainedDate, setLastMaintainedDate] = useState('');
    const [nextServiceDate, setNextServiceDate] = useState('');
    const [status, setStatus] = useState('');
    const [Location, setLocation] = useState('');
    const [contactNo, setContactNo] = useState("");
    const [others, setOthers] = useState('');

    const autoCompleteForm = () => {
        setmid("0006");
        setmachineID("M115");
        setDescription("Few Fixtures");
        setLastMaintainedDate("2022-11-09");
        setNextServiceDate("2022-12-10")
        setStatus("In progress");
        setLocation("Singer");
        setContactNo("0711275243");
        setOthers("5000");
       
      }



    var date = new Date().toISOString().split('T')[0];

    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();


    return (
        <div>

            {/* DON'T CHANGE ANYTHING HERE */}

            <div className={currentMode === 'Dark' ? 'dark' : ''}>

                <div className="flex relative dark:bg-main-dark-bg">

                    <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}> {/* THEME SETTINGS BUTTON */}
                        <TooltipComponent content="Settings" position="Top">
                            <button
                                type="button"
                                onClick={() => setThemeSettings(true)}
                                style={{ background: currentColor, borderRadius: '50%' }}
                                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                            >
                                <FiSettings />
                            </button>
                        </TooltipComponent>
                    </div>


                    {activeMenu ? ( // SIDEBAR IMPLEMENTATION
                        <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                            <Sidebar />
                        </div>
                    ) : (
                        <div className="w-0 dark:bg-secondary-dark-bg">
                            <Sidebar />
                        </div>
                    )}

                    <div
                        className={ // MAIN BACKGROUND IMPLEMENTATION
                            activeMenu
                                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                        }
                    >

                        {/* NAVBAR IMPLEMENTATION */}
                        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                            <Navbar />
                        </div>

                        <div>
                            {themeSettings && <ThemeSettings />}
                            <div>
                                {/* YOUR COMPONENT IMPLEMENTATION GOES HERE */}
                                {/* COPY YOUR ORIGINAL COMPONENT CODE HERE */}
                                {/* PART AFTER THE RETURN STATEMENT */}
                                <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
                                    <Header category="Form" title=" Add New Machinery Maintenance" />
                                    <div className=" flex items-center justify-center ">
                                        <form onSubmit={async (e) => {
                                            e.preventDefault();

                                            const newMaintenance = {
                                                mid,
                                                machineID,
                                                Description,
                                                lastMaintainedDate,
                                                nextServiceDate,
                                                status,
                                                Location,
                                                contactNo,
                                                others

                                            }

                                            await axios.post("http://localhost:8070/maintainenceMachine/create", newMaintenance)
                                                .then((res) => {
                                                    Swal.fire({  
                                                        icon: 'success',
                                                        title: 'Data Successfully Saved',
                                                        color: '#f8f9fa',
                                                        background: '#6c757d',
                                                        showConfirmButton: false,
                                                        timer: 2000
                                                      })
                                                    navigate('/MachMaintenanceViewAll');
                                                })
                                                .catch((err) => {
                                                    console.log(err);
                                                    alert("Error occured");
                                                })


                                        }}>
                                             <div className=" flex items-center mb-5 ">
                                      <div className="mr-0 ml-auto">
                                          <button type="button"  className="py-1 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500" onClick={autoCompleteForm} >AutoComplete</button>
                                      </div>
                                    </div>

                                            <div className="mb-3">
                                                <label htmlFor="employeeFullName" className="form-label">Maintainence Id: </label>
                                                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                                    id="employeeFullName" value={mid} required
                                                    onChange={(e) => {
                                                        setmid(e.target.value);
                                                    }} />
                                            </div>


                                            <div className="mb-3">
                                                <label htmlFor="employeeFullName" className="form-label">Id: </label>
                                                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                                    id="employeeFullName" value={machineID} required
                                                    onChange={(e) => {
                                                        setmachineID(e.target.value);
                                                    }} />
                                            </div>


                                            <div className="mb-3">
                                                <label htmlFor="employeeFullName" className="form-label">Repair needed: </label>
                                                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                                    id="employeeFullName" value={Description} required
                                                    onChange={(e) => {
                                                        setDescription(e.target.value);
                                                    }} />
                                            </div>





                                            <div className="mb-3">
                                                <label htmlFor="employeeDOB" className="form-label">Last Maintained Date : </label>
                                                <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                                    id="employeeDOB" min="2010-01-01" max={date} value={lastMaintainedDate} required
                                                    onChange={(e) => {
                                                        setLastMaintainedDate(e.target.value);
                                                    }} />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="employeeDOB" className="form-label">Next Due : </label>
                                                <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                                    id="employeeDOB" min={date} value={nextServiceDate} required
                                                    onChange={(e) => {
                                                        setNextServiceDate(e.target.value);
                                                    }} />
                                            </div>
                                            <div className="mb-3">
                                                <label for="employeeType" className="form-label">Status : </label>
                                                <select class="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                                    id="employeeType" aria-label="Default select example" value={status} required
                                                    onChange={(e) => {
                                                        setStatus(e.target.value);
                                                    }}>
                                                    <option selected>Choose...</option>
                                                    <option selected>Choose...</option>
                                                    <option value="Completed">Completed</option>
                                                    <option value="In progress">In progress</option>

                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="employeeNumber" className="text-md">Repair company: </label>
                                                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                                    id="employeeNumber"  value={Location} required
                                                    onChange={(e) => {
                                                        setLocation(e.target.value);
                                                    }} />

                                            </div>


                                            <div className="mb-3">
                                                <label htmlFor="employeeNumber" className="text-md">Repair contact No: </label>
                                                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                                    pattern="[0-9]{10}" maxLength={10} title={"The Contact Number requires a 10 digit number"}
                                                    id="employeeNumber" value={contactNo} required
                                                    onChange={(e) => {
                                                        setContactNo(e.target.value);
                                                    }} />

                                            </div>


                                            <div className="mb-3">
                                                <label htmlFor="employeeNameWithInitials" className="form-label">Cost of maintenance : </label>
                                                <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                                    id="employeeNameWithInitials" min={0} value={others} required
                                                    onChange={(e) => {
                                                        setOthers(e.target.value);
                                                    }} />
                                            </div>




                                            <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Add Maintenance</button>
                                        </form>
                                    </div>

                                </div>
                            </div>
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MachMaintenanceCreateForm;
