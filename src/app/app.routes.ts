import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LeversComponent } from './components/levers/levers.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { NumberWheelComponent } from './components/number-wheel/number-wheel.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'levers', component: LeversComponent},
  {path: 'buttons', component:ButtonsComponent},
  {path: 'numWheel', component: NumberWheelComponent}
];
