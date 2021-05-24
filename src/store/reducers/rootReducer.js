import { combineReducers } from "redux";
import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore"
import resourceReducer from "./resourceReducer";
import locationReducer from "./locationReducer";
const rootReducer = combineReducers({
    loc:locationReducer,
    res:resourceReducer,
    firebase:firebaseReducer,
    firestore:firestoreReducer,
})

export default rootReducer;