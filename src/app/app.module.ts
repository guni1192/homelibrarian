import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdModule, ConverterOptions, IConverterOptions } from 'ng2-md';

import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesService } from './categories.service';
import { ArticleComponent } from './article/article.component';
// import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    ArticleComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdModule
  ],
  providers: [
    CategoriesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
