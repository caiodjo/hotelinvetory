import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  {path: 'employees', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule), canActivate: [LoginGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'rooms', loadChildren: ()=> import('./rooms/rooms.module').then(m => m.RoomsModule)
  // , canActivate: [LoginGuard], canLoad: [LoginGuard]
  },
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: '/404'},
  {path: '404', component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
