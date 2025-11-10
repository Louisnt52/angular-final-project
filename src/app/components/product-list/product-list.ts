import { Component, computed } from '@angular/core';
import { ProductService } from '../../services/productService';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.html',
})
export class ProductList {

constructor(public productService: ProductService) {}
  products = computed(() => this.productService.products());

  delete(id: number) {
    if (confirm('¿Deseas eliminar este producto?')) {
      this.productService.deleteProduct(id);
    }
  }

}
