import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import Swal from "sweetalert2";
import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';



function MaintenanceUpdate() {
    const navigate = useNavigate(); //useNavigate hook to redirect to another page after form submission is successful 


    const [midprop, setMidprop] = useState("");
    const [Type, setType] = useState('');
    const [Description, setDescription] = useState('');
    const [others, setOthers] = useState('');
    const [status, setStatus] = useState('');
    const [lastMaintainedDate, setLastMaintainedDate] = useState('');
    const [nextServiceDate, setNextServiceDate] = useState('');
    const [name, setName] = useState("");

    const { id } = useParams(); //get the id from the url
    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();


    const getMaintainence = () => {
        axios.get(`http://localhost:8070/maintainence/${id}`)
            .then((res) => {

                const dob = new Date(res.data.lastMaintainedDate).toISOString().split('T')[0];
                const doj = new Date(res.data.nextServiceDate).toISOString().split('T')[0];

                setMidprop(res.data.midprop);
                setType(res.data.Type);
                setDescription(res.data.Description);
                setLastMaintainedDate(dob);
                setNextServiceDate(doj);
                setOthers(res.data.others);
                setStatus(res.data.status);
                setName(res.data.name);


            })
            .catch((err) => {
                alert(err.message);
            })
    }

    useEffect(() => {
        getMaintainence(); // <== CHANGE ACCORDING TO YOUR OWN FUNCTIONS, YOU CAN REMOVE THIS LINE IF YOU DON'T NEED IT
        const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
            setCurrentColor(currentThemeColor);
            setCurrentMode(currentThemeMode);
        }
    }, []);

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
                                <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white '>
                                    <Header category="Form" title="Update Property Maintenance" />
                                    <div className=" flex items-center justify-center">

                                        <form className="" onSubmit={async (e) => {
                                            e.preventDefault();


                                            const newMaintenance = {
                                                midprop,
                                                Type,
                                                Description,
                                                others,
                                                status,
                                                lastMaintainedDate,
                                                nextServiceDate,
                                                name
                                            }

                                            await axios.put("http://localhost:8070/maintainence/update/" + id, newMaintenance)
                                                .then((res) => {
                                                    Swal.fire({  
                                                        icon: 'success',
                                                        title: 'Data Successfully Updated',
                                                        color: '#f8f9fa',
                                                        background: '#6c757d',
                                                        showConfirmButton: false,
                                                        timer: 2000
                                                      })
                                                    navigate('/MaintenanceViewAll');
                                                })
                                                .catch((err) => {
                                                    console.log(err);
                                                    alert("Error occured");
                                                })


                                        }}>


                                            <div className="mb-3">
                                                <label htmlFor="employeeFullName" className="form-label">Maintenance ID: </label>
                                                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                                    id="employeeFullName" defaultValue={midprop} disabled
                                                    onChange={(e) => {
                                                        setMidprop(e.target.value);
                                                    }} />
                                            </div>

                                            <div className="mb-3">
                                                <label for="employeeType" className="form-label">Type : </label>
                                                <select class="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                                    id="employeeType" aria-label="Default select example" defaultValue={Type} required
                                                    onChange={(e) => {
                                                        setType(e.target.value);
                                                    }}>
                                                    <option selected>Choose...</option>
                                                    <option value="Plumbing">Plumbing</option>
                                                    <option value="HVAC">HVAC</option>
                                                    <option value="Flooring">Flooring</option>
                                                    <option value="Electrical">Electrical</option>
                                                    <option value="Painting">Painting</option>
                                                    <option value="Buildings">Buildings</option>

                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="employeeFullName" className="form-label">Repair needed : </label>
                                                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                                    id="employeeFullName" defaultValue={Description} required
                                                    onChange={(e) => {
                                                        setDescription(e.target.value);
                                                    }} />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="employeeNameWithInitials" className="form-label">Cost of maintenance : </label>
                                                <input type="number" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                                    id="employeeNameWithInitials" defaultValue={others} required
                                                    onChange={(e) => {
                                                        setOthers(e.target.value);
                                                    }} />
                                            </div>

                                            <div className="mb-3">
                                                <label for="employeeType" className="form-label">Status : </label>
                                                <select class="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                                    id="employeeType" aria-label="Default select example" defaultValue={status} required
                                                    onChange={(e) => {
                                                        setStatus(e.target.value);
                                                    }}>
                                                    <option selected>Choose...</option>
                                                    <option value="Completed">Completed</option>
                                                    <option value="In progress">In progress</option>


                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="employeeDOB" className="form-label">Last Maintained Date : </label>
                                                <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                                    id="employeeDOB" defaultValue={lastMaintainedDate} required
                                                    onChange={(e) => {
                                                        setLastMaintainedDate(e.target.value);
                                                    }} />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="employeeDOB" className="form-label">Next Due : </label>
                                                <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                                    id="employeeDOB" defaultValue={nextServiceDate} required
                                                    onChange={(e) => {
                                                        setNextServiceDate(e.target.value);
                                                    }} />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="employeeNumber" className="text-md">Comment : </label>
                                                <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                                                    id="employeeNumber" defaultValue={name} required
                                                    onChange={(e) => {
                                                        setName(e.target.value);
                                                    }} />
                                            </div>





                                            <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Submit</button>
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

export default MaintenanceUpdate;
