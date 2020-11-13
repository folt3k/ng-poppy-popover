import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgPoppyModule } from 'ng-poppy';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgPoppyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
