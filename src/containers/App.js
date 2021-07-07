import React from "react";
import {BrowserRouter} from 'react-router-dom';
import Toplearn from "./Toplearn";

const App = props => {
    return (
        <BrowserRouter>
            <Toplearn />
        </BrowserRouter>
    );
}

export default App;