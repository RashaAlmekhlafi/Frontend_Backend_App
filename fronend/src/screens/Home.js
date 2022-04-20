import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ShowPost from '../components/ShowPost'

const Home = () => {
    const [postsData, setPostsData] = useState([])
    const [Messg, setMessg] = useState([])
    const UserId = useSelector((state) => state.auth.UserId)
    useEffect(() => {
        fetch(`http://localhost:3000/posts`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(result => {
                if (result.length === 0) {
                    setMessg('No Posts to Show')
                } else {
                    setPostsData(result)
                    
                }

            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [!postsData])
    return (

        <div className='container p-4'>
            <Link to="/add-new-post"><button type="button" className="btn btn-secondary">Add New Post</button></Link>
            <p>{Messg}</p>
            {postsData.map((post, i) => {
                return <ShowPost post={post} key={i} />
            })}

        </div>
    )
}
export default Home