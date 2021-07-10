import React, {useEffect, useRef, useState} from 'react';
import SimpleReactValidator from "simple-react-validator";
import axios from 'axios';
import {toast} from "react-toastify";
import {registerUser} from "../../services/userService";
import {Sugar} from "react-preloaders";
import {Helmet} from "react-helmet";

const Register = ({history}) => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [policy, setPolicy] = useState();
    const [loading, setLoading] = useState(false);


    const [, forceUpdate] = useState();
    const validator = useRef(new SimpleReactValidator({
        messages: {
            required: "پر کردن این فیلد الزامی است",
            min: "کمتر از 5 کاراکتر نباید باشد",
            email: 'ایمیل نوشته شده صحیح نمی باشد'
        },
        element: message => <div style={{color: 'red'}}>{message}</div>
    }));


    useEffect(() => {
        document.title = 'عضویت در سایت';
    }, []);





    const resetStates = () => {
        setFullname('');
        setEmail('');
        setPassword('');
    };

    const handleSubmit = async event => {
        event.preventDefault();
        const user = {
            fullname,
            email,
            password
        };
        // send user to server
        try {
            if (validator.current.allValid()) {
                setLoading(true);
                const {status} = await registerUser(user);
                if (status === 201) {
                    toast.success('کاربر با موفقیت ساخته شد', {position: 'top-right', closeOnClick: true});
                    resetStates();
                    history.push('/login');
                }
                setLoading(false);
            } else {
                validator.current.showMessages();
                forceUpdate(1);
                setLoading(false);
            }

        } catch (ex) {
            toast.error('مشکلی پیش آمد', {position: 'top-right', closeOnClick: true});
            console.log(ex);
        }
    };


    return (
        <main className="client-page">
            <div className="container-content">

                <header><h2> عضویت در سایت </h2></header>

                {loading ? (<Sugar time={0.1} color="#fc03d7" customLoading={loading} />) : null}


                <div className="form-layer">

                    <form onSubmit={handleSubmit}>

                        <div className="input-group">
                            <span className="input-group-addon" id="username"><i
                                className="zmdi zmdi-account"></i></span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="نام و نام خانوادگی"
                                aria-describedby="username"
                                name="fullname"
                                value={fullname}
                                onChange={e => {
                                    setFullname(e.target.value);
                                    validator.current.showMessageFor('fullname');
                                }}
                            />
                            {validator.current.message(
                                'fullname',
                                fullname,
                                'required|min:5')
                            }
                        </div>

                        <div className="input-group">
                            <span className="input-group-addon" id="email-address"><i
                                className="zmdi zmdi-email"></i></span>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="ایمیل"
                                aria-describedby="email-address"
                                value={email}
                                onChange={e => {
                                    setEmail(e.target.value);
                                    validator.current.showMessageFor('email')
                                }}
                            />
                            {validator.current.message(
                                'email',
                                email,
                                'required|email')
                            }
                        </div>

                        <div className="input-group">
                            <span className="input-group-addon" id="password"><i className="zmdi zmdi-lock"></i></span>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="رمز عبور "
                                aria-describedby="password"
                                value={password}
                                onChange={e => {
                                    setPassword(e.target.value);
                                    validator.current.showMessageFor('password');
                                }}
                            />
                            {validator.current.message(
                                'password',
                                password,
                                'required|min:5')
                            }
                        </div>

                        <div className="accept-rules">
                            <label><input
                                type="checkbox"
                                name="policy"
                                value={policy}
                                onChange={e => {
                                    setPolicy(e.currentTarget.checked);
                                    validator.current.showMessageFor('policy')
                                }}
                            /> قوانین و مقررات سایت را میپذیرم </label>
                            {validator.current.message(
                                'policy',
                                policy,
                                'required')
                            }
                        </div>

                        <div className="link">
                            <a href=""> <i className="zmdi zmdi-assignment"></i> قوانین و مقررات سایت !</a>
                            <a href=""> <i className="zmdi zmdi-account"></i> ورود به سایت </a>
                        </div>

                        <button className="btn btn-success"> عضویت در سایت</button>

                    </form>
                </div>

            </div>
        </main>
    );
}


export default Register;