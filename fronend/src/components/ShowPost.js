import React from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useSelector } from 'react-redux';


const ShowPost = ({ post }) => {
    const Admin = useSelector((state) => state.auth.Admin)
    const User_Id = useSelector((state) => state.auth.UserId)
   
    const deletPost = () => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(`http://localhost:3000/posts/${post.PostId}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                            }

                        }).then(res => {

                            return res.json()

                        })
                            .then(result => {
                                confirmAlert({
                                    message: result.message,
                                    buttons: [
                                        {
                                            label: 'cansel',
                                            onClick: () => ' '
                                        }]
                                })

                            })
                    }
                },
                {
                    label: 'No',
                    onClick: () => " "
                }
            ]
        });
    }

    return (


        <div className="card m-1" >
            <div className="card-body">
                <div className='d-flex justify-content-end'>
                    <button type="button" className="btn btn-danger mx-1 " onClick={deletPost}>Delete</button>
                    {(Admin && post?.UserId !== User_Id) ? <></> : <Link to={`/edit-post/${post.PostId}`}><button type="button" className="btn btn-secondary">Edit</button></Link>}

                </div>

                <h5 className="card-title">{post.PostTitle}</h5>
                <h6 className="card-subtitle mb-2 text-muted text-sm">Created at: {post.createdAt?.split('T')[0]}</h6>
                <p className="card-text">{post.PostBody}.</p>

            </div>
        </div>


    )
}
export default ShowPost