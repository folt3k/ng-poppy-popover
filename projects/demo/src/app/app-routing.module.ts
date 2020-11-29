import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicComponent } from './pages/basic/basic.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'components/basic',
    pathMatch: 'full'
  },
  {
    path: 'components',
    children: [
      {
        path: 'basic',
        component: BasicComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
