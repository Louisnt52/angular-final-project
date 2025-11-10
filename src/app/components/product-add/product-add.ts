import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/productService';

@Component({
  selector: 'app-product-add',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-add.html',
})
export class ProductAdd implements OnInit{
  form!: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router) {}
  
  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      category: [''],
      imageUrl: ['']
    });
  }

  save() {
    if (this.form.valid) {
      this.productService.addProduct({ id: Date.now(), ...this.form.value });
      this.form.reset();
      alert('Successfully add product!');
      this.router.navigate(['/products']);
    }
  }
}
