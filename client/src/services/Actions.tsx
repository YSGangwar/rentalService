import { USER_TYPE ,SAVE_USER} from "./ActionTypes";

export const getUserType=(userType:string)=>({
    type:USER_TYPE,
    payload:userType
});

export const saveUsername= (username:string)=>({
    type:SAVE_USER,
    payload:username
});
