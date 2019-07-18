import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';

const authRoutes: Routes = [
  {path: 'auth/singin', component: LoginFormComponent},
]
@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
