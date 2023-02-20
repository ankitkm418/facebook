import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesResolver } from '../shared/store/resolver/courses.resolver';
import { ComponentsComponent } from './components.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { 
    path: '',
    component: ComponentsComponent,
    children: [
      { path: '', component: HomeComponent , resolve: {
        courses: CoursesResolver
      }}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
