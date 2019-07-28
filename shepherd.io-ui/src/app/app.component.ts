import { Component, OnInit } from '@angular/core';
import {
  Router, RouterEvent, NavigationStart,
  NavigationEnd, NavigationCancel, NavigationError
} from '@angular/router';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseComponent } from './base.component';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';
import { HelperService } from './helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent implements OnInit {

  loadingRef: MatDialogRef<LoadingDialogComponent, any>;

  constructor(private _router: Router,
    private _observableMedia: MediaObserver,
    private _dialog: MatDialog,
    public helper: HelperService) {
    super();
    this._router.events.subscribe((routerEvent: RouterEvent) => this.checkRouterEvent(routerEvent));
  }

  ngOnInit() {
    this.baseInit(this._observableMedia);
  }

  onLogOut() {
    this.helper.cleanToken();
    this._router.navigate(['/']);
  }

  onChangePassword() {
    this._router.navigate(['myaccount']);
  }

  checkRouterEvent(routerEvent: RouterEvent) {
    if (routerEvent instanceof NavigationStart) {
      this.loadingRef = this._dialog.open(LoadingDialogComponent, { disableClose: true });
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      if (this.loadingRef) {
        this.loadingRef.close();
      }
    }
  }
}
