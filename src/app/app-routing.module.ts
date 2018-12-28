import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { StylesListComponent } from './styles-list/styles-list.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'projects', component:  ProjectsComponent},
  { path: 'about', component: AboutComponent },
  { path: 'styles', component: StylesListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
