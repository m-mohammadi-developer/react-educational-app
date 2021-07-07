import React from "react";
import {Switch, Route} from 'react-router-dom';

import Course from "../components/Course/Course";
import MainLayout from "../components/Layouts/MainLayout";
import Login from "../components/Login/Login";

const Toplearn = props => {
    return (
        <MainLayout >
            <Switch>
                <Route path="/login"  component={Login}/>
                <Route path="/" exact component={Course}/>
            </Switch>
        </MainLayout>
    );
};

export default Toplearn;
