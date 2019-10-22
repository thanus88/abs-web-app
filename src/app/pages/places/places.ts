import { Component, NgZone } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
declare var google: any;
@Component({
  selector: 'places-map',
  templateUrl: 'places.html',
  styleUrls: ['.places.scss'],
})
export class PlacesPage {
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  autocompleteItems: any;
  nearbyItems: any = new Array<any>();
  placeTypes: any;

  constructor(
    public zone: NgZone,
    public loadingCtrl: LoadingController,
    public modalCtrl : ModalController
  ) {

    this.geocoder = new google.maps.Geocoder;
    let elem = document.createElement("div")
    this.GooglePlaces = new google.maps.places.PlacesService(elem);
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = {
      input: null
    };
    this.autocompleteItems = [];
    this.placeTypes = ['restaurant'];
  }

  updateSearchResults(event){
    if (event.target.value == '') {
      this.autocompleteItems = [];
      this.autocomplete.input = null;
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: event.target.value },
      (predictions, status) => {
        this.autocompleteItems = [];
        if(predictions){
          this.zone.run(() => {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
          });
        }
    });
  }

  selectSearchResult(item){
    this.loadingCtrl.create();
    this.autocompleteItems = [];
    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
        this.autocompleteItems = [];
        this.GooglePlaces.nearbySearch({
          location: results[0].geometry.location,
          radius: '500',
          //types: this.placeTypes, //check other types here https://developers.google.com/places/web-service/supported_types
          // key: 'YOUR_KEY_HERE'
        }, (near_places) => {
          this.zone.run(() => {
            this.nearbyItems = [];
            console.log(near_places[0]);
            for (var i = 0; i < near_places.length; i++) {
              this.nearbyItems.push(near_places[i]);
            }
            //this.loadingCtrl.dismiss();
          });
        })
      }
    })
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
