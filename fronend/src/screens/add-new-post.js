import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

const AddNewPost = () => {
    const UserId = useSelector((state) => state.auth.UserId)
    const postTitleRef = useRef(null)
    const postBodyRef = useRef(null)
    const PublishButton = useRef(null)
    const SaveEditButton = useRef(null)
    const t_Publish = useRef(null)
    const t_SaveEdit = useRef(null)

    const [Messg, setMessg] = useState(' ')
    const [Url, setUrl] = useState(' ')
    const [Method, setMethod] = useState(' ')
    const [PrevData, setPrevData] = useState(null)
    const navigate = useNavigate()
    let { id } = useParams()
    const { pathname } = useLocation()

    //previus data
    useEffect(() => {
        if (pathname === '/add-new-post') {
            setMethod("post")
            setUrl(`http://localhost:3000/posts?userId=${UserId}`)
            PublishButton.current.classList.remove('d-none')
            t_Publish.current.classList.remove('d-none')
            SaveEditButton.current.classList.add('d-none')
            t_SaveEdit.current.classList.add('d-none')
            
        } else if ((pathname === `/edit-post/${id}`)) {
            setMethod("put")
            setUrl(`http://localhost:3000/posts/${id}`)
            SaveEditButton.current.classList.remove('d-none')
            t_SaveEdit.current.classList.remove('d-none')
            PublishButton.current.classList.add('d-none')
            t_Publish.current.classList.add('d-none')
            
            fetch(`http://localhost:3000/posts/${id}`, {
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

            postTitleRef.current.value = PrevData?.postTitle
            postBodyRef.current.value = PrevData?.postBody
        }
    }, [!PrevData])

    const publish = () => {
        const postTitle = postTitleRef.current.value
        const postBody = postBodyRef.current.value
        if (postTitle === '' || postBody === '') {
            setMessg('Please fill in all the fields')
        } else {
            fetch(Url, {
                method: Method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                },
                body: JSON.stringify({
                    PostTitle: postTitle,
                    PostBody: postBody,

                }),
            }).then(response => response.json())
                .then(data => {
                    if(data.success){
                        navigate('/Home')
                    }else{
                        setMessg(data.message)
                    }
                    
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }


    }

    return (

        <div className='container p-5'>
            <h4 ref={t_SaveEdit} className='d-none'>Update Your Post </h4>
            <h4 ref={t_Publish} className='d-none'>Add New Post</h4>

            <div className="mb-3">
                <label htmlFor="exampleInputPost" className="form-label">Post Title</label>
                <input ref={postTitleRef} type="text" className="form-control" id="exampleInputPost" aria-describedby="emailHelp" name='postTitle' />

            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPostBody1" className="form-label">Post Body</label>
                <textarea ref={postBodyRef} className="form-control" id="exampleInputPostBody1" rows="10" cols="50" name="postBody" form="usrform">
                </textarea>
            </div>
<p className='text-success'>{Messg}</p>
            <button type="button" onClick={publish} ref={PublishButton} className="btn btn-primary d-none">Publish Post</button>
            <button type="button" onClick={publish} ref={SaveEditButton} className="btn btn-primary d-none">Save Edite</button>
        </div >

    )
}
export default AddNewPost