// create-product.component.ts
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from 'src/app/Services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {
  productName!: string ;
  price!: number | null;
  stockQuantity!: number | null;

  @ViewChild('createProductModal') createProductModal: any;

  constructor(private productService: ProductService, private router: Router ) {}


  onSubmit(): void {
    const productData = {
      productName: this.productName,
      price: this.price,
      stockQuantity: this.stockQuantity,

    };

    this.productService.createProduct(productData).subscribe(
      response => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Product created successfully.',
        });
        // Reset form fields after successful submission
        this.resetForm();
        this.router.navigate(['/']);
      },
      error => {
        console.error(error);
        // Show validation errors using SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: 'Please fill out all the fields with valid data.',
        });
      }
    );
  }

  private resetForm(): void {
    this.productName = '';
    this.price = null;
    this.stockQuantity = null;

  }
  cancel() {
    // Show a confirmation modal
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will lose your data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, continue!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked "Yes, continue!" - navigate to the home page
        this.router.navigate(['/']);
      }
      // If the user clicked "Cancel" or closed the modal, do nothing
    });
  }
}
