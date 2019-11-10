import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../../providers/restaurant.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'restaurant-detail',
  templateUrl: './restaurant-detail.page.html',
  styleUrls: ['./restaurant-detail.page.scss'],
})
export class RestaurantDetailPage {
  cart = [];
  items = [];
  shop : Observable<any>;
 
  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };
 
  constructor(private router: Router, private restaurantService: RestaurantService) {
    this.initailData(); //  for load first time and keep.
  }

  initailData(){
    this.items = this.restaurantService.getProducts();
    this.cart = this.restaurantService.getCart();
    this.restaurantService.getShopById().subscribe(data => {
      this.shop = data.shop;
    });
  }

  resetData(){
   this.cart = [];
   this.items = [];
  }

 ionViewWillEnter() {
   console.log('ionViewWillEnter RestaurantDetailPage');
 }

 ionViewDidLeave() {
   console.log('ionViewDidLeave RestaurantDetailPage');
   this.resetData();
 }
 
  addToCart(product) {
    this.restaurantService.addProduct(product);
  }
 
  openCart() {
    this.router.navigate(['cart']);
  }

}

