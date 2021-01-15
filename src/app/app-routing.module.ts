import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  {path:'', component:LoginComponent, pathMatch: "full"},
  {path:'home', component:HomeComponent, pathMatch: "full"} // <-- 設定LoginComponent的path
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
