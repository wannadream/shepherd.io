import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MatToolbarModule, MatButtonModule, MatInputModule,
  MatTableModule, MatPaginatorModule, MatCardModule,
  MatNativeDateModule, MatDatepickerModule, MatSelectModule,
  MatIconModule, MatSnackBarModule, MatDialogModule,
  MatGridListModule, MatProgressSpinnerModule, MatMenuModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth-guard';
import { AppHttpInterceptor } from './app-http-interceptor';
import { SheepService } from './sheep.service';
import { HelperService } from './helper.service';
import { NewsService } from './news.service';
import { UserService } from './user.service';
import { ImmigrationStatisticsService } from './immigration-statistics.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SheepComponent } from './sheep/sheep.component';
import { SheepDetailComponent } from './sheep-detail/sheep-detail.component';
import { IceLocatorDialogComponent } from './ice-locator-dialog/ice-locator-dialog.component';
import { NewsComponent } from './news/news.component';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ImmigrationStatisticsComponent } from './immigration-statistics/immigration-statistics.component';
import { TruthComponent } from './truth/truth.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SheepComponent,
    SheepDetailComponent,
    IceLocatorDialogComponent,
    NewsComponent,
    LoadingDialogComponent,
    UserDetailComponent,
    ImmigrationStatisticsComponent,
    TruthComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
    SheepService,
    HelperService,
    NewsService,
    UserService,
    ImmigrationStatisticsService
  ],
  entryComponents: [
    IceLocatorDialogComponent,
    LoadingDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
