import React from 'react';
import './login.css'
import { useRef, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const [Messg, setMessg] = useState(' ')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const login = () => {
        const email = emailRef.current.value
        const password = passwordRef.current.value
        if (email === '' || password === '') {
            setMessg('Please fill in all the fields')
        } else {
            fetch('http://localhost:3000/users/login', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            })
            .then(response => response.json())
            .then(result => {
                if (!result.success) {
                    confirmAlert({
                        message: result.message,
                        buttons: [
                            {
                                label: 'cansel',
                                onClick: () => ' '
                            }]
                    })
                } else {
                    setMessg(' ')
                    window.localStorage.setItem('token', result.token);
                    // props.updateToken(result.token)
                    dispatch({
                        type: "login",
                        payload:[result.UserName,result.UserId,result.Admin]
                    })

                    navigate('/Home')

                }


            })


        }
    }
    return (

        <div className='container p-5 '>
            <div className='row'>
                <div className='col-7 p-5'>
                    <h1 className='welcome '>Wellcome to OurWebsiste</h1>
                    <p>Lorem ipsum amet recusandae est quia repellat eum voluptatem voluptatibus vel galisum quibusdam id dolores maiores. Et facilis suscipit et modi beatae sit assumenda asperiores ex laboriosam architecto ea temporibus sint sed internos minima aut pariatur eveniet. Est cupiditate minus ex quis dolorem error quis nam molestiae accusantium et eveniet voluptatem rem dicta minus.</p>
                </div>
                <div className='col-5 login d-flex flex-column justify-content-center'>
                    <h3>Please Login</h3>
                    <>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input ref={emailRef} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input ref={passwordRef} type="password" className="form-control" id="exampleInputPassword1" name='password' />
                        </div>
                    </>
                    <p className='text-danger'>{Messg}</p>
                    <button type="button" onClick={login} className="btn btn-primary">Login</button>
                    <a href='#' className='text-success fs-6'><p className='text-success'>Forget password</p></a>
                    <span>If you do not have an acount please signup <Link to='/signup'>here</Link> </span>
                </div>
            </div>

            

        </div>
    )
}
export default Login