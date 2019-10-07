import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs-page';
import { TabsPageRoutingModule } from './tabs-page-routing.module';
import { ChoiceModule } from '../choice/choice.module';
import { RssFeedModule } from '../rss-feed/rss-feed.module';
import { VideoModule } from '../video/video.module';
import { MapModule } from '../map/map.module';

@NgModule({
  imports: [
    //AboutModule,
    CommonModule,
    IonicModule,
    MapModule,
    TabsPageRoutingModule,
    ChoiceModule,
    RssFeedModule,
    VideoModule
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsModule { }
