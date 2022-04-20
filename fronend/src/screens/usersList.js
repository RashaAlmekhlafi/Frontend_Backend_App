import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ShowUser from '../components/ShowUser'

const UsersList = () => {
    const [usersData, setUsersData] = useState([])
    const [Messg, setMessg] = useState([])
    const [IsDeleted, setIsDeleted] = useState('Allusers')
   
    const UserId = useSelector((state) => state.auth.UserId)
    
     
    useEffect(() => {
        fetchUser()
    },[IsDeleted])
    const fetchUser= () => {
        fetch(`http://localhost:3000/users?IsDeleted=${IsDeleted}`)
            .then(response => response.json())
            .then(result => {
                if (result.length === 0) {
                    setMessg('No users to Show')
                } else {
                    setUsersData(result)
                    setMessg(' ')
                }

            })
            .catch(error => {
                console.error('Error:', error);
            });
        }

    
    return (

        <div className='container p-4'>
            <div className='d-flex align-items-center  justify-content-center w-100 ' onChange={(event)=>{
                 if(event.target.value==='deletedUsers'){
                    setIsDeleted("true")
                  }else if(event.target.value==="activeUser"){
                    setIsDeleted("false")
                  }else if(event.target.value==="Allusers"){
                    setIsDeleted('Allusers')
                  }
                  
            }}>
                <input className='m-2' type="radio" value="Allusers" name="filter" /> All users
                <input className='m-2' type="radio" value="deletedUsers" name="filter" /> Deleted Users
                <input className='m-2' type="radio" value="activeUser" name="filter" /> Active User
            </div>
            <p>{Messg}</p>
            {usersData.map((user, i) => {
                return <ShowUser user={user} key={i} />
            })}

        </div>
    )
}
export default UsersList