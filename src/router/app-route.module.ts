import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsComponent } from '.././app/charts/charts.component'

const routes: Routes =[
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {path:'',component: ChartsComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)  
  ],
  exports:[RouterModule],
  declarations: []
})
export class AppRouteModule {

 }
