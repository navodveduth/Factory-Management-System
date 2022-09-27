import { 
    MachineryForm,
    MaintainenceForm,
    Home,
    MachineryView,
    HomeSharedLayout,
    MachinerySharedLayout,
    MaintainenceSharedLayout,
    MachineryUpdate,
    MaintainenceView,
    MaintainenceUpdate
} from "../components/index.js"

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";



function AppRoutes() {
    
  return (
    <>
    <Router>
        <Routes>

            <Route path="/" element={<HomeSharedLayout />}>
                <Route index element={<Home/>} />
            </Route>

            <Route path="/machinery" element={<MachinerySharedLayout />}>
                <Route index element={<MachineryView />}/>
                <Route path="machineryAdd" element={<MachineryForm/>} />
                <Route path="machineryUpdate/:id" element={<MachineryUpdate/>} />
            </Route>

            <Route path="/maintainence" element={<MaintainenceSharedLayout />}>
                <Route index element={<MaintainenceView />}/>
                <Route path="maintainenceAdd" element={<MaintainenceForm/>} />
                <Route path="maintainenceUpdate/:id" element={<MaintainenceUpdate/>} />
            </Route>

        </Routes>
    </Router>

    </>)
}

export default AppRoutes