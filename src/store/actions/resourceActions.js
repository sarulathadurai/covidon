export const createResource = (resource)=>{
    return (dispatch,getState,{getFirestore}) =>{
        const firestore = getFirestore();
        const userId = getState().firebase.auth.uid;
        const profile = getState().firebase.profile;
        firestore.collection('resources').add({
            ...resource,
            userId:userId,
            firstName: profile.firstName,
            lastName: profile.lastName,
            phNo:profile.phNo,
            initials:profile.initials,
            email:profile.email,
            createdAt:new Date()
        }).then(() => {
            dispatch({type:"CREATE_RES_SUCCESS"});
        }).catch((err) => {
            dispatch({type:"CREATE_RES_FAILED",err})
        })

    }
};