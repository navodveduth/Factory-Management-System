import React from "react";
import "./App.css";
import ProdRoutes from "./routes/ProdAppRoutes";
import AppRoutes from './routes/AppRoutes';
import SalesRoutes from "./routes/SalesAppRoutes"
function App() {
  return (
    <div className="App">
      <SalesRoutes/>
    </div>
  );
}
export default App;
