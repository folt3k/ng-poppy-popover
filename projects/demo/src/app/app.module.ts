import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PopoverModule } from 'ng-poppy';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { BasicModule } from './pages/basic/basic.module';
import { AppRoutingModule } from './app-routing.module';
import { MenuModule } from './pages/menu/menu.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    PopoverModule,
    BasicModule,
    MenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
