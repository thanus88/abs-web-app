import { Component, NgZone,ViewEncapsulation } from '@angular/core';
//import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController, Platform, PopoverController, ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { MapFromToPage } from '../map-from-to/map-from-to.page';
import { PopMapDirectionDetailPage } from '../templates/pop-map-direction-detail/pop-map-direction-detail.page';

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

  directionsService: any;
  directionsDisplay: any;
  nearbyItems: any = new Array<any>();
  autocompleteItems: any = new Array<any>();
  toggleSearchBar: any;
  searchFromToModel: any;

  constructor(
    public platform: Platform,
    public zone: NgZone,
    public loadingCtrl: LoadingController,
    public modalController: ModalController,
    public popoverController: PopoverController,
    public toastController: ToastController
  ) {
    this.platform.ready().then(()=>{
      this.geocoder = new google.maps.Geocoder;
      let elem = document.createElement("divPlaces")
      this.GooglePlaces = new google.maps.places.PlacesService(elem);
      this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
      this.directionsService = new google.maps.DirectionsService();
      this.directionsDisplay = new google.maps.DirectionsRenderer();
      //this.loading = this.loadingCtrl.create();
      this.onInitail();
    });
  }

  onInitail(){
    this.autocompleteItems = [];
      this.markers = [];
      this.toggleSearchBar = false;
      this.autocomplete = {
        input: null
      };
      this.searchFromToModel = {
        from: null,
        to: null,
      };
  }

  ionViewDidEnter(){
      // let infoWindow = new google.maps.InfoWindow({map: map});
      //Set latitude and longitude of some place
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.9011, lng: -56.1645},
      zoom: 15
    });
  }

  tryGeolocation(event){
    //this.loading.present();
    this.clearMarkers();//remove previous markers
    this.directionsDisplay.setMap(null);
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
      this.autocomplete.input = null;
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: event.target.value },
      (predictions, status) => {
        this.autocomplete.input = event.target.value;
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
    //this.clearMarkers();
    this.autocompleteItems = [];
    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map
        });

        this.GooglePlaces.nearbySearch({
          location: results[0].geometry.location,
          radius: '500',
          types: ['restaurant'], //check other types here https://developers.google.com/places/web-service/supported_types
          // key: 'YOUR_KEY_HERE'
        }, (near_places) => {
          this.zone.run(() => {
            this.nearbyItems = [];
            for (var i = 0; i < near_places.length; i++) {
              this.nearbyItems.push(near_places[i]);
            }
            //this.loading.dismiss();
          });
        })

        this.markers.push(marker);
        this.map.setCenter(results[0].geometry.location);

        if(!this.searchFromToModel.from){
          this.searchFromToModel.from = {
            address: results[0].formatted_address,
            lat: results[0].geometry.location.lat,
            lng: results[0].geometry.location.lng
          };
        } else if (!this.searchFromToModel.to) {
          this.searchFromToModel.to = {
            address: results[0].formatted_address,
            lat: results[0].geometry.location.lat,
            lng: results[0].geometry.location.lng
          };
        }
        this.autocomplete.input = null;
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

  async presentModal(event) {

    const modal = await this.modalController.create({
      component: PopMapDirectionDetailPage,
      cssClass: 'custom-modal-css',
      componentProps: {props : this.searchFromToModel}
    });
   
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.searchFromToModel = dataReturned.data;
      }
    });

    return await modal.present();
  }

  setToggleSearchBar(event){
    this.toggleSearchBar = !this.toggleSearchBar;
    if(!this.searchFromToModel.from){
      this.searchFromToModel = {
        from:null,
        to:null
      };
    }
  }

  tryDirection(event){
    this.directionsDisplay.setMap(this.map);
    this.directionsService.route({
      origin: this.searchFromToModel.from.address,
      destination: this.searchFromToModel.to.address,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        console.log(response);
        this.directionsDisplay.setDirections(response);
        this.searchFromToModel.route = response.routes[0].legs[0];
        this.presentToastWithOptions(event);
      } else {
        window.alert('Directions request failed due to ' + status);
      }     
    });
  }

  async presentToastWithOptions(event) {
    const toast = await this.toastController.create({
      header: 'เส้นทาง : ',
      message: this.searchFromToModel.from.address+ ' To '+this.searchFromToModel.to.address,
      position: 'bottom',
      duration: 10000,
      translucent: true,
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'See More',
          handler: () => {
            console.log('See More clicked');
            this.presentModal(event);
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  async presentPopover(event: any) {
    const popover = await this.popoverController.create({
      component: PopMapDirectionDetailPage,
      event: event,
      translucent: true
    });
    return await popover.present();
  }

}