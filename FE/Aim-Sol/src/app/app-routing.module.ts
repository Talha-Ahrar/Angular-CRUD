// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UpdateProductComponent } from './Products/update-product/update-product.component';
import { CreateProductComponent } from './Products/create-product/create-product.component';

const routes: Routes = [
  // Other routes...
  { path: '', component: HomeComponent },
{path:'create', component: CreateProductComponent},
  // Add the route for UpdateProductComponent with a dynamic parameter ':id'
  { path: 'update-product/:id', component: UpdateProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
