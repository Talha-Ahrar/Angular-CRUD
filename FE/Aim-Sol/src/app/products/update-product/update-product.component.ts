import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
import { UpdateProductModel } from 'src/app/model/update-product.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  id: any;
  productName!: string ;
  price: any  ;
  stockQuantity!: any ;
  constructor(private route: ActivatedRoute,private productService: ProductService, private router: Router  ) {


  }



  ngOnInit(): void {
    debugger
    // Subscribe to the route params observable
    this.route.params.subscribe(params => {
      // Retrieve the 'id' parameter from the params
      this.id = params['id'];

      // Now, 'this.id' contains the value of the 'id' parameter from the route
      console.log('Product ID:', this.id);
      this.getProductbyID()


    });
  }



  getProductbyID() {
    this.productService.getProductby(this.id).subscribe(
      (data) => {

        console.log(data, "-----------------------");
       this.data(data)
      },
      (error) => {
        console.error('Error fetching product:', error);
      }
    );
  }

data(data:any){

  this.productName = data.ProductName;
  this.stockQuantity = data.StockQuantity;
  this.price = data.Price;

}



  onSubmit(): void {
    const productData: UpdateProductModel = {
      ProductID: this.id,
      ProductName: this.productName,
      Price: this.price,
      StockQuantity: this.stockQuantity,
    };

    this.productService.updateProduct(productData).subscribe(
      (response) => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Product updated successfully.',
        });
        // Reset form fields after successful submission
        this.resetForm();
    this.router.navigate(['/']);

      },
      (error) => {
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
    // Navigate to the home page or any other route as needed
    this.router.navigate(['/']);
  }
}

