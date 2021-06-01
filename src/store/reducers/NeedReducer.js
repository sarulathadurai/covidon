const initState = {
    needMsg:null
}

const NeedReducer = (state=initState,action) => {
    switch (action.type) {
        case 'POST_NEED_FAILED':
            console.log("failed")
                return {
                    ...state,
                    needMsg:"Gone Wrong!!Needs cannot be posted"
                }
         case 'POST_NEED_SUCCESS':
             console.log("Success")
                return {
                    ...state,
                    needMsg:"Need posted successfully"
                }
        default:
            return state
    }
}

export default NeedReducer;