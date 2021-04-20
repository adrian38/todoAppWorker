import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule), /* canActivate: [ AuthGuardService ] */
  },
  {
    path: 'login-user',
    loadChildren: () => import('./pages/login-user/login-user.module').then( m => m.LoginUserPageModule)
  },
  {
    path: 'create-account',
    loadChildren: () => import('./pages/create-account/create-account.module').then( m => m.CreateAccountPageModule)
  },
  {
    path: 'new-request',
    loadChildren: () => import('./pages/new-request/new-request.module').then( m => m.NewRequestPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule), /* canActivate: [ AuthGuardService ] */
  },
  {
    path: 'terminos',
    loadChildren: () => import('./pages/terminos/terminos.module').then( m => m.TerminosPageModule)
  },
 {
    path: 'datos-personales',
    loadChildren: () => import('./pages/datos-personales/datos-personales.module').then( m => m.DatosPersonalesPageModule)
  },
 {
    path: 'contrase',
    loadChildren: () => import('./pages/contrase/contrase.module').then( m => m.ContrasePageModule), /* canActivate: [ AuthGuardService ] */
  },
  {
    path: 'solicitudes-chat-detalles',
    loadChildren: () => import('./pages/solicitudes-chat-detalles/solicitudes-chat-detalles.module').then( m => m.SolicitudesChatDetallesPageModule), /* canActivate: [ AuthGuardService ] */
  },
  {
    path: 'presupuestar',
    loadChildren: () => import('./pages/presupuestar/presupuestar.module').then( m => m.PresupuestarPageModule)
  }, {
    path: 'contratados-chat-detalles',
    loadChildren: () => import('./pages/contratados-chat-detalles/contratados-chat-detalles.module').then( m => m.ContratadosChatDetallesPageModule)
  },
  {
    path: 'servicios-historial',
    loadChildren: () => import('./pages/servicios-historial/servicios-historial.module').then( m => m.ServiciosHistorialPageModule)
  },
  {
    path: 'direccion',
    loadChildren: () => import('./pages/direccion/direccion.module').then( m => m.DireccionPageModule)
  }





];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
