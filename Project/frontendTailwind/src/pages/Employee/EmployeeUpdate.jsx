import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Header, Navbar, Footer, Sidebar, ThemeSettings } from '../../components';

import { useStateContext } from '../../contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

function EmployeeUpdate() {
    //useNavigate is a hook that is used to navigate to another page
    const navigate = useNavigate();

    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

    var date = new Date().toISOString().split('T')[0];

    const [employeeNumber, setEmployeeNumber] = useState('');
    const [employeeFullName, setEmployeeFullName] = useState('');
    const [employeeNameWithInitials, setEmployeeNameWithInitials] = useState('');
    const [employeeNIC, setEmployeeNIC] = useState('');
    const [employeeGender, setEmployeeGender] = useState('');
    const [employeeDOB, setEmployeeDOB] = useState('');
    const [employeeDateOfJoin, setEmployeeDateOfJoin] = useState('');
    const [employeeDesignation, setEmployeeDesignation] = useState('');
    const [employeeDepartment, setEmployeeDepartment] = useState('');
    const [employeeType, setEmployeeType] = useState('');
    const [employeeAddress, setEmployeeAddress] = useState('');
    const [employeeContactNumber, setEmployeeContactNumber] = useState('');
    const [employeeEmail, setEmployeeEmail] = useState('');

    const {id} = useParams(); //get the id from the url

    const getEmployee = () => {
        axios.get(`http://localhost:8070/employee/viewEmployee/${id}`)
        .then((res) => {
            const dob = new Date(res.data.employeeDOB).toISOString().split('T')[0];
            const doj = new Date(res.data.employeeDateOfJoin).toISOString().split('T')[0];
            setEmployeeNumber(res.data.employeeNumber);
            setEmployeeFullName(res.data.employeeFullName);
            setEmployeeNameWithInitials(res.data.employeeNameWithInitials);
            setEmployeeNIC(res.data.employeeNIC);
            setEmployeeGender(res.data.employeeGender);
            setEmployeeDOB(dob);
            setEmployeeDateOfJoin(doj);
            setEmployeeDesignation(res.data.employeeDesignation);
            setEmployeeDepartment(res.data.employeeDepartment);
            setEmployeeType(res.data.employeeType);
            setEmployeeAddress(res.data.employeeAddress);
            setEmployeeContactNumber(res.data.employeeContactNumber);
            setEmployeeEmail(res.data.employeeEmail);
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    useEffect(() => {
        getEmployee();
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
                                <Header category="Form" title="Update Employee" />
                                        <div className=" flex items-center justify-center">

                                            <form className="" onSubmit={async(e)=>{
                                                e.preventDefault();
                                                
                                                
                                                const newEmployee = {
                                                    employeeNumber,
                                                    employeeFullName,
                                                    employeeNameWithInitials,
                                                    employeeNIC,
                                                    employeeGender,
                                                    employeeDOB,
                                                    employeeDateOfJoin,
                                                    employeeDesignation,
                                                    employeeDepartment,
                                                    employeeType,
                                                    employeeAddress,
                                                    employeeContactNumber,
                                                    employeeEmail
                                                }

                                                await axios.put("http://localhost:8070/employee/updateEmployee/"+ id, newEmployee)
                                                    .then((res)=>{
                                                        Swal.fire({  
                                                            icon: 'success',
                                                            title: 'Data Successfully Updated',
                                                            color: '#f8f9fa',
                                                            background: '#6c757d',
                                                            showConfirmButton: false,
                                                            timer: 2000
                                                          })
                                                    navigate('/EmployeeViewAll');
                                                    })
                                                    .catch((err)=>{
                                                        console.log(err);
                                                        alert("Error occured");
                                                    })
                                                    
                                            }}>

                                                <div className="mb-3">
                                                    <label htmlFor="employeeNumber" className="text-md">Employee Number : </label>
                                                    <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                                        id="employeeNumber" defaultValue={employeeNumber} placeholder="Enter the employee number" 
                                                        pattern="[0-9]{4}" maxLength={4} title= {"The Employee Number requires a 4 digit number"} required 
                                                        onChange={(e)=>{
                                                            setEmployeeNumber(e.target.value);
                                                        }}/>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="employeeFullName" className="form-label">Full name : </label>
                                                    <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                                        id="employeeFullName" defaultValue={employeeFullName} placeholder="Enter your full name" required 
                                                        pattern="[A-Za-z ]{3,}" title= {"The Full Name requires a minimum of 3 characters"}
                                                        onChange={(e)=>{
                                                            setEmployeeFullName(e.target.value);
                                                        }}/>
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="employeeNameWithInitials" className="form-label">Name with initials : </label>
                                                    <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                                        id="employeeNameWithInitials" defaultValue={employeeNameWithInitials} placeholder="Enter your name with Initials" required 
                                                        
                                                        onChange={(e) =>{
                                                            setEmployeeNameWithInitials(e.target.value);
                                                        }}
                                                        pattern="[A-Za-z ]{3,}" title= {"The Name with Initials requires a minimum of 3 characters"}/>
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="employeeNIC" className="form-label">NIC number : </label>
                                                    <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                                        id="employeeNIC" defaultValue={employeeNIC} placeholder="Enter your NIC number" required 
                                                        pattern="[0-9vVxX]{12}" maxLength={12} title= {"The NIC number requires a 9 digit number and a letter at the end or a 12 digit number"}
                                                        onChange={(e) =>{
                                                            setEmployeeNIC(e.target.value);
                                                        }}/>
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="employeeGender" className="form-label">Gender : </label>
                                                    <select className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                                        id="employeeGender" value={employeeGender} aria-label="Default select example" required
                                                        onChange={(e) =>{
                                                            setEmployeeGender(e.target.value);
                                                        }}>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                    </select>
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="employeeDOB" className="form-label">Date of Birth : </label>
                                                    <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                                        id="employeeDOB" defaultValue={employeeDOB} placeholder="Enter your birthday"required 
                                                        max={date}
                                                        onChange={(e) =>{
                                                            setEmployeeDOB(e.target.value);
                                                        }}/>
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="employeeDateOfJoin" className="form-label">Date joined : </label>
                                                    <input type="date" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                                        id="employeeDateOfJoin" defaultValue={employeeDateOfJoin} placeholder="Enter your date of join"required
                                                        max={date}
                                                        onChange={(e) =>{
                                                            setEmployeeDateOfJoin(e.target.value);
                                                        }}/>
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="employeeDesignation" className="form-label">Designation : </label>
                                                    <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                                        id="employeeDesignation" defaultValue={employeeDesignation} placeholder="Enter your designation"required
                                                        pattern="[A-Za-z ]{3,}" title= {"The Designation requires a minimum of 3 characters"} 
                                                        onChange={(e) =>{
                                                            setEmployeeDesignation(e.target.value);
                                                        }}/>
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="employeeDepartment" className="form-label">Department : </label>
                                                    <select className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                                        id="employeeDepartment" value={employeeDepartment} placeholder="Enter your department"required
                                                        onChange={(e) =>{
                                                            setEmployeeDepartment(e.target.value);
                                                        }}>
                                                        <option value="Finance">Finance</option>
                                                        <option value="Sales">Sales</option>
                                                        <option value="Human Resources">Human Resources</option>
                                                        <option value="Production">Production</option>
                                                        <option value="Transportation">Transportation</option>
                                                        <option value="Maintenance">Maintenance</option>
                                                    </select>
                                                </div>

                                                <div className="mb-3">
                                                    <label for="employeeType" className="form-label">Employee Type : </label>
                                                    <select class="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                                    id="employeeType" aria-label="Default select example" value={employeeType} required
                                                    onChange={(e) =>{
                                                        setEmployeeType(e.target.value);
                                                    }}>
                                                        <option value="Executive">Executive</option>
                                                        <option value="Non-Executive">Non-Executive</option>
                                                    </select>
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="employeeAddress" className="form-label">Address : </label>
                                                        <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                                        id="employeeAddress" defaultValue={employeeAddress} placeholder="Enter your home address"required
                                                        pattern="[A-Za-z0-9 ,.-]{3,}" title= {"The Address requires a minimum of 3 characters"}
                                                        onChange={(e) =>{
                                                            setEmployeeAddress(e.target.value);
                                                        }}/>
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="employeeContactNumber" className="form-label">Contact Number : </label>
                                                    <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                                        id="employeeContactNumber" defaultValue={employeeContactNumber} placeholder="Enter your contact number"required
                                                        pattern="[0-9]{10}" maxLength={10} title= {"The Contact Number requires a 10 digit number"}
                                                        onChange={(e) =>{
                                                            setEmployeeContactNumber(e.target.value);
                                                        }}/>
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="employeeEmail" className="form-label">Email : </label>
                                                    <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                                        id="employeeEmail" defaultValue={employeeEmail} placeholder="Enter your email"required
                                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title= {"The Email requires a valid email address"}
                                                        onChange={(e) =>{
                                                            setEmployeeEmail(e.target.value);
                                                        }}/>
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

export default EmployeeUpdate;
