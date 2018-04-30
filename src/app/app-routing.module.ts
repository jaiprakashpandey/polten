import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IntegrationService } from './integration.service';
import { StatusComponent } from './status/status.component';

const routes: Routes = [
{
path:'',
component: HomeComponent
},
{
path:'status',
component: StatusComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
