import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { EmployeLayoutComponent } from './theme/layouts/employe-layout/employe-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { GuestGuard } from './guards/guest.guard';
import { RoleGuard } from './guards/role.guard';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './theme/layouts/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'chef',
    component: AdminComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'CHEF' },
    children: [
      {
        path: '',
        children: [
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full'
          },
          {
            path: 'dashboard',
            loadComponent: () => import('./demo/default/dashboard/dashboard.component').then((c) => c.DefaultComponent)
          },
          {
            path: 'equipe/:nomEquipe/:id/employes',
            loadComponent: () => import('./demo/default/dashboard/employes/employes.component').then((m) => m.EmployesComponent)
          },
          {
            path: 'employe/:id',
            loadComponent: () =>
              import('./demo/default/dashboard/employe-profil/employe-profil.component').then((m) => m.EmployeProfilComponent)
          },
          {
            path: 'equipe/:nomEquipe/:id/projets',
            loadComponent: () => import('./demo/default/dashboard/projets/projets.component').then((m) => m.ProjetsComponent)
          },
          {
            path: 'projets/:eqpId/:nomProjet/:id/taches',
            loadComponent: () => import('./demo/default/dashboard/taches/taches.component').then((m) => m.TachesComponent)
          },
          {
            path: 'taches/:id/commentaires',
            loadComponent: () => import('./demo/default/dashboard/comments-section/comments-section.component').then((m) => m.CommentsSectionComponent)
          },
          {
            path: 'rapports',
            loadComponent: () =>
              import('./demo/default/dashboard/rapports-employe/rapports-employe.component').then((m) => m.RapportsEmployeComponent)
          },
          {
            path: 'documents',
            loadComponent: () =>
              import('./demo/default/dashboard/documents-projet/documents-projet.component').then((m) => m.DocumentsProjetComponent)
          },
          {
            path: 'sample-page',
            loadComponent: () => import('./demo/other/sample-page/sample-page.component')
          },
          {
            path: '**',
            component: NotFoundComponent
          }
        ]
      }
    ]},
  // },  {
  //   path: 'employe',
  //   component: EmployeLayoutComponent,
  //   canActivate: [AuthGuard, RoleGuard],
  //   data: { expectedRole: 'USER' },
  //   children: [
  //     {
  //       path: '',
  //       children: [
  //         {
  //           path: '',
  //           redirectTo: 'acceuil',
  //           pathMatch: 'full'
  //         },
  //         {
  //           path: 'acceuil',
  //           loadComponent: () => import('./demo/default/employe/landing-page/landing-page.component').then((c) => c.LandingPageComponent)
  //         },
         
  //         {
  //           path: '**',
  //           component: NotFoundComponent
  //         }
  //       ]
  //     }
  //   ]
  // },

  // Guest routes
  {
    path: '',
    component: GuestComponent,
    canActivate: [GuestGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./demo/default/landing/landing.component').then((m) => m.LandingComponent)
      },
      {
        path: 'login',
        loadComponent: () => import('./demo/default/login-page/login-form/login-form.component').then((m) => m.LoginFormComponent)
      },
      {
        path: '404',
        component: NotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
