import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { ActivatedRoute } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonContent } from '@ionic/angular';

declare var RSSParser;
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
//const CORS_PROXY = "http://localhost:1337/";

@Component({
  selector: 'page-rss-feed',
  templateUrl: 'rss-feed.html'
})
export class RssFeedPage {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild('targetUrl') targetUrl: string;
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  model = {
    defaultUrl : 'https://news.google.com/rss?hl=th&gl=TH&ceid=TH:th',
    targetUrl : null,
    result : {},
    feedSourceSelected : '',
    feedTypeSource : {
      feedTypes : [
        {
          code : '001',
          descEn : 'News',
          descTh : 'ข่าว'
        }
      ],
      feedSource : [
        {
          venderName : 'Google News',
          logoUrl : '',
          types : [
            {
              descTh : 'ข่าวเด่นวันนี้',
              descEn : 'News',
              url : 'https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FuUm9HZ0pVU0NnQVAB?hl=th&gl=TH&ceid=TH%3Ath'
            }
          ]
        },
        {
          venderName : 'SANOOK',
          logoUrl : '',
          types : [
            {
              descTh : 'ข่าวการเมือง',
              descEn : 'Politic',
              url : 'http://rssfeeds.sanook.com/rss/feeds/sanook/news.politic.xml'
            },
            {
              descTh : 'ข่าวบันเทิง',
              descEn : 'Entertain',
              url : 'http://rssfeeds.sanook.com/rss/feeds/sanook/news.entertain.xml'
            },
            {
              descTh : 'ข่าวอาชญากรรม',
              descEn : 'Crime',
              url : 'http://rssfeeds.sanook.com/rss/feeds/sanook/news.crime.xml'
            },
            {
              descTh : 'ข่าวต่างประเทศ',
              descEn : 'World',
              url : 'http://rssfeeds.sanook.com/rss/feeds/sanook/news.world.xml'
            },
            {
              descTh : 'ข่าวเศรษฐกิจ',
              descEn : 'Economic',
              url : 'http://rssfeeds.sanook.com/rss/feeds/sanook/news.economic.xml'
            }
          ]
        },
        {
          venderName : 'CH3',
          logoUrl : '',
           types : [
            {
              descTh : 'ข่าวการเมือง',
              descEn : 'Politic',
              url : 'http://news.ch3thailand.com/rss/PoliticsNews.rss'
            },
            {
              descTh : 'ข่าวบันเทิง',
              descEn : 'Entertain',
              url : 'http://news.ch3thailand.com/rss/EntertainmentNews.rss'
            },
            {
              descTh : 'ข่าวอาชญากรรม',
              descEn : 'Crime',
              url : 'http://news.ch3thailand.com/rss/CrimeNews.rss'
            },
            {
              descTh : 'ข่าวต่างประเทศ',
              descEn : 'World',
              url : 'http://news.ch3thailand.com/rss/InternationalNews.rss'
            },
            {
              descTh : 'ข่าวเศรษฐกิจ',
              descEn : 'Economic',
              url : 'http://news.ch3thailand.com/rss/EconomicNews.rss'
            }
          ]
        },
        {
          venderName : 'THAIRAT',
          logoUrl : '',
          types : [
            {
              descTh : 'ข่าวเด่นวันนี้',
              descEn : 'News',
              url : 'https://www.thairath.co.th/rss/news'
            }
          ]
        }
      ]
    }
  }
  entries : Array<any> = [];

  constructor(
    private dataProvider: ConferenceData,
    private route: ActivatedRoute,
    private iab: InAppBrowser
  ) {}
/*
  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
      if (
        data &&
        data.schedule &&
        data.schedule[0] &&
        data.schedule[0].groups
      ) {
        const sessionId = this.route.snapshot.paramMap.get('sessionId');
        for (const group of data.schedule[0].groups) {
          if (group && group.sessions) {
            for (const session of group.sessions) {
              if (session && session.id === sessionId) {
                this.session = session;
                break;
              }
            }
          }
        }
      }
    });
  }
*/
  ionViewWillEnter() {
    console.log('ionViewDidLoad RSSPage');

  }
  openUrl(entry){
      console.log('openUrl');
      this.iab.create(entry.link,"_system");

  }
  parseUrlWrapper(url){
    console.log('parseUrlWrapper');
    let parser = new RSSParser();
    return new Promise((resolve,reject)=>{
      parser.parseURL(CORS_PROXY + this.model.targetUrl, function(err, parsed) {
          console.log(parsed);
          if(err){
            reject(err);
          }
          resolve(parsed);
      });
    });
  }
  parseUrl(url){
    console.log('parseUrl');

    if(!url){
      url = this.model.defaultUrl;
    } else {
      this.model.targetUrl = url;
    }
    this.parseUrlWrapper(this.model.targetUrl).then((entries : any)=>{
        this.model.result = entries;
    })
    
  }

  onClickFeedSource(item){
    this.model.feedSourceSelected = item;
    this.scrollToTop();
  }

  getItems(ev) {
    // set val to the value of the ev target
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.model.result['items'] = this.model.result['items'].filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  onSearchBarClear(ev){
    console.log(this.model.result['items']);
  }

  share(entry){}

  unread(entry){}

  scrollToTop(){
    this.content.scrollToTop(1500);
  }
}
