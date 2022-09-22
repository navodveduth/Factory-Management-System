import React from "react";
import {saveAs} from "file-saver";
import axios from "axios";
import { renderMatches } from "react-router-dom";

export default function report(){
    
    state = {
        name: "",
        receiptId: 0,
        price1: 0,
        price2,
    }

    handleChange = ({ target: {value, name}}) => this.setState({[name]: value})
    createAndDownloadPdf = () => {
        axios.post("/create-pdf",this.state).then(()=> axios.get("fetch-pdf",{responseType: "blob"}))
        .then((res)=>{
            const pdfBlob = new Blob([res.data],{type: "application/pdf"})

            saveAs(pdfBlob, "newPdf/pdf");
        })
    }
    render();{
        return(
            <div className="container">
                <input type="text" placeholder="Name" name="name" onChange={this.handleChange}/>
                <input type="text" placeholder="Receipt ID" name="receiptId" onChange={this.handleChange}/>
                <input type="text" placeholder="Price 1" name="price1" onChange={this.handleChange}/>
                <input type="text" placeholder="Price 2" name="price2" onChange={this.handleChange}/>
                <button onClick={this.createAndDownloadPdf}>Download Pdf</button>
            </div>
        );
    }
}
