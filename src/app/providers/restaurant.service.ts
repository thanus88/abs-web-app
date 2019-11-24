import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Shop } from '../interfaces/shop.model';
 
@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
 
  private shopsListRef = this.db.list<Shop>('shops');
  private shop: Shop;
  private cart = [];
  private items = [];
 
    constructor(private db: AngularFireDatabase) { }

    public setShop(shop) {
        this.shop = shop;
    }
    
    getShop() {
        return this.shop;
    }
 
    getShopList() {
        return this.shopsListRef;
    }
 
    addShop(shop: Shop) {
        return this.shopsListRef.push(shop);
    }
 
    updateShop(shop: Shop) {
        return this.shopsListRef.update(shop.key, shop);
    }
 
    removeShop(shop: Shop) {
        return this.shopsListRef.remove(shop.key);
    }

    addProduct(product: any) {
        return this.cart.push(product);
    }

    getProducts(){
        return this.cart;
    }

    getCart() {
        return this.cart;
    }
    
}
