export const postNeed = (need)=>{
    return (dispatch,getState,{getFirestore}) =>{
        const firestore = getFirestore();
        const userId = getState().firebase.auth.uid;
        const profile = getState().firebase.profile;
        firestore.collection('needs').add({
            ...need,
            userId:userId,
            firstName: profile.firstName,
            lastName: profile.lastName,
            phNo:profile.phNo,
            initials:profile.initials,
            email:profile.email,
            createdAt:new Date()
        }).then(() => {
            dispatch({type:"POST_NEED_SUCCESS"});
        }).catch((err) => {
            dispatch({type:"POST_NEED_FAILED",err})
        })

    }
};