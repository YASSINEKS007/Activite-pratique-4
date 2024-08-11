import {Component, OnInit} from "@angular/core";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
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
    /*this.appState.setProductState({
      status: "LOADING"
    })*/
    this.productService.searchProducts(this.appState.productsState.keyword,
      this.appState.productsState.currentPage,
      this.appState.productsState.pageSize).subscribe({
      next: (resp) => {
        //this.appState.productsState.products = resp.body as Product[];
        let products = resp.body as Product[];
        let totalCountHeader = resp.headers.get('x-total-count');
        let totalProducts = totalCountHeader ? parseInt(totalCountHeader) : 0;
        //this.appState.productsState.totalProducts = totalProducts;

        let totalPages = Math.floor(totalProducts / this.appState.productsState.pageSize);
        if (totalProducts % this.appState.productsState.pageSize !== 0) {
          ++totalPages;
        }
        this.appState.setProductState({
          products : products,
          totalProducts: totalProducts,
          totalPages: totalPages,
          /*status : "LOADED",
          errorMessage: null */


        })
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
    this.router.navigateByUrl(`/admin/edit-product/${product.id}`);
  }
}
