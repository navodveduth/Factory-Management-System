import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GoPrimitiveDot } from 'react-icons/go';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { FiUser } from 'react-icons/fi'
import { Stacked, Pie, Button, LineChart, SparkLine } from '../components';
import { earningData, dropdownData, SparklineAreaData, ecomPieChartData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';


const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
  </div>
);

const Ecommerce = () => {
  const { currentColor, currentMode } = useStateContext();

  return (
    <div className="mt-5">

      <div className="flex flex-wrap lg:flex-nowrap justify-left ml-16 mt-5">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">

          <button
            type="button"
            className="text-md text-white opacity-0.9 p-4 hover:drop-shadow-xl rounded-full m-1 te" 
            style={{ background: currentColor }} 
          >
             View All Employees
          </button>

          <button
            type="button"
            className="text-md text-white opacity-0.9 p-4 hover:drop-shadow-xl rounded-full m-1" 
            style={{ background: currentColor }} 
          >
             Create Employee
          </button>

        </div>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* small top boxes in the dashboard */} {/* use minimum 3, maximum 5 */}
          
            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                className="text-2xl text-white opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl" 
                style={{ background: currentColor }} 
              >
                <FiUser />
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">10</span>
              </p>
              <p className="text-sm text-gray-400  mt-1">Employees</p>
            </div>
            
            {/* ------------------------------------------------------------------------------------------------------- */}

            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                className="text-2xl text-white opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl" 
                style={{ background: currentColor }} 
              >
                <FiUser />
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">10</span>
              </p>
              <p className="text-sm text-gray-400  mt-1">Employees</p>
            </div>

            {/* ------------------------------------------------------------------------------------------------------- */}
            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                className="text-2xl text-white opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl" 
                style={{ background: currentColor }} 
              >
                <FiUser />
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">10</span>
              </p>
              <p className="text-sm text-gray-400  mt-1">Employees</p>
            </div>

            {/* ------------------------------------------------------------------------------------------------------- */}
            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                className="text-2xl text-white opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl" 
                style={{ background: currentColor }} 
              >
                <FiUser />
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">10</span>
              </p>
              <p className="text-sm text-gray-400  mt-1">Employees</p>
            </div>
            
                      
        </div>
      </div>

      <div className="flex gap-10 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Revenue Updates</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                <span>
                  <GoPrimitiveDot />
                </span>
                <span>Expense</span>
              </p>
              <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                <span>
                  <GoPrimitiveDot />
                </span>
                <span>Budget</span>
              </p>
            </div>
          </div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <div className=" border-r-1 border-color m-4 pr-10">
              <div>
                <p>
                  <span className="text-3xl font-semibold">$93,438</span>
                  <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                    23%
                  </span>
                </p>
                <p className="text-gray-500 mt-1">Budget</p>
              </div>
              <div className="mt-8">
                <p className="text-3xl font-semibold">$48,487</p>

                <p className="text-gray-500 mt-1">Expense</p>
              </div>

              <div className="mt-5">
                <SparkLine currentColor={currentColor} id="line-sparkLine" type="Line" height="80px" width="250px" data={SparklineAreaData} color={currentColor} />
              </div>
              <div className="mt-10">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Download Report"
                  borderRadius="10px"
                />
              </div>
            </div>
            <div>
              <Stacked currentMode={currentMode} width="320px" height="360px" />
            </div>
          </div>
        </div>
        <div>
          <div
            className=" rounded-2xl md:w-400 p-4 m-3"
            style={{ backgroundColor: currentColor }}
          >
            <div className="flex justify-between items-center ">
              <p className="font-semibold text-white text-2xl">Earnings</p>

              <div>
                <p className="text-2xl text-white font-semibold mt-8">$63,448.78</p>
                <p className="text-gray-200">Monthly revenue</p>
              </div>
            </div>

            <div className="mt-4">
              <SparkLine currentColor={currentColor} id="column-sparkLine" height="100px" type="Column" data={SparklineAreaData} width="320" color="rgb(242, 252, 253)" />
            </div>
          </div>

          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 flex justify-center items-center gap-10">
            <div>
              <p className="text-2xl font-semibold ">$43,246</p>
              <p className="text-gray-400">Yearly sales</p>
            </div>

            <div className="w-40">
              <Pie id="pie-chart" data={ecomPieChartData} legendVisiblity={false} height="160px" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-10 m-4 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
          <div className="flex justify-between items-center gap-2 mb-10">
            <p className="text-xl font-semibold">Sales Overview</p>
            <DropDown currentMode={currentMode} />
          </div>
          <div className="md:w-full overflow-auto">
            <LineChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
