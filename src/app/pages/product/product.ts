import { Component } from '@angular/core';
import { ProductList } from "../../components/product-list/product-list";
import { ProductAdd } from "../../components/product-add/product-add";

@Component({
  selector: 'app-product',
  imports: [ProductList, ProductAdd],
  templateUrl: './product.html',
})
export default class Product {

}
