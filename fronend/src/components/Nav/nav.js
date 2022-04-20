import { NavLink } from 'react-router-dom';
import './Nav.css'
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
    const dispatch = useDispatch()
    const Admin = useSelector((state) => state.auth.Admin)
    const loggedIn = useSelector((state) => state.auth.loggedIn)
    const UserName = useSelector((state) => state.auth.UserName)
    const setActorName = (e) => {
        dispatch({
            type: 'setActorName',
            payload: e.target.value
        })
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid ">
                <a className="navbar-brand" href="#">App</a>
                {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}
                <div className="collapse navbar-collapse d-flex flex-row-reverse bd-highlight " id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0 me-1">
                        {/* <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li> */}
                        {!Admin ? <>
                            <li className="nav-item">

                                <NavLink style={actveStatus => ({
                                        color: actveStatus.isActive ? "green" : "white"
                                    })} 
                                    className="nav-link active" aria-current="page" to="/Home">My Posts</ NavLink>
                            </li>
                        </> : <>
                            <li className="nav-item">
                                < NavLink style={actveStatus => ({
                                        color: actveStatus.isActive ? "green" : "white"
                                    })}
                                    className="nav-link active" aria-current="page" to="/usersList">Users</ NavLink>
                            </li>
                            <li className="nav-item">
                                < NavLink style={actveStatus => ({
                                        color: actveStatus.isActive ? "green" : "white"
                                    })}
                                    className="nav-link active" aria-current="page" to="/Home">My Posts</ NavLink>
                            </li>
                        </>
                        }


                        <li className="nav-item">
                            < NavLink style={actveStatus => ({
                                        color: actveStatus.isActive ? "green" : "white"
                                    })}
                                    className="nav-link active" aria-current="page" to="/profile">Profile</ NavLink>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {UserName}
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {loggedIn ? <>
                                    <li>< NavLink className="dropdown-item" to="/logout">Logout</ NavLink></li>
                                </> : <>
                                    <li>< NavLink className="dropdown-item" to="/login">Login</ NavLink></li>
                                    <li>< NavLink className="dropdown-item" to="/signup">Sign up</ NavLink></li>
                                </>

                                }


                                {/* <li><a className="dropdown-item" href="#">Something else here</a></li> */}
                            </ul>
                        </li>

                    </ul>
                    {/* <form className="d-flex">
                        <input onKeyUp={setActorName} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form> */}
                </div>
            </div>
        </nav>
    )
}
export default Navbar