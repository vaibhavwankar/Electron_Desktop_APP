import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';


import { AuthenticationService } from './services/index';
import { UserService } from './services/index';

import { DataTableModule, SharedModule, DialogModule, ButtonModule, TabMenuModule, MenuItem, CalendarModule } from 'primeng/primeng';

import { LoginComponent } from './components/login/index';
import { HomeComponent } from './components/home/index';
import { CreatePatientComponent } from './components/createpatient/create.patient.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { sync } from './sync/sync';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRouting,
        BrowserAnimationsModule,
        ButtonModule,
        DataTableModule,
        TabMenuModule,
        SharedModule,
        DialogModule,
        CalendarModule,
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        CreatePatientComponent,
        DashboardComponent,
        
    ],
    providers: [
        AuthenticationService,
        UserService,
        sync
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }