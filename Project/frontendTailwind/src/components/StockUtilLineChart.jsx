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
        interval: 1000000,
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

    var addCnt = additions.length;
    var issueCnt = issues.length;
   
    //additions

    var janTotal1, febTotal1, marTotal1, aprTotal1, mayTotal1, junTotal1, julTotal1, augTotal1, sepTotal1, octTotal1, novTotal1, decTotal1;
    janTotal1 = febTotal1 = marTotal1 = aprTotal1 = mayTotal1 = junTotal1 = julTotal1 = augTotal1 = sepTotal1 = octTotal1 = novTotal1 = decTotal1 = 0;
    for (let index = 0; index < addCnt; index++) {
        console.log(new Date(additions[index].date).getMonth());
        switch (new Date(additions[index].date).getMonth()) {
            case (0):
                janTotal1 = janTotal1 + additions[index].totalValue;
                break;
            case (1):
                febTotal1 = febTotal1 + additions[index].totalValue;
                break;
            case (2):
                marTotal1 = marTotal1 + additions[index].totalValue;
                break;
            case (3):
                aprTotal1 = aprTotal1 + additions[index].totalValue;
                break;
            case (4):
                mayTotal1 = mayTotal1 + additions[index].totalValue;
                break;
            case (5):
                junTotal1 = junTotal1 + additions[index].totalValue;
                break;
            case (6):
                julTotal1 = julTotal1 + additions[index].totalValue;
                break;
            case (7):
                augTotal1 = augTotal1 + additions[index].totalValue;
                break;
            case (8):
                sepTotal1 = sepTotal1 + additions[index].totalValue;
                break;
            case (9):
                octTotal1 = octTotal1 + additions[index].totalValue;
                break;
            case (10):
                novTotal1 = (parseInt(novTotal1) + additions[index].totalValue);
                break;
            case (11):
                decTotal1 = decTotal1 + additions[index].totalValue;
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
                break;
            case (1):
                febTotal2 = febTotal2 + issues[index].totalValue;
                break;
            case (2):
                marTotal2 = marTotal2 + issues[index].totalValue;
                break;
            case (3):
                aprTotal2 = aprTotal2 + issues[index].totalValue;
                break;
            case (4):
                mayTotal2 = mayTotal2 + issues[index].totalValue;
                break;
            case (5):
                junTotal2 = junTotal2 + issues[index].totalValue;
                break;
            case (6):
                julTotal2 = julTotal2 + issues[index].totalValue;
                break;
            case (7):
                augTotal2 = augTotal2 + issues[index].totalValue;
                break;
            case (8):
                sepTotal2 = sepTotal2 + issues[index].totalValue;
                break;
            case (9):
                octTotal2 = octTotal2 + issues[index].totalValue;
                break;
            case (10):
                novTotal2 = (parseInt(novTotal2) + issues[index].totalValue);
                break;
            case (11):
                decTotal2 = decTotal2 + issues[index].totalValue;
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

    const colors = ['#FF8C00', '#c40bde']

    return (
        <>

            <ChartsHeader category="Chart" title="Stock Control Analysis" />
            <ChartComponent primaryXAxis={primaryXAxis} primaryYAxis={primaryYAxis} palettes={colors} tooltip={tooltip}
                background={currentMode === 'Dark' ? '#33373E' : '#f3f4f6'}>
                <Inject services={[LineSeries, Tooltip, DataLabel, Category]} />
                <SeriesCollectionDirective>
                    <SeriesDirective type="Line" dataSource={addData} xName="month" yName="additions" name="Stock Additions" marker={{ dataLable: { visible: true }, visible: true }} />
                    <SeriesDirective type="Line" dataSource={issueData} xName="month" yName="issues" name="Stock Issues" marker={{ dataLable: { visible: true }, visible: true }} />
                </SeriesCollectionDirective>

            </ChartComponent>

        </>
    )
}
