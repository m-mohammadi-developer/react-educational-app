import React from "react";
import {NavLink, withRouter} from 'react-router-dom';


const TopNav = props => {
    const { pathname } = props.location;
    return (
        <nav>
            <div className="row">
                <div className="col-sm-6 col-xs-12">
                    <ul>
                        <li>
                            <NavLink to="/" exact activeStyle={{color: "lime"}}> صفحه اصلی </NavLink>
                            <a href=""> درباره ما </a>
                            <a href=""> تماس با ما </a>
                        </li>
                    </ul>
                </div>
                <div className="col-sm-6 col-xs-12">
                    <div className="clientarea">

                        {pathname == '/account' ?
                            <div className="loggein ">
                                <i className="zmdi zmdi-account"></i>
                                <NavLink to="/account"> خوش آمدی </NavLink>
                            </div>
                            :
                            <div className="signin">
                                <i className="zmdi zmdi-account"></i>
                                <NavLink to="/login" activeStyle={{color: "lime"}}> ورود </NavLink> /
                                <NavLink to="/register" activeStyle={{color: "lime"}}> عضویت </NavLink>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default withRouter(TopNav);