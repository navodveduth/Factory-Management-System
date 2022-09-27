import { 
    SalesForm,
    SalesView,
    SalesUpdate,
    Home,
    HomeSharedLayout,
    SalesSharedLayout,
    InvoiceView
    
} from "../components"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function SalesAppRoutes() {           
    
  return (
    <>
    <Router>
        <Routes>
            <Route path = "/" element = {<HomeSharedLayout />}>
                    <Route index element = {<Home/>} />
            </Route>
            
            <Route path = "/sales" element = {<SalesSharedLayout />}>
                <Route index element = {<SalesView />}/>
                <Route path = "salesAdd" element = {<SalesForm/>} />
                <Route path = "salesUpdate/:id" element = {<SalesUpdate/>} />
                <Route path = "invoiceView/:id" element = {<InvoiceView/>} />
            </Route>


        </Routes>
    </Router>

    </>)
}

export default SalesAppRoutes;