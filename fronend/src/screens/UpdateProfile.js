import React, { useEffect } from 'react';
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
    const UserId = useSelector((state) => state.auth.UserId)
    const emailRef = useRef(null)
    const UserNameRef = useRef(null)

    const fNameRef = useRef(null)
    const lNameRef = useRef(null)
    const navigate = useNavigate()
    const [PrevData, setPrevData] = useState()
    const [Messg, setMessg] = useState(' ')


    //previus data
    useEffect(() => {
        fetch(`http://localhost:3000/users/${UserId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(result => {
                setPrevData(result)
            })
            .catch(error => {
                console.error('Error:', error);
            });
        emailRef.current.value = PrevData?.Email
        UserNameRef.current.value = PrevData?.Username
        fNameRef.current.value = PrevData?.FirstName
        lNameRef.current.value = PrevData?.LastName
    }, [!PrevData])




    const updateProfile = () => {
        const email = emailRef.current.value
        const UserName = UserNameRef.current.value
        const fName = fNameRef.current.value
        const lName = lNameRef.current.value

        if (fName === '' || lName === '' || email === '' || UserName === '') {
            setMessg('Please fill in all the fields')
        } else {
            fetch(`http://localhost:3000/users/${UserId}`, {
                method: 'PUT', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                },
                body: JSON.stringify({
                    Email: email,
                    Username: UserName,
                    FirstName: fName,
                    LastName: lName
                }),
            })
                .then(response => response.json())
                .then(data => {
                    setMessg(data.message)
                    navigate('/profile')
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
                <label htmlFor="exampleInputUsername" className="form-label">UserName</label>
                <input ref={UserNameRef} type="text" className="form-control" id="exampleInputUsername" name='password' />
            </div>
            <p className='text-success'>{Messg}</p>
            <button type="button" onClick={updateProfile} className="btn btn-primary w-100">Save Changes</button>

        </div>
    )
}
export default UpdateProfile