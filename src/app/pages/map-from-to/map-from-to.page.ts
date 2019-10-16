import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'map-from-to',
  templateUrl: './map-from-to.page.html',
  styleUrls: ['./map-from-to.page.scss'],
})
export class MapFromToPage implements OnInit {

  constructor(public modalCtrl : ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
