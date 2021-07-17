import React, {useEffect} from "react";
import {Switch, Route} from 'react-router-dom';

import Course from "../components/Course/Course";
import MainLayout from "../components/Layouts/MainLayout";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Archive from "../components/Course/Archive";
import Single from "../components/Course/Single";
import {useDispatch, useSelector} from "react-redux";
import {paginate} from "../utils/paginate";
import {addUser, clearUser} from "../actions/user";
import {decodeToken} from "../utils/decodeToken";
import Logout from "../components/Login/Logout";
import UserProfile from "../components/Profile/UserProfile";
import {isEmpty} from "lodash";
import {Redirect} from "react-router";


const Toplearn = props => {
    const courses = useSelector(state => state.courses);
    const indexCourses = paginate(courses, 1, 8);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = decodeToken(token);
            const dateNow = Date.now() / 1000;

            if (decodedToken.payload.exp < dateNow) {
                localStorage.removeItem('token');
                dispatch(clearUser());
            } else {
                dispatch(addUser(decodedToken.payload.user));
            }
        }
    }, []);

    return (
        <MainLayout >
            <Switch>
                <Route path="/login"  component={Login}/>
                <Route path="/logout"  render={() => isEmpty(user) ? <Redirect to='/' /> : <Logout />}/>
                <Route path="/register" component={Register}/>
                <Route path="/archive" component={Archive}/>
                <Route path="/profile" component={UserProfile}/>
                <Route path="/course/:id" component={Single}/>
                <Route path="/" exact render={() => <Course courses={indexCourses} />}/>
            </Switch>
        </MainLayout>
    );
};

export default Toplearn;
