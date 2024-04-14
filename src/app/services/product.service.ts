import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {

  }

  public searchProducts(keyword : string = "", page: number = 1, size: number = 4) {
    return this.http.get(`http://localhost:8089/products?name_like=${keyword}&_page=${page}&_limit=${size}`, { observe: 'response' });
  }


  public checkProduct(product:Product):Observable<any>{
    return this.http.patch<Product>(`http://localhost:8089/products/${product.id}`, {checked: !product.checked})
  }

  public deleteProduct(product: Product): Observable<any> {
    return this.http.delete(`http://localhost:8089/products/${product.id}`);
  }


  saveProduct(product: Product): Observable<Product> {
    // Adjust the URL to exclude the ID since it's undefined for new products
    return this.http.post<Product>(`http://localhost:8089/products`, product);
  }


  getProductById(productId: number) :Observable<Product> {
    return this.http.get<Product>(`http://localhost:8089/products/${productId}`);
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(`http://localhost:8089/products/${product.id}`,product);
  }
}
