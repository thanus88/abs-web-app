import { Component, NgZone,ViewEncapsulation } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController, Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { MapFromToPage } from '../map-from-to/map-from-to.page';

declare var google: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  styleUrls: ['./map.scss'],
  encapsulation: ViewEncapsulation.None

})
export class MapPage {

  map: any;
  markers: any;
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  autocompleteItems: any;
  //loading: any;

  constructor(
    public platform: Platform,
    public zone: NgZone,
    public loadingCtrl: LoadingController,
    public modalController: ModalController
    //public geolocation: Geolocation
  ) {
    this.platform.ready().then(()=>{
      this.geocoder = new google.maps.Geocoder;
      let elem = document.createElement("divPlaces")
      this.GooglePlaces = new google.maps.places.PlacesService(elem);
      this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
      this.autocomplete = {
        input: ''
      };
      this.autocompleteItems = [];
      this.markers = [];
      //this.loading = this.loadingCtrl.create();

      //this.tryGeolocation();
    });
  }

  ionViewDidEnter(){
      // let infoWindow = new google.maps.InfoWindow({map: map});
      //Set latitude and longitude of some place
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.9011, lng: -56.1645},
      zoom: 15
    });
  }

  tryGeolocation(){
    //this.loading.present();
    this.clearMarkers();//remove previous markers
    //set options.. 
    let options = {
           timeout: 5000, 
           enableHighAccuracy: false, 
           maximumAge: 0
       }
    //this.geolocation.getCurrentPosition((resp) => {   
    navigator.geolocation.getCurrentPosition((resp) => {
      let pos = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      };
      let marker = new google.maps.Marker({
        position: pos,
        map: this.map,
        title: 'I am here!'
      });
      this.markers.push(marker);
      this.map.setCenter(pos);
      //this.loading.dismiss();
    
    },(error) => {
      console.log('Error getting location', error);
      //this.loading.dismiss();
    },options);
    
  }

  updateSearchResults(event){
    console.log(event.target.value);
    if (event.target.value == '') {
      this.autocompleteItems = [];
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

  selectSearchFromResult(item){
    this.clearMarkers();
    this.autocompleteItems = [];

    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
         let position = {
             lat: results[0].geometry.location.lat,
             lng: results[0].geometry.location.lng
         };
        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map
        });
        this.markers.push(marker);
        this.map.setCenter(results[0].geometry.location);
      }
    })
  }

  selectSearchToResult(item){
    this.clearMarkers();
    this.autocompleteItems = [];

    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
         let position = {
             lat: results[0].geometry.location.lat,
             lng: results[0].geometry.location.lng
         };
        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map
        });
        this.markers.push(marker);
        this.map.setCenter(results[0].geometry.location);
      }
    })
  }

  clearMarkers(){
    for (var i = 0; i < this.markers.length; i++) {
      console.log(this.markers[i])
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: MapFromToPage,
      componentProps: {
        'firstName': 'Douglas',
        'lastName': 'Adams',
        'middleInitial': 'N'
      }
    });
    return await modal.present();
  }

}
