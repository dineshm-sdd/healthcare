import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
    {
        path: 'auth',
        children: [
            {
                path: 'sign-in',
                loadComponent: () => import('./features/auth/sign-in/sign-in.component').then(m => m.SignInComponent)
            },
            {
                path: 'sign-up',
                loadComponent: () => import('./features/auth/sign-up/sign-up.component').then(m => m.SignUpComponent)
            },
            {
                path: 'forgot-password',
                loadComponent: () => import('./features/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
            },
            { path: '', redirectTo: 'sign-in', pathMatch: 'full' }
        ]
    },
    {
        path: 'patient',
        canActivate: [authGuard, roleGuard],
        data: { roles: ['patient'] },
        loadComponent: () => import('./features/dashboard/dashboard-layout/dashboard-layout.component').then(m => m.DashboardLayoutComponent),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./features/patient/patient-dashboard/patient-dashboard.component').then(m => m.PatientDashboardComponent)
            },
            {
                path: 'appointments',
                loadComponent: () => import('./features/patient/my-appointments/my-appointments.component').then(m => m.MyAppointmentsComponent)
            },
            {
                path: 'records',
                loadComponent: () => import('./features/patient/medical-records/medical-records.component').then(m => m.MedicalRecordsComponent)
            },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },
    {
        path: 'doctor',
        canActivate: [authGuard, roleGuard],
        data: { roles: ['doctor'] },
        loadComponent: () => import('./features/dashboard/dashboard-layout/dashboard-layout.component').then(m => m.DashboardLayoutComponent),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./features/doctor/doctor-dashboard/doctor-dashboard.component').then(m => m.DoctorDashboardComponent)
            },
            {
                path: 'schedule',
                loadComponent: () => import('./features/doctor/appointment-manager/appointment-manager.component').then(m => m.AppointmentManagerComponent)
            },
            {
                path: 'patients',
                loadComponent: () => import('./features/doctor/patient-list/patient-list.component').then(m => m.PatientListComponent)
            },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: 'auth/sign-in', pathMatch: 'full' },
    { path: '**', redirectTo: 'auth/sign-in' }
];
