import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { EmployeLayoutComponent } from './theme/layouts/employe-layout/employe-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { GuestGuard } from './core/guards/guest.guard';
import { RoleGuard } from './core/guards/role.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './theme/layouts/not-found/not-found.component';
import { RootRedirectGuard } from './core/guards/redirect.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [RootRedirectGuard],
    children: [] // This route will be handled by the guard
  },
  {
    path: 'manager',
    component: AdminComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'CHEF' },
    children: [
      {
        path: '',
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
            loadComponent: () => import('./manager/pages/members/members.component').then((m) => m.MembersComponent)
          },
          {
            path: 'member/:id',
            loadComponent: () => import('./manager/pages/member/member.component').then((m) => m.MemberComponent)
          },
          {
            path: 'team/:teamName/:id/projects',
            loadComponent: () => import('./manager/pages/projects/projects.component').then((m) => m.ProjectsComponent)
          },
          {
            path: 'projects/:teamId/:projectName/:id/tasks',
            loadComponent: () => import('./manager/pages/tasks/tasks.component').then((m) => m.TasksComponent)
          },
          {
            path: 'reports',
            loadComponent: () => import('./manager/pages/reports/reports.component').then((m) => m.ReportsComponent)
          },
          {
            path: 'documents',
            loadComponent: () => import('./manager/pages/deliverables/deliverables.component').then((m) => m.DeliverablesComponent)
          },
          {
            path: 'membres',
            loadComponent: () => import('./manager/pages/all-members/all-members.component').then((m) => m.AllMembersComponent)
          },
          {
            path: 'tasks',
            loadComponent: () => import('./manager/pages/tasks/tasks.component').then((m) => m.TasksComponent)
          },
          {
            path: 'profil',
            loadComponent: () => import('./manager/pages/profil/profil.component').then((m) => m.ProfilComponent)
          },
          {
            path: '**',
            component: NotFoundComponent
          }
        ]
      }
    ]
  },
  {
    path: 'member',
    component: EmployeLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
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
        path: 'taches',
        loadComponent: () => import('./member/pages/tasks/tasks.component').then((c) => c.TasksComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./member/pages/profil/profil.component').then((c) => c.ProfilComponent)
      },
      {
        path: 'reports',
        loadComponent: () => import('./member/pages/reports/reports.component').then((c) => c.ReportsComponent)
      }
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
        path: 'departments',
        loadComponent: () => import('./admin/pages/departments/departments.component').then((c) => c.DepartmentsComponent)
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
      },
      // ... other employee routes
    ]
  },
  // Guest routes
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
