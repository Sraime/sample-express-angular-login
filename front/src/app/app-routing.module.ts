import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { LoginActivate } from './modules/auth/LoginActivateGuard';

const appRoutes: Routes = [
  { path: '',   redirectTo: '/auth/singin', pathMatch: 'full', canActivate: [LoginActivate]},
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],

  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
