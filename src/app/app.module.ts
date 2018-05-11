import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppService } from './app.service';


import { ChartsComponent } from './charts/charts.component';
import { AppRouteModule } from '../router/app-route.module';
import { ChartModule } from 'angular-highcharts';
import exporting from 'highcharts/modules/exporting.src';
import { MyDatePickerModule } from 'mydatepicker';




@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartModule,
    AppRouteModule,
    MyDatePickerModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
