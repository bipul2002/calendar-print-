import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourtCalendarComponent } from './court-calendar/court-calendar.component';

const routes: Routes = [  {
  path: '',
  redirectTo: '/court-calendar',
  pathMatch: 'full',
},

{
  path: 'court-calendar',
  component: CourtCalendarComponent,
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
