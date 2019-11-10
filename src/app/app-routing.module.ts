import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tutorial',
    pathMatch: 'full'
  },
  {
    path: 'account',
    loadChildren: './pages/account/account.module#AccountModule'
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginModule'
  },
  {
    path: 'signup',
    loadChildren: './pages/signup/signup.module#SignUpModule'
  },
  {
    path: 'app',
    loadChildren: './pages/tabs-page/tabs-page.module#TabsModule'
  },
  {
    path: 'tutorial',
    loadChildren: './pages/tutorial/tutorial.module#TutorialModule'
  },
  { path: 'map-from-to', loadChildren: './pages/map-from-to/map-from-to.module#MapFromToPageModule' },
  { path: 'pop-map-direction-detail', loadChildren: './pages/templates/pop-map-direction-detail/pop-map-direction-detail.module#PopMapDirectionDetailPageModule' },
  { path: 'restaurant', loadChildren: './pages/restaurant/restaurant.module#RestaurantPageModule' },  { path: 'restaurant-detail', loadChildren: './pages/restaurant-detail/restaurant-detail.module#RestaurantDetailPageModule' }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
