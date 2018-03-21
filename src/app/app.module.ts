import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NavbarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { LocationService } from './services/location.service';
import { ParseService } from './services/live-query.service';


@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [LocationService, ParseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
