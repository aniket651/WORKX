import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config.js'
import PropTypes from "prop-types";
import './loginBox.css';
const apiUrl = config.apiRootUrl;

const Login = (props) => {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [isloggedIn, setIsLoggedIn] = useState(false);


    const navigate = useNavigate();

    useEffect(() => {
        if (props.loggedIn) {
          navigate('/Dashboard');
            // navigate(-1);
        }
    }, [props.loggedIn,navigate]);

    // console.log(props.loggedIn);

    useEffect(()=>{
        if(localStorage.getItem('loggedIn')){
            navigate('/Dashboard');
        }

    }, [navigate])
    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(e);

        //send post request to the login endpoint
        try {
            const res = await axios.post(apiUrl+"/auth/login",{
                "username": userName,
                "password": password
            })
            console.log(res.data);
            if(res.status === 200){
                console.log("status:200, inside handleSubmit for login, calling props.fxn to set loggedIn to true");
                const { token } = res.data;
                localStorage.setItem('token', token);
                localStorage.setItem('loggedIn',true);
                localStorage.setItem('username',userName);
                // setIsLoggedIn(true);
                props.fxn();
                // navigate("/Dashboard");
            }
            
        } catch (error) {
            console.log(error);
        }

        

    }

    return (
        <div className='box'>
            <div className='headline'>
                <span>Login</span>
            </div>
            <div className='form'>
                <form className='myform' onSubmit={handleSubmit}>
                    <div className='sub-box'>
                        <label htmlFor='username'>Username</label>
                        <br />
                        <input
                            id='username'
                            name='username'
                            // type='email'
                            required
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <br />
                    </div>

                    <div className='sub-box'>
                        <label htmlFor='password'>Password</label>
                        <br />
                        <input
                            id='password'
                            type='password'
                            name='password'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <br />
                        <div className='forgot-password'>
                            <a href='' aria-label='Click here if you forgot your password'>
                                forgot password
                            </a>
                        </div>
                    </div>
                    <div className='button-box'>
                        <input type='submit' id='inputbutton' value='Login' aria-label='click here to login' />
                        <span> Don't have an account yet? </span>
                        <span className='register'>
                            <a href='' aria-label='Click here to Register as a new user'>
                                Register
                            </a>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}

// Login.propTypes = {
//     loginPressed: PropTypes.func.isRequired,
//     loggedIn: PropTypes.bool.isRequired,
//   };
export default Login