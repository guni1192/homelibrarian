import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { ArticleService } from '../article.service';
import { Category } from '../category';
import { Article } from '../article';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [ CategoriesService, ArticleService ]
})

export class CategoriesComponent implements OnInit {
  categories: Category[];
  articles: Article[];

  constructor(private _categoriesService: CategoriesService,
              private _articleService: ArticleService) { }

  getCategories() {
    this._categoriesService.getCategories()
      .then(categories => this.categories = categories);
  }

  getArticles() {
    this._articleService.getArticles()
      .then(articles => this.articles = articles);
  }

  ngOnInit() {
    this.getCategories();
    this.getArticles();
  }
}
