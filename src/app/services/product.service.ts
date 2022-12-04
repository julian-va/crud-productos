import { Injectable } from '@angular/core';
import { Productdto } from '../dtos/productdto';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private listProducto: Productdto[] = [
    {
      description: 'description 1',
      name: 'Producto 1',
      price: 1000,
      stock: 10,
      id: 1,
    },
    {
      description: 'description 2',
      name: 'Producto 2',
      price: 100,
      stock: 18,
      id: 2,
    },
    {
      description: 'description 3',
      name: 'Producto 3',
      price: 10500,
      stock: 60,
      id: 3,
    },
    {
      description: 'description 4',
      name: 'Producto 4',
      price: 20000,
      stock: 20,
      id: 4,
    },
    {
      description: 'description 5',
      name: 'Producto 5',
      price: 4800,
      stock: 2,
      id: 5,
    },
  ];

  constructor() {}

  getProductList(): Productdto[] {
    return this.listProducto;
  }
  addProduct(product: Productdto): void {
    product.id = this.listProducto.length + 1;
    this.listProducto.push(product);
  }

  deleteProduct(id: number): void {
    const index = this.listProducto.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.listProducto.splice(index, 1);
    }
  }

  getById(id: number): Productdto {
    return this.listProducto.filter((pro) => pro.id === id)[0];
  }

  updateProduct(id: number, product: Productdto): void {
    const index = this.listProducto.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.listProducto[index] = product;
    }
  }
}
