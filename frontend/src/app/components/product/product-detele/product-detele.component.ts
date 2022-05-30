import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detele',
  templateUrl: './product-detele.component.html',
  styleUrls: ['./product-detele.component.css']
})
export class ProductDeteleComponent implements OnInit {

  product: Product = {
    name: '',
    price: null
  }

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.productService.readById(id).subscribe(product => {
      this.product = product;
    });
  }

  deleteProduct(): void {
    this.productService.delete(this.product.id!).subscribe(() => {
      this.productService.showMessage('Produto excluído com sucesso!');
      this.router.navigate(['/products']);
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

}
