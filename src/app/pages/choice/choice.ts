import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
//import { MapPlaceService } from '../../providers/MapPlaceService';
import { IonList } from '@ionic/angular';
import { IonSlides  } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'page-choice',
  templateUrl: 'choice.html',
  styleUrls: ['./choice.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChoicePage {
  pet: string = "puppies";
  places : any;
  model : {
    choiceTypes : [
        {
          code : '001',
          descEn : 'News',
          descTh : 'ข่าว',
          types : [
            'ข่าวการเมือง','ข่าวบันเทิง','ข่าวเศรษฐกิจ', 'ข่าวอาชญากรรม'
          ]
        }
      ]
  }

  slidesOpts = {
    initialSlide: 1,
    slidesPerView: 1.6,
    autoplay:true,
    speed: 400,
   };

  constructor(
    //public mapPlaceService: MapPlaceService,
    public router: Router
    ) {
      this.initail();
     }

  async initail() {}

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }
  
  onRssFeed() {  //  Re Direct TO Signup page.
    this.router.navigateByUrl('/app/tabs/rss-feed');
  }

  onMap (){
    this.router.navigateByUrl('/app/tabs/map');
  }

  onRestaurant (){
    this.router.navigateByUrl('/app/tabs/restaurant');
  }
}
