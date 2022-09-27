import React from "react";
import "./App.css";
import ProdRoutes from "./routes/ProdAppRoutes";
import AppRoutes from './routes/AppRoutes';
function App() {
  return (
    <div className="App">
      <AppRoutes />
      <ProdRoutes/>
    </div>
  );
}
export default App;
