import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {AuthService} from './services/auth.service';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import {SnackBarOverviewExampleComponent} from './components/snack/snack.component';
import {AppMaterialModules} from './modules/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { StatusComponent } from './components/status/status.component';
import {LoginRedirect} from './services/login-redirect.service';
import {EnsureAuthenticated} from './services/ensure-authenticated.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SnackBarOverviewExampleComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    AppMaterialModules,
    RouterModule.forRoot([
      { path: '',
        component: SnackBarOverviewExampleComponent
      },
      { path: 'login',
        component: LoginComponent,
        canActivate: [ LoginRedirect ]
      },
      { path: 'status',
        component: StatusComponent,
        canActivate: [ EnsureAuthenticated ]
      },
      { path: 'register',
        component: RegisterComponent,
        canActivate: [ LoginRedirect ]
      }
    ])
  ],
  providers: [
    AuthService,
    EnsureAuthenticated,
    LoginRedirect
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
