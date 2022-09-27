//exports the functions to App.js
import {
    StockAddForm,
    DamagedStockAddForm,
    HomeSharedLayout,
    StockSharedLayout,
    DamagedStockSharedLayout,
    StockView,
    StockUpdate,
    //StockDelete,
    Home,
    DamagedStockView,
    DamagedStockUpdate,
    //DamagedStockDelete,
    StockPDF,
    DStockPDF
} from "../components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//displays the application on browser and assigns the path for the pages
function StockAppRoutes() {

    return (
        <>

            <Router>
                <Routes>      
                                 
                    <Route path="/" element={<HomeSharedLayout />}>
                        <Route index element={<Home />} />
                    </Route>

                    <Route path="/stock" element={<StockSharedLayout />}>
                        <Route index element={<StockView />} />
                        <Route path="addStock" element={<StockAddForm />} />
                        <Route path="updateStock/:id" element={<StockUpdate />} />
                        <Route path="generatePDF" element={<StockPDF />} />
                    </Route>

                    <Route path="/damagedStock" element={<DamagedStockSharedLayout />}>
                        <Route index element={<DamagedStockView />} />
                        <Route path="addDamagedStock" element={<DamagedStockAddForm />} />
                        <Route path="updateDamagedStock/:id" element={<DamagedStockUpdate />} />
                        <Route path="generatePDF" element={<DStockPDF />} />
                    </Route>

                </Routes>
            </Router>

        </>)
}

//exports the function to App.js
export default StockAppRoutes;