import React from "react";
import {BrowserRouter} from 'react-router-dom';
import Toplearn from "./Toplearn";
import {ToastContainer} from "react-toastify";

const App = props => {
    return (
        <BrowserRouter>
            <Toplearn />

            <ToastContainer />
        </BrowserRouter>
    );
}

export default App;