// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { EmployeLayoutComponent } from './theme/layouts/employe-layout/employe-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/default',
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
        path: 'documents',
        loadComponent: () =>
          import('./demo/default/dashboard/documents-projet/documents-projet.component').then((m) => m.DocumentsProjetComponent)
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component')
      }
    ]
  },
  {
    path: '',
    component: EmployeLayoutComponent,
    children: [
      {
        path: 'employe',
        loadComponent: () => import('./demo/default/employe/landing-page/landing-page.component').then((m) => m.LandingPageComponent)
      },
      {
        path: 'projets',
        loadComponent: () => import('./demo/default/employe/list-projets/list-projets.component').then((m) => m.ListProjetsComponent)
      },
      {
        path: 'taches',
        loadComponent: () => import('./demo/default/employe/employe-taches/employe-taches.component').then((m) => m.EmployeTachesComponent)
      },
      {
        path: 'rapports',
        loadComponent: () => import('./demo/default/employe/rapports-table/rapports-table.component').then(m=>m.RapportsTableComponent)
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
