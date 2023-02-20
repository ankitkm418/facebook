import { createReducer, on } from "@ngrx/store";
import { UserLogin } from "../../Interfaces/login.interface";
import { AuthActions } from "../actions/action-type";


export interface AuthState{
    user: UserLogin;
};

export const initialAuthState: AuthState = {
    user: undefined,
}

export const authReducer = createReducer(
    initialAuthState,

    on(AuthActions.login, (state, action) =>{
        return {
            user: action.user
        }
    }),

    on(AuthActions.logout, (state, action) =>{
        return{
            user: undefined
        }
    })
    
)


