const  initState={

}  

const locationReducer = (state=initState,action) => {
    switch (action.type) {
        case "ADD_LOCATION":
            return action.payload
    
        default:
            return state
    }
}

export default locationReducer;