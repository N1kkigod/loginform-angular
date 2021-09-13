import { InfoComponent } from './info/info.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'info', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'info', component: InfoComponent },
  { path: 'logout', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
