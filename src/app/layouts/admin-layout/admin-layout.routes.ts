import { Routes } from '@angular/router';

export const adminLayoutRoutes: Routes = [
  { path: 'dashboard', loadComponent: () => import('../../dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'user-profile', loadComponent: () => import('../../user-profile/user-profile.component').then(m => m.UserProfileComponent) },
  { path: 'table-list', loadComponent: () => import('../../table-list/table-list.component').then(m => m.TableListComponent) },
  { path: 'typography', loadComponent: () => import('../../typography/typography.component').then(m => m.TypographyComponent) },
  { path: 'icons', loadComponent: () => import('../../icons/icons.component').then(m => m.IconsComponent) },
  { path: 'maps', loadComponent: () => import('../../maps/maps.component').then(m => m.MapsComponent) },
  { path: 'notifications', loadComponent: () => import('../../notifications/notifications.component').then(m => m.NotificationsComponent) },
  { path: 'upgrade', loadComponent: () => import('../../upgrade/upgrade.component').then(m => m.UpgradeComponent) },
];
