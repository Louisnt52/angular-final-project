import { Component } from '@angular/core';
import { ProductList } from "../../components/product-list/product-list";

@Component({
  selector: 'app-product',
  imports: [ProductList],
  templateUrl: './product.html',
})
export default class Product {

}
