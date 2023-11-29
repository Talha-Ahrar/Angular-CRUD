// product.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://localhost:44303/api/Products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetAllProducts`);
  }



  createProduct(productData: any): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<string>(`${this.apiUrl}/CreateProduct`, productData, { headers, responseType: 'text' as 'json' });
  }


  DeleteProduct(id:any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/DeleteProduct?productId=${id}`);
  }


  getProductby(id:any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetProductById?productId=${id}`);
  }
  updateProduct(updateProduct: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.apiUrl}/UpdateProduct`;
    return this.http.put(url, updateProduct ,{ headers, responseType: 'text' as 'json' });
  }

}
