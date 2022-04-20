
import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    useEffect(()=>{
        window.localStorage.removeItem("token")
        dispatch({
            type:"logout"
        })
        navigate('/')
    },[])
   

 return <>
 </>
}
export default Logout