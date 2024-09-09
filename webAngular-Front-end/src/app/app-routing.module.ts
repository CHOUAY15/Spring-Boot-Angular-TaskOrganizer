import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { EmployeLayoutComponent } from './theme/layouts/employe-layout/employe-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { GuestGuard } from './core/guards/guest.guard';
import { RoleGuard } from './core/guards/role.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { PasswordUpdateGuard } from './core/guards/password-updated.guard';
import { NotFoundComponent } from './theme/layouts/not-found/not-found.component';
import { RootRedirectGuard } from './core/guards/redirect.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [RootRedirectGuard],
    children: []
  },
  {
    path: 'guest',
    component: GuestComponent,
    canActivate: [GuestGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./guest/pages/landing/landing.component').then((m) => m.LandingComponent)
      },
      {
        path: 'login',
        loadComponent: () => import('./guest/pages/login/login.component').then((m) => m.LoginComponent)
      }
    ]
  },
  {
    path: 'update-password',
    canActivate: [AuthGuard],
    loadComponent: () => import('./guest/pages/update-password/update-password.component').then((m) => m.UpdatePasswordComponent)
  },
  {
    path: 'manager',
    component: AdminComponent,
    canActivate: [AuthGuard, PasswordUpdateGuard, RoleGuard],
    data: { expectedRole: 'CHEF' },
    children: [
      {
        path: '',
        redirectTo: 'teams',
        pathMatch: 'full'
      },
      {
        path: 'teams',
        loadComponent: () => import('./manager/pages/teams/teams.component').then((c) => c.TeamsComponent)
      },
      {
        path: 'team/:teamName/:id/members',
        loadComponent: () => import('./manager/pages/members/members.component').then((c) => c.MembersComponent)
      },
      {
        path: 'team/:teamName/:id/projects',
        loadComponent: () => import('./manager/pages/projects/projects.component').then((c) => c.ProjectsComponent)
      },
      {
        path: 'projects/:teamId/:projectName/:id/tasks',
        loadComponent: () => import('./manager/pages/tasks/tasks.component').then((c) => c.TasksComponent)
      },
      {
        path: 'rapports',
        loadComponent: () => import('./manager/pages/reports/reports.component').then((c) => c.ReportsComponent)
      },
      {
        path: 'documents',
        loadComponent: () => import('./manager/pages/deliverables/deliverables.component').then((c) => c.DeliverablesComponent)
      },
      {
        path: 'member/:id',
        loadComponent: () => import('./manager/pages/member/member.component').then((c) => c.MemberComponent)
      },
      {
        path: 'profil',
        loadComponent: () => import('./member/pages/profil/profil.component').then((c) => c.ProfilComponent)
      },
      {
        path: 'projects',
        loadComponent: () => import('./manager/pages/all-projects/all-projects.component').then((c) => c.AllProjectsComponent)
      },
      {
        path: 'members',
        loadComponent: () => import('./manager/pages/all-members/all-members.component').then((c) => c.AllMembersComponent)
      }

     
    ]
  },
  {
    path: 'member',
    component: EmployeLayoutComponent,
    canActivate: [AuthGuard, PasswordUpdateGuard, RoleGuard],
    data: { expectedRole: 'USER' },
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('./member/pages/team/team.component').then((c) => c.TeamComponent)
      },
      {
        path: 'projets',
        loadComponent: () => import('./member/pages/projects/projects.component').then((c) => c.ProjectsComponent)
      },
      {
        path: ':id/taches',
        loadComponent: () => import('./member/pages/tasks/tasks.component').then((c) => c.TasksComponent)
      },
      {
        path: 'profil',
        loadComponent: () => import('./member/pages/profil/profil.component').then((c) => c.ProfilComponent)
      },
      {
        path: 'reports',
        loadComponent: () => import('./member/pages/reports/reports.component').then((c) => c.ReportsComponent)
      },
      // ... other member routes ...
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'ADMIN' },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./admin/pages/dashboard/dashboard.component').then((c) => c.DashboardComponent)
      },
      {
        path: 'sections',
        loadComponent: () => import('./admin/pages/sections/sections.component').then((c) => c.SectionsComponent)
      },
      {
        path: 'teams',
        loadComponent: () => import('./admin/pages/teams/teams.component').then((c) => c.TeamsComponent)
      },
      {
        path: 'managers',
        loadComponent: () => import('./admin/pages/managers/managers.component').then((c) => c.ManagersComponent)
      },
      {
        path: 'members',
        loadComponent: () => import('./admin/pages/members/members.component').then((c) => c.MembersComponent)
      },
      {
        path: 'member/:id',
        loadComponent: () => import('./admin/pages/member/member.component').then((m) => m.MemberComponent)
      },
      {
        path: 'manager/:id',
        loadComponent: () => import('./admin/pages/manager/manager-profil.component').then((m) => m.ManagerProfilComponent)
      },      {
        path: 'projects',
        loadComponent: () => import('./admin/pages/projects/projects.component').then((m) => m.ProjectsComponent)
      },
      {
        path: 'profil',
        loadComponent: () => import('./admin/pages/profil/profil.component').then((c) => c.ProfilComponent)
      }
      // ... other admin routes ...
    ]
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}