import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourtCalendarComponent } from './court-calendar/court-calendar.component';
import { SharedModule } from './shared/shared.module';
import { PrintLibraryModule } from 'argus-custom-print';


@NgModule({
  declarations: [
    AppComponent,
    CourtCalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    PrintLibraryModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
