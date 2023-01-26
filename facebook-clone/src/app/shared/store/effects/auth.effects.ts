import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs";
import { AuthActions } from "../actions/action-type";


@Injectable()

export class AuthEffects {

    // better way to use sideeffects
    login$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AuthActions.login),
                tap(action =>
                    localStorage.setItem('user', JSON.stringify(action.user))
                )
            ),
            {dispatch: false});

    logout$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AuthActions.logout),
                tap(action => {
                    localStorage.removeItem('user');
                    this.router.navigateByUrl('/signup')
                })
            ),
            { dispatch: false}
    )



    constructor(private actions$: Actions, private router: Router) {

        // login$.subscribe(); // Using create effect we don't need to manuly subscribe

        // actions$.subscribe(action =>{
        //     if(action.type == '[Login Page] User Login'){
        //         localStorage.setItem('user', JSON.stringify(action['user']));
        //     }
        // });

    }
}