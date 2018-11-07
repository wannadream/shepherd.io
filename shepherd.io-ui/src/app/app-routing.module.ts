import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth-guard';
import { LoginComponent } from './login/login.component';
import { SheepComponent } from './sheep/sheep.component';
import { SheepDetailComponent } from './sheep-detail/sheep-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { NewsComponent } from './news/news.component';
import { ImmigrationStatisticsComponent } from './immigration-statistics/immigration-statistics.component';
import { TruthComponent } from './truth/truth.component';

const routes: Routes = [
  { path: '', redirectTo: '/news', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sheep', component: SheepComponent, canActivate: [AuthGuard] },
  { path: 'sheep/:id', component: SheepDetailComponent, canActivate: [AuthGuard] },
  { path: 'myaccount', component: UserDetailComponent, canActivate: [AuthGuard] },
  { path: 'news', component: NewsComponent },
  { path: 'immigration-statistics', component: ImmigrationStatisticsComponent },
  { path: 'truth', component: TruthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
