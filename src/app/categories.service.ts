import { Injectable } from '@angular/core';
import { CATEGORIES } from './mock-categories';


@Injectable()
export class CategoriesService {
  constructor() { }
  getCategories() {
    return Promise.resolve(CATEGORIES);
  }
}
