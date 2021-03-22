import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicComponent } from './pages/basic/basic.component';
import { MenuComponent } from './pages/menu/menu.component';
import { TooltipComponent } from './pages/tooltip/tooltip.component';
import { SelectComponent } from './pages/select/select.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'components/basic',
    pathMatch: 'full',
  },
  {
    path: 'components',
    children: [
      {
        path: 'basic',
        component: BasicComponent,
      },
      {
        path: 'menu',
        component: MenuComponent,
      },
      {
        path: 'select',
        component: SelectComponent,
      },
      {
        path: 'tooltip',
        component: TooltipComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
