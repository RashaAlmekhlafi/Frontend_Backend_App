import React from 'react';
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const fNameRef = useRef(null)
    const lNameRef = useRef(null)
    const navigate = useNavigate()

    const [Messg, setMessg] = useState(' ')
    const signup = () => {
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const fName = fNameRef.current.value
        const lName = lNameRef.current.value


        if (fName === ''|| lName === ''|| email === ''|| password === '') {
            setMessg('Please fill in all the fields')
        } else {
            fetch('http://localhost:3000/users/signup', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    firstName: fName,
                    lastName: lName
                }),
            })
                .then(response => response.json())
                .then(data => {
                    setMessg(data.message)
                    navigate('/Home')
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

            // setTimeout(() => {
            //     fNameRef.current.value && (fNameRef.current.value = '');
            //     lNameRef.current.value && (lNameRef.current.value = '');
            //     emailRef.current.value && (emailRef.current.value = '');
            //     passwordRef.current.value && (passwordRef.current.value = '');
            //     setMessg(' ')
            // }, 5000);
            // }
        }
    }

    return (

        <div className='container p-5'>
            <h3>Please Fill in Your Information </h3>

            <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input ref={fNameRef} type="text" className="form-control" id="firstName" name='firstName' />
            </div>
            <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input ref={lNameRef} type="text" className="form-control" id="lastName" name='lastName' />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input ref={emailRef} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input ref={passwordRef} type="password" className="form-control" id="exampleInputPassword1" name='password' />
            </div>
            <p className='text-success'>{Messg}</p>
            <button type="button" onClick={signup} className="btn btn-primary w-100">Signup</button>

        </div>
    )
}
export default Signup