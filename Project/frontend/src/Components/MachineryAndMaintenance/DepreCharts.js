import React ,{ useState, useEffect} from "react";
import  Chart  from "react-apexcharts";
import axios from "axios";


function DepreCharts()
{

    const [maintainence, setMaintainence] = useState([]); //maintainence is the state variable and setMaintainence is the function to update the state variable
    const [searchTerm, setSearchTerm] = useState("");
    var TotalCost = 0;

    const getMaintainence = async () => {  //getMaintainence is the function to get the data from the backend
        axios.get("http://localhost:8070/maintainence/")
        .then((res) => { 
            setMaintainence (res.data); //setMaintainence  is used to update the state variable
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    useEffect(() => { //useEffect is used to call the function getMaintainence 
        getMaintainence ();
    }, [])

   

 

    return(
        <React.Fragment>
            <div className="container-fluid mb-3">
              
                <Chart 
                type="pie"
                width={1349}
                height={550}

                series={[44, 55, 41, 17, 15,55,67, 45,47, 12, 10,52]}                

                options={{
                        title:{ text:"Machinery depreciation PieChart"
                        } , 
                       noData:{text:"Empty Data"},                        
                      // colors:["#f90000","#f0f"],
                      labels:["Jan", "Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"],                    

                 }}
                >
                </Chart>
            </div>
        </React.Fragment>
    );
}
export default DepreCharts;