import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),  canActivate: [ AuthGuardService ] 
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
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),  canActivate: [ AuthGuardService ] 
  },
  {
    path: 'terminos',
    loadChildren: () => import('./pages/terminos/terminos.module').then( m => m.TerminosPageModule)
  },
 {
    path: 'datos-personales',
    loadChildren: () => import('./pages/datos-personales/datos-personales.module').then( m => m.DatosPersonalesPageModule),  canActivate: [ AuthGuardService ] 
  },
 {
    path: 'contrase',
    loadChildren: () => import('./pages/contrase/contrase.module').then( m => m.ContrasePageModule),  canActivate: [ AuthGuardService ] 
  },
  {
    path: 'solicitudes-chat-detalles',
    loadChildren: () => import('./pages/solicitudes-chat-detalles/solicitudes-chat-detalles.module').then( m => m.SolicitudesChatDetallesPageModule),  canActivate: [ AuthGuardService ] 
  },
  {
    path: 'presupuestar',
    loadChildren: () => import('./pages/presupuestar/presupuestar.module').then( m => m.PresupuestarPageModule),  canActivate: [ AuthGuardService ] 
  }, {
    path: 'contratados-chat-detalles',
    loadChildren: () => import('./pages/contratados-chat-detalles/contratados-chat-detalles.module').then( m => m.ContratadosChatDetallesPageModule),  canActivate: [ AuthGuardService ] 
  },
  {
    path: 'servicios-historial',
    loadChildren: () => import('./pages/servicios-historial/servicios-historial.module').then( m => m.ServiciosHistorialPageModule),  canActivate: [ AuthGuardService ] 
  },
  {
    path: 'direccion',
    loadChildren: () => import('./pages/direccion/direccion.module').then( m => m.DireccionPageModule),  canActivate: [ AuthGuardService ] 
  },
  {
    path: 'promociones',
    loadChildren: () => import('./pages/promociones/promociones.module').then( m => m.PromocionesPageModule),  canActivate: [ AuthGuardService ] 
  },
  {
    path: 'documentos',
    loadChildren: () => import('./pages/documentos/documentos.module').then( m => m.DocumentosPageModule),  canActivate: [ AuthGuardService ] 
  },
  {
    path: 'factura-servicios',
    loadChildren: () => import('./pages/factura-servicios/factura-servicios.module').then( m => m.FacturaServiciosPageModule),  canActivate: [ AuthGuardService ] 
  },
  {
    path: 'factura-costos',
    loadChildren: () => import('./pages/factura-costos/factura-costos.module').then( m => m.FacturaCostosPageModule),  canActivate: [ AuthGuardService ] 
  },
  {
    path: 'recuperarcontrase',
    loadChildren: () => import('./pages/recuperarcontrase/recuperarcontrase.module').then( m => m.RecuperarcontrasePageModule)
  },
  {
    path: 'mapa',
    loadChildren: () => import('./pages/mapa/mapa.module').then( m => m.MapaPageModule), canActivate: [ AuthGuardService ] 
  },
  {
    path: 'costo-extra',
    loadChildren: () => import('./pages/costo-extra/costo-extra.module').then( m => m.CostoExtraPageModule),  canActivate: [ AuthGuardService ] 
  },
  {
    path: 'historial-detalles',
    loadChildren: () => import('./pages/historial-detalles/historial-detalles.module').then( m => m.HistorialDetallesPageModule),  canActivate: [ AuthGuardService ] 
  },
  {
    path: 'imagenmodal',
    loadChildren: () => import('./pages/imagenmodal/imagenmodal.module').then( m => m.ImagenmodalPageModule)
  },  {
    path: 'mapa-registro',
    loadChildren: () => import('./pages/mapa-registro/mapa-registro.module').then( m => m.MapaRegistroPageModule)
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./pages/notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule)
  }













];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
