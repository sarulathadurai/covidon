const initState = {
    authError:null
}

const authReducer = (state=initState,action) => {
    switch (action.type) {
        case 'LOGIN_ERR':
            console.log("Login error")
            return{
                ...state,
                authError: 'LOGIN FAILED'
            }
        case 'LOGIN_SUCCESS':
            console.log("Login success")
            return{
                ...state,
            authError:null
            }
        default:
            break;
    }
}