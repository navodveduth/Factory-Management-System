import React from "react";
import "./App.css";
import ProdRoutes from "./routes/ProdAppRoutes";
import {saveAs} from "file-saver";

function App(){
  return(
    <div className="Container">
      <ProdRoutes/>
    </div>
  );
}
export default App;
