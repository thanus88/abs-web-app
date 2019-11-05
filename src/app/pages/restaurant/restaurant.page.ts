import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../../providers/restaurant.service';

@Component({
  selector: 'restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {
  cart = [];
  items = [];
 
  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };
 
  constructor(private router: Router, private restaurantService: RestaurantService) { }

  // URL EXAMPLE : https://devdactic.com/dynamic-ionic-4-slides/
 
  ngOnInit() {
    this.items = this.restaurantService.getProducts();
    this.cart = this.restaurantService.getCart();
  }
 
  addToCart(product) {
    this.restaurantService.addProduct(product);
  }
 
  openCart() {
    this.router.navigate(['cart']);
  }

}
