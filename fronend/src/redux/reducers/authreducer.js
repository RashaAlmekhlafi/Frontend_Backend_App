const initialState = {
    loggedIn: false,
    UserName:" ",
    UserId:0,
    Admin:false



}

const Authreducer = (state = initialState, action) => {
    console.log("from action",action.payload)
    switch (action.type) {
        case 'login':
            return {
                ...state,
                loggedIn: true,
                UserName: action.payload[0],
                UserId:action.payload[1],
                Admin:action.payload[2]
                
            }
        case 'logout':
            return {
                ...state,
                loggedIn: false,
            }
        default:
            return state
    }
}
export default Authreducer