import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoPage } from './video';
import { VideoPageRoutingModule } from './video-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    VideoPageRoutingModule
  ],
  declarations: [
    VideoPage,
  ],
  entryComponents: [],
  bootstrap: [VideoPage]
})
export class VideoModule { }
