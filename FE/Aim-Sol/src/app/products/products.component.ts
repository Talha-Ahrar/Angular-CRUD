import { Component, ViewChild } from '@angular/core';
import { ProductService } from '../Services/product.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  products: any[] = [];

  constructor(private productService: ProductService,private router: Router,private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getProductlist()
  }


  getProductlist(){
    this.productService.getAllProducts().subscribe(
      (data) => {
        debugger
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }


  deleteProduct(id: any) {
    // debugger
    // console.log(id)
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // If the user confirms the deletion, call the DELETE API
        this.productService.DeleteProduct(id.ProductID).subscribe(
          (response) => {
            // this.getProductlist()
            console.log(response,"========");
            // Show success message
            Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
    this.getProductlist()

          },
          (error) => {
            // this.getProductlist()
            console.error('Error deleting product:', error);
            // Show error message
            Swal.fire('Error!', 'Something went wrong while deleting the product.', 'error');
          }
        );
      }
    });
  }

  editProduct(id:any){

    this.router.navigate(['/update-product', id.ProductID]);

  }

  addproduct(){
    this.router.navigate(['create']);

  }
  showCreateProduct = false;

  toggleCreateProduct(): void {
    this.showCreateProduct = !this.showCreateProduct;
  }
}
