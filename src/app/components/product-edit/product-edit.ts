import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/productService';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-edit.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEdit {

  form!: FormGroup;
  productId!: number;

  constructor(private fb: FormBuilder, private productService: ProductService, private route: ActivatedRoute, public router: Router) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    const product = this.productService.getProductById(this.productId);
    this.form = this.fb.group({
      name: [product?.name, Validators.required],
      description: [product?.description],
      price: [product?.price, Validators.required],
      quantity: [product?.quantity, Validators.required],
      category: [product?.category],
      imageUrl: [product?.imageUrl]
    });
  }

  update() {
    if (this.form.valid) {
      this.productService.updateProduct({ id: this.productId, ...this.form.value });
      alert('Successfully updated product!');
      this.router.navigate(['/products']);
    }
  }

}
