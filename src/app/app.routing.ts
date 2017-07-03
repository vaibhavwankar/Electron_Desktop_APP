import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component'
import { CreatePatientComponent } from './components/createpatient/create.patient.component';
import { HomeComponent } from './components/home/index';
import { LoginComponent } from './components/login/index';

const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'home', component: HomeComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'create', component: CreatePatientComponent },
        ]
    },


];

export const AppRouting = RouterModule.forRoot(appRoutes);
