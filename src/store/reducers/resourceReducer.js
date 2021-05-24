const initState = {}

const resourceReducer = (state=initState,actions) =>{
    switch (actions.type) {
        case 'CREATE_RES_SUCCESS':
            console.log("Resource creation succeeded")
            return state;
        case 'CREATE_RES_FAILED':
            console.log("Resource creation failed")
            return state;
        default:
            return state;
    }
}

export default resourceReducer;