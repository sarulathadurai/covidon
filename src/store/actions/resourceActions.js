export const createResource = (resource)=>{
    console.log(resource);
    return (dispatch,getState,{getFirestore}) =>{
        const firestore = getFirestore();
        firestore.collection('resources').add({
            ...resource,
            userId:12345,
            name:"Saru",
            createdAt:new Date()
        }).then(() => {
            dispatch({type:"CREATE_RES_SUCCESS"});
        }).catch((err) => {
            dispatch({type:"CREATE_RES_FAILED",err})
        })

    }
};