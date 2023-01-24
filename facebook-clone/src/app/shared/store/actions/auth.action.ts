import { createAction, props } from "@ngrx/store";
import { UserLogin } from "../../Interfaces/login.interface";


export const login  = createAction(
    "[Login Page] User Login",
    props<{user: UserLogin}>()
)


export const logout = createAction(
    "[Top Menu] Logout" //there is no payload so not defined props
)