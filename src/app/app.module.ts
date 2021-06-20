import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { InformSheetComponent } from './inform-sheet/inform-sheet.component';
import { HttpClientModule } from '@angular/common/http';
import { MapSheetComponent } from './map-sheet/map-sheet.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RealtimeComponent } from './realtime/realtime.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { CheckMemberComponent } from './check-member/check-member.component';

@NgModule({
  declarations: [
    AppComponent,
    InformSheetComponent,
    MapSheetComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    HomeComponent,
    RealtimeComponent,
    AdminPageComponent,
    CheckMemberComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
