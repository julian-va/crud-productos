import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Productdto } from 'src/app/dtos/productdto';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit {
  productList: Productdto[] = [];

  constructor(
    private ProductService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.productList = this.ProductService.getProductList();
  }

  deleteProduct(id: number): void {
    this.ProductService.deleteProduct(id);
    this.toastr.warning('El producto fue eliminado con exito¡');
  }
}
