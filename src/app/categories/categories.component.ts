import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { Category } from '../category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [ CategoriesService ]
})

export class CategoriesComponent implements OnInit {
  categories: Category[];
  constructor(private _categoriesService: CategoriesService) { }

  getCategories() {
    this._categoriesService.getCategories()
      .then(categories => this.categories = categories);
  }

  ngOnInit() {
    this.getCategories();
  }
}
