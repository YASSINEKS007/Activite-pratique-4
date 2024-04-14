import {Component, OnInit} from "@angular/core";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  constructor(private productService: ProductService,
              private router: Router,
              public appState : AppStateService) {

  }

  ngOnInit() {
    this.searchProducts();
  }

  searchProducts() {
    this.productService.searchProducts(this.appState.productsState.keyword,
      this.appState.productsState.currentPage,
      this.appState.productsState.pageSize).subscribe({
      next: (resp) => {
        this.appState.productsState.products = resp.body as Product[];
        const totalCountHeader = resp.headers.get('x-total-count');
        const totalProducts = totalCountHeader ? parseInt(totalCountHeader) : 0;
        this.appState.productsState.totalProducts = totalProducts;
        console.log("Total Products Header:", totalCountHeader);
        console.log("Total Products:", totalProducts);
        this.appState.productsState.totalPages = Math.floor(totalProducts / this.appState.productsState.pageSize);
        if (totalProducts % this.appState.productsState.pageSize !== 0) {
          this.appState.productsState.totalPages++;
        }
        console.log("Total Pages:", this.appState.productsState.totalPages);
      },
      error: err => {
        console.log("Error:", err);
      }
    });
  }


  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product).subscribe({
      next: updatedProduct => {
        product.checked =! product.checked;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  handleDelete(product: Product){

    this.productService.deleteProduct(product).subscribe(
      {
        next:value => {
          //this.appState.productsState.products = this.appState.productsState.products.filter( (p:any) =>p.id!= product.id)
          this.searchProducts();
        }
      }
    );
  }



  handleGoToPage(page: number) {
    this.appState.productsState.currentPage = page;
    this.searchProducts();
  }

  handleEdit(product: Product) {
    this.router.navigateByUrl(`/edit-product/${product.id}`);
  }
}
