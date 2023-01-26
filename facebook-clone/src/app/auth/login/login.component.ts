import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, tap, map } from 'rxjs';
import { login, logout } from 'src/app/shared/store/actions/auth.action';
import { AuthState } from 'src/app/shared/store/reducers';
import { isLoggedIn } from 'src/app/shared/store/selectors/auth.selector';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isLoggedIn$: Observable<boolean> | undefined;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private store: Store<AuthState>
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ["test@ymail.com", [Validators.required]],
      password: ["1234", [Validators.required]]
    });

    // this.isLoggedIn$ = this.store
    //     .pipe(
    //         map((state:any) => state["auth"].user)
    //     )

    this.isLoggedIn$ = this.store
        .pipe(
            select(isLoggedIn)
        )
  }


  login(){
    const val = this.form.value;

    const newLoginAction = login({user:val});
    this.store.dispatch(newLoginAction);
    this.router.navigateByUrl('/signup')
    // this.authService.login(val)
    //   .pipe(
    //     tap(user =>{
    //       const newLoginAction = login({user});
    //       console.log(newLoginAction)
    //       this.store.dispatch(newLoginAction);

    //       this.router.navigateByUrl("/");
    //     })
    //   )  
    //   .subscribe(user=>{
    //     console.log("login failed");
    //   })
  }

 
}
