import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../../providers/restaurant.service';

@Component({
  selector: 'restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage {
  cart = [];
  items = [];
  allShop = [];
  shop : any;
 
  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };
 
  constructor(private router: Router, private restaurantService: RestaurantService) {
    // URL EXAMPLE : https://devdactic.com/dynamic-ionic-4-slides/
    //  for load first time and keep.
   }

   initailData(){
    this.items = this.restaurantService.getProducts();
    this.cart = this.restaurantService.getCart();
    this.restaurantService.getAllShop().subscribe(data => {
        console.log(data);
        this.allShop = data.shops;
    });
   }

   resetData(){
    this.cart = [];
    this.items = [];
    this.allShop = [];
   }

  ionViewWillEnter() {
    console.log('ionViewWillEnter RestaurantPage');
    this.initailData(); 
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave RestaurantPage');
    this.resetData();
  }
 
  goToShop(id) {
    this.router.navigate(['restaurant-detail']);
    //this.shop = this.restaurantService.getShopById(id);
  }

  addToCart(product) {
    this.restaurantService.addProduct(product);
  }
 
  openCart() {
    this.router.navigate(['cart']);
  }

}
