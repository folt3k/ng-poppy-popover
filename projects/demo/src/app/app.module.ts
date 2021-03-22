import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PopoverModule } from 'lib';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { BasicModule } from './pages/basic/basic.module';
import { AppRoutingModule } from './app-routing.module';
import { MenuModule } from './pages/menu/menu.module';
import { TooltipModule } from './pages/tooltip/tooltip.module';
import { SelectModule } from './pages/select/select.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    PopoverModule,
    BasicModule,
    MenuModule,
    TooltipModule,
    SelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
