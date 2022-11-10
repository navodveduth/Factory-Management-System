import { React, useState, useEffect } from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import ChartsHeader from './ChartsHeader'
import axios from 'axios'
import { ChartComponent, LineSeries, Legend, Tooltip, DataLabel, Category, Inject, SeriesCollectionDirective, SeriesDirective } from '@syncfusion/ej2-react-charts';

export default function StockUtilLineChart() {

    const [stockUtil, setStockUtil] = useState([]);
    const [additions, setAdditions] = useState([]);
    const [issues, setIssues] = useState([]);
    const { currentMode } = useStateContext();

    const tooltip = { enable: true, shared: false };

    const primaryYAxis = {
        labelFormat: '{value}LKR',
        title: "Stock Valuation",
        labelStyle: {
            color: currentMode === 'Dark' ? '#e9ecef' : '#343a40'
        },
        titleStyle: {
            color: currentMode === 'Dark' ? '#e9ecef' : '#343a40',
            fontSize: '16px'
        },
        interval: 100000,
    };

    const primaryXAxis = {
        valueType: 'Category',
        title: "Month",
        labelStyle: {
            color: currentMode === 'Dark' ? '#e9ecef' : '#343a40'
        },
        titleStyle: {
            color: currentMode === 'Dark' ? '#e9ecef' : '#343a40',
            fontSize: '16px'
        }
    };



    const getStockUtil = async () => {  //getMaintainence is the function to get the data from the backend
       await axios.get("http://localhost:8070/stockUtilisation")
            .then((res) => {
                setStockUtil(res.data); //setMaintainence  is used to update the state variable

            })
            .catch((err) => {
                alert(err.message);
            })
    }

    useEffect(() => { //useEffect is used to call the function getMaintainence 
        getStockUtil();
    }, [])




    const getAdditions = async () => {  //getMaintainence is the function to get the data from the backend
        await axios.get("http://localhost:8070/stockUtilisation/type/" + "Additions")
            .then((res) => {
                setAdditions(res.data); //setMaintainence  is used to update the state variable

            })
            .catch((err) => {
                alert(err.message);
            })
    }


    useEffect(() => {
        getAdditions();
    }, []);




    const getIssues = async () => {  //getMaintainence is the function to get the data from the backend
        axios.get("http://localhost:8070/stockUtilisation/type/" + "Issues")
            .then((res) => {
                setIssues(res.data); //setMaintainence  is used to update the state variable

            })
            .catch((err) => {
                alert(err.message);
            })
    }


    useEffect(() => {
        getIssues();

    }, []);

    var utilCnt = stockUtil.length;
    var addCnt = additions.length;
    var issueCnt = issues.length;

    //total addition and issue

    var janUtil = 0;
    var febUtil =0;
    var marUtil =0;
    var aprUtil =0;
    var mayUtil = 0;
    var junUtil =0;
    var julUtil = 0;
    var augUtil =0;
    var sepUtil = 0;
    var octUtil =0 ;
    var novUtil=0;
    var decUtil = 0;

    // console.log(novUtil);

     //total addition and issue

     var janTotal, febTotal, marTotal, aprTotal, mayTotal, junTotal, julTotal, augTotal, sepTotal, octTotal, novTotal, decTotal;
     janTotal = febTotal = marTotal = aprTotal = mayTotal = junTotal = julTotal = augTotal = sepTotal = octTotal = novTotal = decTotal = 0;
     for (let index = 0; index < utilCnt; index++) {
         console.log(new Date(stockUtil[index].date).getMonth());
         switch (new Date(stockUtil[index].date).getMonth()) {
             case (0):
                 if (stockUtil[index].type === "Additions")
                     janTotal = janTotal + stockUtil[index].totalValue;
                 else
                     janTotal = janTotal - stockUtil[index].totalValue;
                 break;
             case (1):
                 if (stockUtil[index].type === "Additions")
                     febTotal = febTotal + stockUtil[index].totalValue;
                 else
                     febTotal = febTotal - stockUtil[index].totalValue;
                 break;
             case (2):
                 if (stockUtil[index].type === "Additions")
                     marTotal = marTotal + stockUtil[index].totalValue;
                 else
                     marTotal = marTotal - stockUtil[index].totalValue;
                 break;
             case (3):
                 if (stockUtil[index].type === "Additions")
                     aprTotal = aprTotal + stockUtil[index].totalValue;
                 else
                     aprTotal = aprTotal - stockUtil[index].totalValue;
                 break;
             case (4):
                 if (stockUtil[index].type === "Additions")
                     mayTotal = mayTotal + stockUtil[index].totalValue;
                 else
                     mayTotal = mayTotal - stockUtil[index].totalValue;
                 break;
             case (5):
                 if (stockUtil[index].type === "Additions")
                     junTotal = junTotal + stockUtil[index].totalValue;
                 else
                     junTotal = junTotal - stockUtil[index].totalValue;
                 break;
             case (6):
                 if (stockUtil[index].type === "Additions")
                     julTotal = julTotal + stockUtil[index].totalValue;
                 else
                     julTotal = julTotal - stockUtil[index].totalValue;
                 break;
             case (7):
                 if (stockUtil[index].type === "Additions")
                     augTotal = augTotal + stockUtil[index].totalValue;
                 else
                     augTotal = augTotal - stockUtil[index].totalValue;
                 break;
             case (8):
                 if (stockUtil[index].type === "Additions")
                     sepTotal = sepTotal + stockUtil[index].totalValue;
                 else
                     sepTotal = sepTotal - stockUtil[index].totalValue;
                 break;
             case (9):
                 if (stockUtil[index].type === "Additions")
                     octTotal = octTotal + stockUtil[index].totalValue;
                 else
                     octTotal = octTotal - stockUtil[index].totalValue;
                 break;
             case (10):
                 if (stockUtil[index].type === "Additions")
                     novTotal = (parseInt(novTotal) + stockUtil[index].totalValue);
                 else
                     novTotal = (parseInt(novTotal) - stockUtil[index].totalValue);
                 break;
             case (11):
                 if (stockUtil[index].type === "Additions")
                     decTotal = decTotal + stockUtil[index].totalValue;
                 else
                     decTotal = decTotal - stockUtil[index].totalValue;
                 break;
             default:
                 break;
         }
     }
 
     console.log(novTotal);
 
     let data = [
         { month: 'Jan', stockUtil: janTotal }, { month: 'Feb', stockUtil: febTotal },
         { month: 'Mar', stockUtil: marTotal }, { month: 'Apr', stockUtil: aprTotal },
         { month: 'May', stockUtil: mayTotal }, { month: 'Jun', stockUtil: junTotal },
         { month: 'Jul', stockUtil: julTotal }, { month: 'Aug', stockUtil: augTotal },
         { month: 'Sep', stockUtil: sepTotal }, { month: 'Oct', stockUtil: octTotal },
         { month: 'Nov', stockUtil: parseInt(novTotal) }, { month: 'Dec', stockUtil: decTotal }
     ];
 
   
    //additions

    var janTotal1, febTotal1, marTotal1, aprTotal1, mayTotal1, junTotal1, julTotal1, augTotal1, sepTotal1, octTotal1, novTotal1, decTotal1;
    janTotal1 = febTotal1 = marTotal1 = aprTotal1 = mayTotal1 = junTotal1 = julTotal1 = augTotal1 = sepTotal1 = octTotal1 = novTotal1 = decTotal1 = 0;
    for (let index = 0; index < addCnt; index++) {
        console.log(new Date(additions[index].date).getMonth());
        switch (new Date(additions[index].date).getMonth()) {
            case (0):
                janTotal1 = janTotal1 + additions[index].totalValue;
                janUtil += janTotal1
                break;
            case (1):
                febTotal1 = febTotal1 + additions[index].totalValue;
                febUtil += febTotal1
                break;
            case (2):
                marTotal1 = marTotal1 + additions[index].totalValue;
                marUtil += marTotal1
                break;
            case (3):
                aprTotal1 = aprTotal1 + additions[index].totalValue;
                aprUtil += aprUtil
                break;
            case (4):
                mayTotal1 = mayTotal1 + additions[index].totalValue;
                mayUtil += mayTotal1
                break;
            case (5):
                junTotal1 = junTotal1 + additions[index].totalValue;
                junUtil += junTotal1
                break;
            case (6):
                julTotal1 = julTotal1 + additions[index].totalValue;
                julUtil += julTotal1
                break;
            case (7):
                augTotal1 = augTotal1 + additions[index].totalValue;
                augUtil += augTotal1
                break;
            case (8):
                sepTotal1 = sepTotal1 + additions[index].totalValue;
                sepUtil += sepTotal1
                break;
            case (9):
                octTotal1 = octTotal1 + additions[index].totalValue;
                octUtil += octTotal1
                break;
            case (10):
                novTotal1 = (parseInt(novTotal1) + additions[index].totalValue);
                novUtil += novTotal1
                break;
            case (11):
                decTotal1 = decTotal1 + additions[index].totalValue;
                decUtil += decTotal1
                break;
            default:
                break;
        }
    }



    let addData = [
        { month: 'Jan', additions: janTotal1 }, { month: 'Feb', additions: febTotal1 },
        { month: 'Mar', additions: marTotal1 }, { month: 'Apr', additions: aprTotal1 },
        { month: 'May', additions: mayTotal1 }, { month: 'Jun', additions: junTotal1 },
        { month: 'Jul', additions: julTotal1 }, { month: 'Aug', additions: augTotal1 },
        { month: 'Sep', additions: sepTotal1 }, { month: 'Oct', additions: octTotal1 },
        { month: 'Nov', additions: parseInt(novTotal1) }, { month: 'Dec', additions: decTotal1 }
    ];


    //issues
    var janTotal2, febTotal2, marTotal2, aprTotal2, mayTotal2, junTotal2, julTotal2, augTotal2, sepTotal2, octTotal2, novTotal2, decTotal2;
    janTotal2 = febTotal2 = marTotal2 = aprTotal2 = mayTotal2 = junTotal2 = julTotal2 = augTotal2 = sepTotal2 = octTotal2 = novTotal2 = decTotal2 = 0;
    for (let index = 0; index < issueCnt; index++) {
        console.log(new Date(issues[index].date).getMonth());
        switch (new Date(issues[index].date).getMonth()) {
            case (0):
                janTotal2 = janTotal2 + issues[index].totalValue;
                janUtil -= janTotal2
                break;
            case (1):
                febTotal2 = febTotal2 + issues[index].totalValue;
                febUtil -= febTotal2
                break;
            case (2):
                marTotal2 = marTotal2 + issues[index].totalValue;
                marUtil -= marTotal2
                break;
            case (3):
                aprTotal2 = aprTotal2 + issues[index].totalValue;
                aprUtil -= aprTotal2
                break;
            case (4):
                mayTotal2 = mayTotal2 + issues[index].totalValue;
                mayUtil -= marTotal2
                break;
            case (5):
                junTotal2 = junTotal2 + issues[index].totalValue;
                junUtil -= junTotal2
                break;
            case (6):
                julTotal2 = julTotal2 + issues[index].totalValue;
                julUtil -= julTotal2
                break;
            case (7):
                augTotal2 = augTotal2 + issues[index].totalValue;
                augUtil -= augTotal2
                break;
            case (8):
                sepTotal2 = sepTotal2 + issues[index].totalValue;
                sepUtil -= sepTotal2
                break;
            case (9):
                octTotal2 = octTotal2 + issues[index].totalValue;
                octUtil -= octTotal2
                break;
            case (10):
                novTotal2 = (parseInt(novTotal2) + issues[index].totalValue);
                novUtil -= novTotal2
                break;
            case (11):
                decTotal2 = decTotal2 + issues[index].totalValue;
                decUtil -= decTotal2
                break;
            default:
                break;
        }
    }

    console.log(novTotal2);

    let issueData = [
        { month: 'Jan', issues: janTotal2 }, { month: 'Feb', issues: febTotal2 },
        { month: 'Mar', issues: marTotal2 }, { month: 'Apr', issues: aprTotal2 },
        { month: 'May', issues: mayTotal2 }, { month: 'Jun', issues: junTotal2 },
        { month: 'Jul', issues: julTotal2 }, { month: 'Aug', issues: augTotal2 },
        { month: 'Sep', issues: sepTotal2 }, { month: 'Oct', issues: octTotal2 },
        { month: 'Nov', issues: parseInt(novTotal2) }, { month: 'Dec', issues: decTotal2 }
    ];

    

    // let data = [
    //     { month: 'Jan', stockUtil: janUtil }, { month: 'Feb', stockUtil: febUtil },
    //     { month: 'Mar', stockUtil: marUtil }, { month: 'Apr', stockUtil: aprUtil },
    //     { month: 'May', stockUtil: mayUtil }, { month: 'Jun', stockUtil: junUtil },
    //     { month: 'Jul', stockUtil: julUtil }, { month: 'Aug', stockUtil: augUtil },
    //     { month: 'Sep', stockUtil: sepUtil }, { month: 'Oct', stockUtil: octUtil },
    //     { month: 'Nov', stockUtil: parseInt(novUtil) }, { month: 'Dec', stockUtil: decUtil }
    // ];
     console.log("Data" ,data)
    return (
        <>

            <ChartsHeader category="Chart" title="Stock Control Analysis" />
            <ChartComponent primaryXAxis={primaryXAxis} primaryYAxis={primaryYAxis} tooltip={tooltip}
                background={currentMode === 'Dark' ? '#33373E' : '#f3f4f6'}>

                <Inject services={[LineSeries, Tooltip, DataLabel, Category]} />
                <SeriesCollectionDirective>
                    <SeriesDirective type="Line" dataSource={data} xName="month" yName="total" name="Total Additions and Issues" marker={{ dataLable: { visible: true }, visible: true }} />
                    <SeriesDirective type="Line" dataSource={addData} xName="month" yName="additions" name="Stock Additions" marker={{ dataLable: { visible: true }, visible: true }} />
                    <SeriesDirective type="Line" dataSource={issueData} xName="month" yName="issues" name="Stock Issues" marker={{ dataLable: { visible: true }, visible: true }} />
                </SeriesCollectionDirective>

            </ChartComponent>

        </>
    )
}
