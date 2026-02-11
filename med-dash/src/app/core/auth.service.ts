import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { of, delay, tap } from 'rxjs';

export type UserRole = 'admin' | 'doctor' | 'patient';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // Signal to track current user state
    currentUser = signal<User | null>(null);

    constructor(private router: Router) {
        // Check local storage for persisted user
        const savedUser = localStorage.getItem('med_dash_user');
        if (savedUser) {
            this.currentUser.set(JSON.parse(savedUser));
        }
    }

    login(email: string, role: UserRole) {
        // Mock login simulation
        const mockUser: User = {
            id: '123',
            name: email.split('@')[0],
            email,
            role,
            avatar: 'https://i.pravatar.cc/150?u=' + email
        };

        return of(mockUser).pipe(
            delay(800), // Simulate network latency
            tap(user => {
                this.currentUser.set(user);
                localStorage.setItem('med_dash_user', JSON.stringify(user));
                this.redirectAfterLogin(role);
            })
        );
    }

    logout() {
        this.currentUser.set(null);
        localStorage.removeItem('med_dash_user');
        this.router.navigate(['/auth/sign-in']);
    }

    private redirectAfterLogin(role: UserRole) {
        switch (role) {
            case 'patient':
                this.router.navigate(['/patient/dashboard']);
                break;
            case 'doctor':
                this.router.navigate(['/doctor/dashboard']);
                break;
            case 'admin':
                this.router.navigate(['/admin/dashboard']);
                break;
            default:
                this.router.navigate(['/']);
        }
    }
}
