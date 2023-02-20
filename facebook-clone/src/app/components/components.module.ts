import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { HomeComponent } from './home/home.component';
import { ComponentsComponent } from './components.component';
import { CoursesResolver } from '../shared/store/resolver/courses.resolver';


@NgModule({
  declarations: [
    HomeComponent,
    ComponentsComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    
  ],
  providers: [CoursesResolver]
})
export class ComponentsModule { }
