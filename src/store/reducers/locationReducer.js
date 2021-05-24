const  initState={

}  

const locationReducer = (state=initState,action) => {
    console.log(action)
    switch (action.type) {
        case "ADD_LOCATION":
            console.log("Location added");
            return action.payload
    
        default:
            return state
    }
}

export default locationReducer;