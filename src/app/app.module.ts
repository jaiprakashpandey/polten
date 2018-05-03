import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {IntegrationService} from './integration.service';
import { StatusComponent } from './status/status.component';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import { AdminComponent } from './admin/admin.component';
import { ToggleFullscreenDirective } from './toggle-fullscreen.directive';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StatusComponent,
    AdminComponent,
    ToggleFullscreenDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule,
  ],
  providers: [IntegrationService,StatusComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
