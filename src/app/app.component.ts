import { Component, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { AppState } from './app.service';
import { EmailService, AuthService } from './services';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
  <div layout="row" flex class="wrapper">
    <navbar *ngIf="authService.isAuthenticated()" flex="15" (onRefresh)="onRefresh($event)"></navbar>
    <spinner [loading]="syncing"></spinner>
    <div *ngIf="!syncing" flex>
        <router-outlet></router-outlet>
    </div>
  </div>
  `
})
export class AppComponent {
  public syncing: boolean = false;
  public name: string = 'Email Client';
  private viewContainerRef: ViewContainerRef;

  constructor(
    public appState: AppState, viewContainerRef: ViewContainerRef, private _cookieService: CookieService, private _emailService: EmailService, public authService: AuthService) {
    this.viewContainerRef = viewContainerRef;
    if (_cookieService.get('email-oauth')) {
      localStorage.setItem('email-jwt', _cookieService.get('email-oauth'));
      _cookieService.remove('email-oauth');
    }
  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

  onRefresh(refresh?: boolean) {
    this.syncBoxes([]);
  }

  syncBoxes(boxes: string[]) {
    this.syncing = true;
    this._emailService.updateMailboxList().subscribe((data) => {
      this.appState.set('boxList', data);
    });
    this._emailService.getEmails([]).subscribe((data: any) => {
      this.syncing = false;
    });
  }

}
