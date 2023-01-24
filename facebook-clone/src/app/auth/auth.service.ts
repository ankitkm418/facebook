import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserLogin } from "../shared/Interfaces/login.interface";


@Injectable()

export class AuthService{
    constructor(private http: HttpClient){

    }


    login(loginForm: any): Observable<UserLogin>{
        return this.http.post<UserLogin>("/api/login", loginForm);
    }
}