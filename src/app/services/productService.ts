import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _products = signal<Product[]>([]);
  products = computed(() => this._products());

  constructor() { 
    this.loadFromLocalStorage();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
  
  addProduct(product: Product) {
    this._products.set([...this._products(), product]);
    this.saveToLocalStorage();
  }

  deleteProduct(id: number) {
    const filtered = this._products().filter(p => p.id !== id);
    this._products.set(filtered);
    this.saveToLocalStorage();
  }
  updateProduct(product: Product) {
    const updated = this._products().map(p => p.id === product.id ? product : p);
    this._products.set(updated);
    this.saveToLocalStorage();
  }
  getProductById(id: number): Product | undefined {
    return this._products().find(p => p.id === id);
  }

  private saveToLocalStorage(): void {
    if (!this.isBrowser()) return;
    localStorage.setItem('products', JSON.stringify(this._products()));
  }

  private loadFromLocalStorage(): void {
    if (!this.isBrowser()) return;
    const data = localStorage.getItem('products');
    if (data) {
      this._products.set(JSON.parse(data));
    }
  }
}
