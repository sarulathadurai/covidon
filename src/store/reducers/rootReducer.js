import { combineReducers } from "redux";
import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore"
import resourceReducer from "./resourceReducer";
import locationReducer from "./locationReducer";
import authReducer from "./authReducer";
import NeedReducer from "./NeedReducer";
const rootReducer = combineReducers({
    loc:locationReducer,
    res:resourceReducer,
    need:NeedReducer,
    auth:authReducer,
    firebase:firebaseReducer,
    firestore:firestoreReducer,
})

export default rootReducer;