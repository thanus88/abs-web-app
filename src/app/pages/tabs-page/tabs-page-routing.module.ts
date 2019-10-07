import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs-page';
import { ChoicePage } from '../choice/choice';
import { RssFeedPage } from '../rss-feed/rss-feed';
import { VideoPage } from '../video/video';
import { MapPage } from '../map/map';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      // tab zero
      {
        path: 'choice',
        component: ChoicePage,
      },
      {
        path: 'rss-feed',
        component: RssFeedPage,
      },
      {
        path: 'video',
        component: VideoPage,
      },
      {
        path: 'map',
        component: MapPage,
      },
      // tab one
    /*  {
        path: 'schedule',
        component: SchedulePage,
        outlet: 'schedule'
      },
      {
        path: 'session/:sessionId',
        component: SessionDetailPage,
        outlet: 'schedule'
      },
      // tab two
      {
        path: 'speakers',
        component: SpeakerListPage,
        outlet: 'speakers'
      },
      {
        path: 'session/:sessionId',
        component: SessionDetailPage,
        outlet: 'speakers'
      },
      {
        path: 'speaker-details/:speakerId',
        component: SpeakerDetailPage,
        outlet: 'speakers'
      },
      // tab three
      {
        path: 'map',
        component: MapPage,
        outlet: 'map'
      }, 
       */
      // tab four
      {
        path: 'about',
        component: TabsPage,
        outlet: 'about'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
