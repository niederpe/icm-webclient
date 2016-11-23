import { Component } from '@angular/core';
import { AuthService } from '../../services';
import { Router } from '@angular/router';
import { AppState } from '../../app.service';

@Component({
  selector: 'profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css'],
})
export class ProfileComponent {
  model: any = {};
  loading = false;
  error = '';

  constructor(
    private router: Router,
    private _auth: AuthService,
    public appState: AppState) { }

  ngOnInit() {
    // reset login status
    console.log('Hello Profile Component');
    console.log(this.appState.get());
  }

  login() {
    this.loading = true;
    this._auth.login(this.model.username, this.model.password)
      .subscribe(result => {
        if (result === true) {
          // login successful
          this.router.navigate(['/']);
        } else {
          // login failed
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      });
  }
}
