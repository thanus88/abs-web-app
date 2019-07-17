import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs-page';

//import { AboutPage } from '../about/about';
//import { MapPage } from '../map/map';
//import { SchedulePage } from '../schedule/schedule';
//import { SessionDetailPage } from '../session-detail/session-detail';
//import { SpeakerDetailPage } from '../speaker-detail/speaker-detail';
//import { SpeakerListPage } from '../speaker-list/speaker-list';
import { ChoicePage } from '../choice/choice';
import { RssFeedPage } from '../rss-feed/rss-feed';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs/(choice:choice)',
    pathMatch: 'full'
  },
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
      // tab four
      {
        path: 'about',
        component: TabsPage,
        outlet: 'about'
      } */
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }