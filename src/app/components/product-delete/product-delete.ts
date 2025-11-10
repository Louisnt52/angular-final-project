import { Component, Input } from '@angular/core';
import { ProductService } from '../../services/productService';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  imports: [CommonModule],
  templateUrl: './product-delete.html',
})
export class ProductDelete {

  @Input() productId!: number;

  constructor(private productService: ProductService, private router: Router) {}

  confirmDelete() {
    if (confirm('¿Deseas eliminar este producto?')) {
      this.productService.deleteProduct(this.productId);
      alert('Successfully deleted product!');
      this.router.navigate(['/products']);
    }
  }
}
