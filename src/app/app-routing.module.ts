import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login',  pathMatch: 'full' },
  { path: 'splash', loadChildren: () => import('./views/splash/splash.module').then( m => m.SplashPageModule) },
  { path: 'login', loadChildren: () => import('./views/login/login.module').then( m => m.LoginPageModule) },
  { path: 'home', canActivate: [AuthGuard], loadChildren: () => import('./views/home/home.module').then( m => m.HomePageModule) },
  { path: 'modal-config-server', loadChildren: () => import('./views/modals/modal-config-server/modal-config-server.module').then( m => m.ModalConfigServerPageModule)},
  { path: 'tarefa-checklist', canActivate: [AuthGuard], loadChildren: () => import('./views/tarefa-checklist/tarefa-checklist.module').then( m => m.TarefaChecklistPageModule)},
  { path: 'response-checklist-modal', loadChildren: () => import('./views/modals/checklist/response-checklist/response-checklist.module').then( m => m.ResponseChecklistPageModule)},
  {
    path: 'checklist-question',
    loadChildren: () => import('./views/checklist-question/checklist-question.module').then( m => m.ChecklistQuestionPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
