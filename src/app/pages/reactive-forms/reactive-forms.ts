import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/productService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reactive-forms',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-forms.html',
})
export default class ReactiveForms implements OnInit{
  public name = signal("Products Module");
  private fb = inject(FormBuilder);
  form: FormGroup;
  
  constructor( private productService: ProductService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      quantity: [1, Validators.required],
      category: ['', Validators.required],
      description: [''],
      imageUrl: ['']
    });
  }
  
  ngOnInit() {
    console.log(this.name());
  }

  submit() {
    if (this.form.valid) {
      this.productService.addProduct({ id: Date.now(), ...this.form.value });
      alert('Product added susccesfull');
      this.form.reset();
    } else {
      alert('Complete all required fields');
    }
  }

}
