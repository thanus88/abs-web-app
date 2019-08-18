import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VideoPage } from './video';

const routes: Routes = [
  {
    path: '',
    component: VideoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoPageRoutingModule { }
