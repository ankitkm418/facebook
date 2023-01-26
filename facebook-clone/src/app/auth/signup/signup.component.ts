import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/shared/store/actions/auth.action';
import { AuthState } from 'src/app/shared/store/reducers';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private store: Store<AuthState>
  ) { }

  ngOnInit(): void {
  }

  logout(){
    const newLoginAction = logout();
    this.store.dispatch(newLoginAction);
  }

}
