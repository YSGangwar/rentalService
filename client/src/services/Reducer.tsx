import { USER_TYPE , SAVE_USER } from "./ActionTypes";

const initialState = {
    userType:"",
    username:"",
};
interface ActionType {
    type: string;
    payload:string ;
}
const Reducer = ( state = initialState,action:ActionType)=>{
    switch(action.type)
    {
        case USER_TYPE:
            return {
                ...state,
                userType:action.payload,
            };
        case SAVE_USER:
            return {
                ...state,
                username:action.payload
            }
        default:
            return state;
    }
};
export default Reducer;