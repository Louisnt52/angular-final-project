import { ReactiveFormsModule } from "@angular/forms";
import { ProductEdit } from "./product-edit";
import { RouterTestingModule } from "@angular/router/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe('ProductEdit Component', () => {
    let component: ProductEdit;
    let fixture: ComponentFixture<ProductEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductEdit, ReactiveFormsModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductEdit);
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
      description: 'Descripción Test',
      price: 100,
      quantity: 5,
      category: 'Categoría Test',
      imageUrl: 'https://example.com/image.jpg'
    });
    expect(component.form.valid).toBeTrue();
  });

  it('save button should be disabled when form is invalid', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const saveButton = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(saveButton.disabled).toBeTrue();
  });

  it('save button should be enabled when form is valid', () => {
    component.form.setValue({
      name: 'Producto Test',
      description: 'Descripción Test',
      price: 100,
      quantity: 5,
      category: 'Categoría Test',
      imageUrl: 'https://example.com/image.jpg'
    });
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const saveButton = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(saveButton.disabled).toBeFalse();
  });
})