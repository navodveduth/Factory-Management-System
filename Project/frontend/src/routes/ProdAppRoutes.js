import ProdHeader from "../Components/Production/ProdHeader";
import AddOrder from "../Components/Production/CreateOrder";
import AllOrders from "../Components/Production/AllOrders";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateOrder from "../Components/Production/UpdateOrder";

export default function ProdRoutes(){
    return(
        <BrowserRouter>
            <ProdHeader/>
            <Routes>
                <Route path='/production/order/addOrder' element={<AddOrder/>}/>
                <Route path='/production/order/allOrders' element={<AllOrders/>}/>
                <Route path='/production/order/update/:id' element={<UpdateOrder/>}/>
            </Routes>
        </BrowserRouter>

    )
}
