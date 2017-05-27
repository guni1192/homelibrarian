import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { CategoriesComponent } from './categories/categories.component';
import { EditorComponent } from './editor/editor.component';


const routes: Routes = [
  { path: '',           component: ArticleComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'editor',     component: EditorComponent },
  { path: 'article',    component: ArticleComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
