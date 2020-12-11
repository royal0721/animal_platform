import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InformSheetComponent } from './inform-sheet/inform-sheet.component';
import { HttpClientModule } from '@angular/common/http';
import { MapSheetComponent } from './map-sheet/map-sheet.component';


@NgModule({
  declarations: [
    AppComponent,
    InformSheetComponent,
    MapSheetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
