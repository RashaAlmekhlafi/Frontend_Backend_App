import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';

const Profile = () => {
    const UserName = useSelector((state) => state.auth.UserName)
    const User_Id = useSelector((state) => state.auth.UserId)
    const Admin = useSelector((state) => state.auth.Admin)
    const [UserData, setUserData] = useState('')
    const [UserId, setUserId] = useState(0)
    const { pathname } = useLocation()
    const { id } = useParams()


    useEffect(() => {
        var UserId = 0
        if (pathname === `/admin-showUserProfile/${id}`) {
            UserId = id
        } else {
            UserId = User_Id
        }
        fetch(`http://localhost:3000/users/${UserId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(result => {
                setUserData(result)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [!UserData, !UserId])
    return (

        <div className='container p-5'>
            <div className='d-flex flex-column align-items-center'>
                <img src="https://icons.iconarchive.com/icons/aha-soft/people/256/user-icon.png"
                    className="rounded-circle z-depth-1-half avatar-pic" alt="example placeholder avatar" />
                <h3>{UserData?.FirstName} {UserData?.LastName} </h3>
            </div>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        {(Admin && UserData?.UserId!==User_Id) ? <></> :
                            <td className='d-flex justify-content-between'>Contact Information <Link to={`/edit-profile`} >Edit Profile</Link></td>
                        }

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Name: {UserData.FirstName} {UserData.LastName} </td>
                    </tr>
                    <tr>
                        <td>Email: {UserData.Email} </td>
                    </tr>

                    <tr>
                        <td>UserName: {UserData.Username}  </td>
                    </tr>
                </tbody>
            </table>
            <p className='text-sm'>The Account was first created at <span className='text-primary'>{UserData.createdAt?.split('T')[0]}</span> </p>
            <p className='text-sm'>The last update was at <span className='text-primary'>{UserData.updatedAt?.split('T')[0]}</span></p>


        </div >
    )
}
export default Profile