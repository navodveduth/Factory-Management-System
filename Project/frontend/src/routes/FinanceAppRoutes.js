import {
    Home, 
    FinanceCreate,
    FinanceView,
    FinanceUpdate,
    FinanceSharedLayout,
    HomeSharedLayout

} from  "../components"
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import UserLogin from "../components/UserLoginForm";

function FinanceAppRoutes(){


    return(
                <>
            <Router>
                <Routes>

                    <Route path="/" element={<HomeSharedLayout/>}>
                        <Route index element={<Home/>} />

                    </Route>

                    <Route path="/finance" element={<FinanceSharedLayout />}>
                        <Route index element={<FinanceView />}/> 
                        <Route path="/finance/add" element={<FinanceCreate/>} />
                        <Route path="/finance/update/:id" element={<FinanceUpdate/>} />
                    </Route>

                    <Route path="/users" element={<UserLogin />}>
                        <Route index element={<UserLogin />}/> 
                    </Route>

              </Routes>
            </Router>
        </>)
}

export default FinanceAppRoutes

{/* <Route index element={<FinanceView />}/> */}

{/*                     <Route exact path= "/" element={<Home/>}/>
                    <Route path= "/add" element={<FinanceCreate/>}/>
                    <Route path= "/view" element={<FinanceView/>}/>
                    <Route path= "/update" element={<FinanceUpdate/>}/>
                </Routes> */}