import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginModule } from './modules/auth/auth.module';
import { BanqueModule } from './modules/banque/banque.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    LoginModule,
    BanqueModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
