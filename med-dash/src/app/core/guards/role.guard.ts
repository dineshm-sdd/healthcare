import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, UserRole } from '../auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.currentUser();

  // Get expected roles from route data
  const expectedRoles = route.data['roles'] as UserRole[];

  if (user && expectedRoles.includes(user.role)) {
    return true;
  }

  // Redirect to unauthorized or home if logged in but wrong role
  // For now, just send to their own dashboard or login
  if (user) {
    if (user.role === 'admin') return router.createUrlTree(['/admin/dashboard']);
    if (user.role === 'doctor') return router.createUrlTree(['/doctor/dashboard']);
    return router.createUrlTree(['/patient/dashboard']);
  }

  return router.createUrlTree(['/auth/sign-in']);
};
