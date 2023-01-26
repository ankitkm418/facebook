import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { login } from './shared/store/actions/auth.action';
import { AuthState } from './shared/store/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'facebook-clone';

  constructor(private store: Store<AuthState>){}

  ngOnInit(): void {
    const userProfile = localStorage.getItem('user');

    if(userProfile){
      this.store.dispatch(login({user: JSON.parse(userProfile)}));
    }
  }
}
