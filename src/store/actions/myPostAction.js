export const updateResPost = (id,res) => {
    console.log(res);
    return(dispatch,getState,{getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection("resources").doc(id).update({
            "resType":res.resType,
             "stock":res.stock, 
             "bloodType":res.bloodType, 
             "otherName":res.otherName, 
             "district":res.district, 
             "state":res.state
        }).then(()=>{
            console.log("updated");
        }).catch((error) =>{

            console.log("Error in updation",error);
        })
    }
}

export const deleteResPost = (id) => {
    return (dispatch,getState,{getFirestore}) =>{
        const firestore = getFirestore();
        firestore.collection("resources").doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
}

export const deleteNeedPost = (id) => {
    return (dispatch,getState,{getFirestore}) =>{
        const firestore = getFirestore();
        firestore.collection("needs").doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
}

export const updateNeedPost = (id,stock) => {
    return(dispatch,getState,{getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection("needs").doc(id).update({
            'stock':stock
        }).then(()=>{
            console.log("updated");
        }).catch((error) =>{
            console.log("Error in updation",error);
        })
    }
}