import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { environment } from './environments/environment';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { provideRouter, Routes, withHashLocation } from '@angular/router';
import { AuthComponent } from './app/auth/auth.component';
import {provideAnalytics, getAnalytics } from './environments/environment'


const routes: Routes = [
  {path: '', redirectTo: '/auth', pathMatch:'full'},
  { path: 'auth', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent },
  {path: '**', redirectTo: '/auth'}
];

bootstrapApplication(AppComponent, {
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));
