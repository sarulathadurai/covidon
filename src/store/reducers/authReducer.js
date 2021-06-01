const initState = {
    authMsg:null,
    loginMsg:null,
}

const authReducer = (state=initState,action) => {
    switch (action.type) {
        case 'LOGIN_ERR':
            return{
                ...state,
                loginMsg: 'LOGIN FAILED'
            }
        case 'LOGIN_SUCCESS':
            return{
                ...state,
            loginMsg:'LOGIN SUCCESS'
            }
        case 'SIGNOUT_SUCCESS':
            return state;
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                authMsg:'SIGNUP SUCCESS'
            }
        case 'SIGNUP_ERR':
            return {
                ...state,
                authMsg:'SIGNUP FAILED'
            }    
        default:
            return state;
    }
}

export default authReducer;