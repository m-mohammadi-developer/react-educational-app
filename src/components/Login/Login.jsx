import React, {useState} from "react";
import {withRouter} from 'react-router-dom';
import {loginUser} from "../../services/userService";
import {toast} from "react-toastify";


const Login = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const resetStates = () => {
        setEmail('');
        setPassword('');
    };

    const handleSubmit = async event => {
        event.preventDefault();
        const user = {email, password};
        try {
            const {status, data} = await loginUser(user);
            if (status === 200) {
                toast.success('ورود موفقیت آمیز بود', {position: 'top-right', closeOnClick: true});
                console.log(data);
                localStorage.setItem('token', data.token);
                history.replace('/');
                resetStates();
            }

        } catch (ex) {
            toast.error('مشکلی پیش آمد', {position: 'top-right', closeOnClick: true});
            console.log(ex);
        }



    };

    return (
        <main className="client-page">
            <div className="container-content">

                <header><h2> ورود به سایت </h2></header>

                <div className="form-layer">

                    <form onSubmit={handleSubmit}>

                        <div className="input-group">
                            <span className="input-group-addon" id="email-address">
                                <i className="zmdi zmdi-email"></i>
                            </span>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="ایمیل"
                                aria-describedby="email-address"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <span className="input-group-addon" id="password"><i className="zmdi zmdi-lock"></i></span>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="رمز عبور "
                                aria-describedby="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="remember-me">
                            <label><input type="checkbox" name=""/> مرا بخاطر بسپار </label>
                        </div>

                        <div className="link">
                            <a href=""> <i className="zmdi zmdi-lock"></i> رمز عبور خود را فراموش کرده ام !</a>
                            <a href=""> <i className="zmdi zmdi-account"></i> عضویت در سایت </a>
                        </div>

                        <button className="btn btn-success"> ورود به سایت</button>

                    </form>
                </div>

            </div>
        </main>
    );
}

export default withRouter(Login);