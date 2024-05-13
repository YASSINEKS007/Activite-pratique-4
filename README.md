<body>
  <h1>Application de gestion de produits Angular</h1>

  <p>Cette application Angular permet aux utilisateurs de gérer des produits, y compris l'ajout de nouveaux produits, la modification des produits existants, la vérification/décochage des produits et la suppression des produits.</p>

  <h2>Composant de modification de produit</h2>

  <h3>Aperçu</h3>
  <ul>
    <li>Ce composant est responsable de la modification des produits existants.</li>
    <li>Il récupère les détails du produit en fonction de l'`productId` du paramètre de route et remplit le formulaire pour la modification.</li>
  </ul>

  <h4>Modèle du composant (edit-product.component.html)</h4>

  <pre><code>&lt;div class="p-3"&gt;
  &lt;div class="card"&gt;
    &lt;div class="card-header"&gt;
      ID du produit = {{ productId }}
    &lt;/div&gt;
    &lt;div class="card-body" *ngIf="productFormGroup"&gt;
      &lt;form [formGroup]="productFormGroup" (ngSubmit)="updateProduct()"&gt;
        &lt;div class="mb-3"&gt;
          &lt;label class="form-label"&gt;Nom&lt;/label&gt;
          &lt;input class="form-control" formControlName="name"&gt;
        &lt;/div&gt;
        &lt;div class="mb-3"&gt;
          &lt;label class="form-label"&gt;Prix&lt;/label&gt;
          &lt;input class="form-control" formControlName="price"&gt;
        &lt;/div&gt;
        &lt;div class="mb-3"&gt;
          &lt;label class="form-label"&gt;Coché&lt;/label&gt;
          &lt;input type="checkbox" class="form-check-input" formControlName="checked"&gt;
        &lt;/div&gt;
        &lt;button [disabled]="productFormGroup.invalid" class="btn btn-success"&gt;Enregistrer&lt;/button&gt;
      &lt;/form&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
</code></pre>

  <h4>TypeScript du composant (edit-product.component.ts)</h4>

  <pre><code>import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productId!: number;
  productFormGroup!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['id'];
    this.productService.getProductById(this.productId).subscribe({
      next: (product: Product) => {
        this.productFormGroup = this.fb.group({
          id: this.fb.control(product.id),
          name: this.fb.control(product.name, [Validators.required]),
          price: this.fb.control(product.price, [Validators.required]),
          checked: this.fb.control(product.checked)
        });
      }
    });
  }

  updateProduct() {
    let product: Product = this.productFormGroup.value;
    this.productService.updateProduct(product).subscribe({
      next: (data) => {
        alert(JSON.stringify(data));
      }
    });
  }
}
</code></pre>

  <h2>Composant de nouveau produit</h2>
  <h3>Aperçu</h3>
  <ul>
    <li>Ce composant est responsable de l'ajout de nouveaux produits.</li>
  </ul>

  <h4>Modèle du composant (new-product.component.html)</h4>

  <pre><code>&lt;div&gt;
  &lt;div class="card"&gt;
    &lt;div class="card-body"&gt;
      &lt;div class="row"&gt;
        &lt;div class="col-md-6"&gt;
          &lt;form [formGroup]="productForm" (ngSubmit)="saveProduct()"&gt;
            &lt;div class="mb-3"&gt;
              &lt;label class="form-label"&gt;Nom&lt;/label&gt;
              &lt;input class="form-control" formControlName="name"&gt;
            &lt;/div&gt;
            &lt;div class="mb-3"&gt;
              &lt;label class="form-label"&gt;Prix&lt;/label&gt;
              &lt;input class="form-control" formControlName="price"&gt;
            &lt;/div&gt;
            &lt;div class="mb-3"&gt;
              &lt;label class="form-label"&gt;Coché&lt;/label&gt;
              &lt;input type="checkbox" class="form-check-input" formControlName="checked"&gt;
            &lt;/div&gt;
            &lt;button [disabled]="productForm.invalid" class="btn btn-success"&gt;Enregistrer&lt;/button&gt;
          &lt;/form&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
</code></pre>

  <h4>TypeScript du composant (new-product.component.ts)</h4>

  <pre><code>import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  public productForm!: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      price: this.fb.control(0, [Validators.required]),
      checked: this.fb.control(false)
    });
  }

  saveProduct() {
    let product: Product = this.productForm.value;
    this.productService.saveProduct(product).subscribe({
      next: (data) => {
        alert(JSON.stringify(data));
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
</code></pre>

  <h2>Composant de produits</h2>
  <h3>Aperçu</h3>
  <ul>
    <li>Ce composant répertorie tous les produits, permet aux utilisateurs de rechercher, de cocher/décocher, de supprimer et de paginer à travers les produits.</li>
  </ul>

  <h4>Modèle du composant (products.component.html)</h4>

  <pre><code>&lt;div&gt;
  &lt;div class="card"&gt;
    &lt;div class="card-body"&gt;
      &lt;div class="card-body"&gt;
        &lt;input type="text" [(ngModel)]="appState.productsState.keyword"&gt;
        &lt;button (click)="searchProducts()" class="btn btn-outline-success col"&gt;
          &lt;i class="bi bi-search"&gt;&lt;/i&gt;
        &lt;/button&gt;
      &lt;/div&gt;
      &lt;table class="table"&gt;
        &lt;thead&gt;
          &lt;tr&gt;
            &lt;th&gt;Nom&lt;/th&gt;
            &lt;th&gt;Prix&lt;/th&gt;
            &lt;th&gt;Coché&lt;/th&gt;
            &lt;th&gt;Supprimer&lt;/th&gt;
            &lt;th&gt;Mettre à jour&lt;/th&gt;
          &lt;/tr&gt;
        &lt;/thead&gt;
        &lt;tbody&gt;
          &lt;tr *ngFor="let product of appState.productsState.products"&gt;
            &lt;td&gt;{{ product.name }}&lt;/td&gt;
            &lt;td&gt;{{ product.price }}&lt;/td&gt;
            &lt;td&gt;
              &lt;button
                (click)="handleCheckProduct(product)"
                class="btn btn-outline-success"&gt;
                &lt;i [class]="product.checked ? 'bi bi-check' : 'bi bi-circle'"&gt;&lt;/i&gt;
              &lt;/button&gt;
            &lt;/td&gt;
            &lt;td&gt;
              &lt;button
                (click)="handleDelete(product)"
                class="btn btn-outline-danger"&gt;
                &lt;i class="bi bi-trash"&gt;&lt;/i&gt;
              &lt;/button&gt;
            &lt;/td&gt;
            &lt;td&gt;
              &lt;button
                (click)="handleEdit(product)"
                class="btn btn-outline-primary"&gt;
                &lt;i class="bi bi-pencil-fill text-primary"&gt;&lt;/i&gt;
              &lt;/button&gt;
            &lt;/td&gt;
          &lt;/tr&gt;
        &lt;/tbody&gt;
      &lt;/table&gt;
      &lt;ul class="nav nav-pills"&gt;
        &lt;li *ngFor="let page of appState.productsState.totalPages > 0 ? [].constructor(appState.productsState.totalPages) : []; let i = index"&gt;
          &lt;button (click)="handleGoToPage(i + 1)"
                  [ngClass]="appState.productsState.currentPage == (i + 1) ? 'btn btn-success m-1' : 'btn btn-outline-success m-1'"
                  &gt;
            {{ i + 1 }}
          &lt;/button&gt;
        &lt;/li&gt;
      &lt;/ul&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
</code></pre>

  <h4>TypeScript du composant (products.component.ts)</h4>

  <pre><code>import { Component, OnInit } from "@angular/core";
import { ProductService } from "../services/product.service";
import { Product } from "../model/product.model";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { AppStateService } from "../services/app-state.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  constructor(private productService: ProductService,
              private router: Router,
              public appState : AppStateService) {}

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
</code></pre>

  <h2>Service d'état de l'application</h2>
  <h3>Aperçu</h3>
  <ul>
    <li>Ce service gère l'état de l'application.</li>
  </ul>

  <h4>TypeScript du service (app-state.service.ts)</h4>

  <pre><code>import { Injectable } from '@angular/core';
import { Product } from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  public productsState : any = {
    products: [],
    keyword: "",
    totalPages: 0,
    pageSize: 3,
    currentPage: 1,
    totalProducts : 0
  }

  constructor() {
  }

  public setProductState(state : any) : void{
    this.productsState = [...this.productsState, state];
  }
}
</code></pre>

  <h2>Service de gestion des produits</h2>
  <h3>Aperçu</h3>
  <ul>
    <li>Ce service gère les opérations CRUD des produits.</li>
  </ul>

  <h4>TypeScript du service (product.service.ts)</h4>

  <pre><code>import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Product } from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  public searchProducts(keyword: string = "", page: number = 1, size: number = 4) {
    return this.http.get(`http://localhost:8089/products?name_like=${keyword}&_page=${page}&_limit=${size}`, { observe: 'response' });
  }

  public checkProduct(product: Product): Observable<any> {
    return this.http.patch<Product>(`http://localhost:8089/products/${product.id}`, { checked: !product.checked })
  }

  public deleteProduct(product: Product): Observable<any> {
    return this.http.delete(`http://localhost:8089/products/${product.id}`);
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`http://localhost:8089/products`, product);
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:8089/products/${productId}`);
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(`http://localhost:8089/products/${product.id}`, product);
  }
}
</code></pre>

</body>

</html>
