import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { ProductAdd } from "./product-add";

describe('ProductAdd Componente', () => {
    let component: ProductAdd;
    let fixture: ComponentFixture<ProductAdd>;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAdd, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('form should be valid when all fields are filled', () => {
    component.form.setValue({
      name: 'Producto Test',
      price: 100,
      quantity: 5,
      category: 'Categoría Test',
      description: 'Descripción Test',
      imageUrl: 'https://example.com/image.jpg'
    });
    expect(component.form.valid).toBeTrue();
  });
});