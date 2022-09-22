import ProdHeader from "../Components/Production/ProdHeader";
import AddOrder from "../Components/Production/CreateOrder";

import { BrowserRouter, Routes, Route } from "react-router-dom";
export default function ProdRoutes(){
    return(
        <BrowserRouter>
            <ProdHeader/>
            <Routes>
                <Route path='/addOrder' element={<AddOrder/>}/>
            </Routes>
        </BrowserRouter>

    )
}
