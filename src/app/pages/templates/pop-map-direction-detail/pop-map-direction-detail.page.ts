import { Component, NgZone } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
declare var google: any;
@Component({
  selector: 'pop-map-direction-detail',
  templateUrl: './pop-map-direction-detail.page.html',
  styleUrls: ['./pop-map-direction-detail.page.scss'],
})
export class PopMapDirectionDetailPage {

  props: any;
  map: any;
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  searchFromToModel: any;
  autocompleteItems: any = new Array<any>();
  nearbyItems: any = new Array<any>();

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private zone: NgZone
    ) {
    this.props = navParams.get('props');
    //this.geocoder = new google.maps.Geocoder;
    //let elem = document.createElement("divPlaces")
    //this.GooglePlaces = new google.maps.places.PlacesService(elem);
    //this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.onInitail();
  }

  onInitail(){
    
    this.props.autocompleteItems = [];
    this.props.autocomplete = {
        input: null
      };
    if(!this.props.searchStartEndModel){
      this.props.searchStartEndModel = {
        start: null,
        end: null,
      };
    }
      
  }

  close() {
    this.modalCtrl.dismiss(this.props.searchStartEndModel);
  }

  updateSearchResults(event){
    console.log(event.target.value);
    if (event.target.value == '') {
      this.props.autocomplete.input = null;
      this.props.autocompleteItems = [];
      return;
    }
    this.props.GoogleAutocomplete.getPlacePredictions({ input: event.target.value },
      (predictions, status) => {
        this.props.autocomplete.input = event.target.value;
        this.props.autocompleteItems = [];
        if(predictions){
          this.props.zone.run(() => {
            predictions.forEach((prediction) => {
              this.props.autocompleteItems.push(prediction);
            });
          });
        }
    });
  }

  selectSearchResult(item){
    //this.clearMarkers();
    this.props.autocompleteItems = [];
    this.props.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
        /*
        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.props.map
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
          });
        })
        this.props.markers.push(marker);
        */
        this.props.map.setCenter(results[0].geometry.location);

        if(!this.props.searchStartEndModel.start){
          this.props.searchStartEndModel.start = {
            address: results[0].formatted_address,
            lat: results[0].geometry.location.lat,
            lng: results[0].geometry.location.lng
          };
        } else if (!this.props.searchStartEndModel.end) {
          this.props.searchStartEndModel.end = {
            address: results[0].formatted_address,
            lat: results[0].geometry.location.lat,
            lng: results[0].geometry.location.lng
          };
        }
        this.props.autocomplete.input = null;
      }
    })
  }

  tryDirection(event){
    this.props.directionsDisplay.setMap(this.props.map);
    this.props.directionsService.route({
      origin: this.props.searchStartEndModel.start.address,
      destination: this.props.searchStartEndModel.end.address,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        console.log(response);
        this.props.directionsDisplay.setDirections(response);
        this.props.searchStartEndModel.route = response.routes[0].legs[0];
      } else {
        window.alert('Directions request failed due to ' + status);
      }     
    });
  }

}