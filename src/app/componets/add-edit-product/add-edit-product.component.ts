import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Productdto } from 'src/app/dtos/productdto';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css'],
})
export class AddEditProductComponent implements OnInit {
  formProduct: FormGroup;
  id: number;

  constructor(
    private form: FormBuilder,
    private productService: ProductService,
    private arouter: ActivatedRoute,
    private toasr: ToastrService
  ) {
    this.formProduct = this.form.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      stock: [null, [Validators.required, Validators.min(0)]],
    });
    this.id = Number(this.arouter.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    this.setFormProduct();
  }

  addProduct(): void {
    if (!this.formProduct.invalid) {
      if (this.id === 0) {
        this.productService.addProduct(this.buildProduct());
        this.toasr.success(
          'Producto  agregado con exito',
          'producto registrado'
        );
      } else {
        this.productService.updateProduct(this.id, this.buildProduct());
        this.toasr.info(
          'Producto  actualizado con exito',
          'producto actualizado'
        );
      }
    }
  }

  private buildProduct(): Productdto {
    const product: Productdto = {
      description: this.getAtribbuteForm('description'),
      name: this.getAtribbuteForm('name'),
      price: this.getAtribbuteForm('price'),
      stock: this.getAtribbuteForm('stock'),
    };
    return product;
  }

  private getAtribbuteForm(atributo: string) {
    return this.formProduct.get(atributo)?.value;
  }

  getErrorsForm(atributo: string): boolean {
    const valid = this.formProduct.get(atributo)?.hasError('required');
    const toch = this.formProduct.get(atributo)?.touched;

    if (valid && toch) {
      return valid;
    } else {
      return false;
    }
  }

  private setFormProduct(): void {
    if (this.id !== 0) {
      const peoduct = this.productService.getById(this.id);
      this.formProduct.setValue({
        name: peoduct.name,
        description: peoduct.description,
        price: peoduct.price,
        stock: peoduct.stock,
      });
    }
  }
}
