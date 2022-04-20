import React from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const ShowUsers = ({ user }) => {
    const deletuser = (doDelete) => {
        confirmAlert({
            title: (doDelete? 'Confirm to delete':'Confirm to undo deleting'),
            message: (doDelete? 'Are you sure you want to delete.':'Are you sure you want to undo deleting'),
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(`http://localhost:3000/users/admin/${user.UserId}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',

                            }, body: JSON.stringify({
                                deleted: doDelete


                            }),
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


        <div>
            <li className="list-group-item list-group-item-light my-1 d-flex justify-content-between">
                <Link to={`/admin-showUser/${user.Username}/${user.UserId}`}><span>{user.FirstName} {user.LastName}</span></Link>
                <span>
                    {!user.Deleted ? <>
                        <button type="button" className="btn btn-danger mx-1" onClick={()=>{
                            deletuser(true)
                        }}>Delete</button>
                    </> : <>
                        <button type="button" className="btn btn-secondary mx-1" onClick={()=>{
                            deletuser(false)
                        }}>Undo Deleting</button>
                    </>}

                    {/* <NavLink to={`/actors/edit/${actor.actor_id}`}><button type="button" className="btn btn-secondary">Edit</button></NavLink> */}


                </span>
            </li>


        </div>


    )
}
export default ShowUsers