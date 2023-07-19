import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login',  pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./views/login/login.module').then( m => m.LoginPageModule) },
  { path: 'home', canActivate: [AuthGuard], loadChildren: () => import('./views/home/home.module').then( m => m.HomePageModule) },
  {
    path: 'modal-config-server',
    loadChildren: () => import('./views/modals/modal-config-server/modal-config-server.module').then( m => m.ModalConfigServerPageModule)
  },
  {
    path: 'modal-config-server',
    loadChildren: () => import('./views/modals/modal-config-server/modal-config-server.module').then( m => m.ModalConfigServerPageModule)
  },
  {
    path: 'modal-config-server',
    loadChildren: () => import('./views/modals/modal-config-server/modal-config-server.module').then( m => m.ModalConfigServerPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
