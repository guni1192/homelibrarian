import { Injectable } from '@angular/core';
import { ARTICLE } from './mock-articles';

@Injectable()
export class ArticleService {
  constructor() { }
  getArticles() {
    return Promise.resolve(ARTICLE);
  }
}
