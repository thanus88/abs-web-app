import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs-page';
import { TabsPageRoutingModule } from './tabs-page-routing.module';
import { ChoiceModule } from '../choice/choice.module';
import { RssFeedModule } from '../rss-feed/rss-feed.module';
import { VideoModule } from '../video/video.module';
import { MapModule } from '../map/map.module';
import { MapFromToPageModule } from '../map-from-to/map-from-to.module';
import { PopMapDirectionDetailPageModule} from '../templates/pop-map-direction-detail/pop-map-direction-detail.module';

@NgModule({
  imports: [
    //AboutModule,
    CommonModule,
    IonicModule,
    MapModule,
    TabsPageRoutingModule,
    ChoiceModule,
    RssFeedModule,
    VideoModule,
    MapFromToPageModule,
    PopMapDirectionDetailPageModule
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsModule { }
