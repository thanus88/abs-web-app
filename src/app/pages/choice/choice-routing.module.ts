import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChoicePage } from './choice';

const routes: Routes = [
  {
    path: '',
    component: ChoicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChoicePageRoutingModule { }
