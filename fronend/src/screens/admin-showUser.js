import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ShowPost from '../components/ShowPost'

const AdminShowUser = () => {
    const [userPostsData, setUserPostsData] = useState([])
    const [Messg, setMessg] = useState('')
    let { id } = useParams()
    let { Username } = useParams()
    useEffect(() => {
        fetch(`http://localhost:3000/posts?userId=${id}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(result => {
                if (result.length === 0) {
                    setMessg("There are no posts yet")
                } else {
                    setUserPostsData(result)
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [!userPostsData])
    return (

        <div className='container p-4'>
            <Link to={`/admin-showUserProfile/${id}`}><button type="button" className="btn btn-secondary">Show user Profile</button></Link>
            
            <h3>User's Username: {Username}</h3>
            <h5>{Username}'s Published Posts</h5>
            <p className='text-danger'>{Messg}</p>
            {userPostsData.map((post, i) => {
                return <ShowPost post={post} key={i} />
            })}

        </div>
    )
}
export default AdminShowUser