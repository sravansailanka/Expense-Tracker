import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';
import {FormsModule} from "@angular/forms"
import { MatSortModule } from '@angular/material/sort';
import { OrderByPipe } from 'ngx-pipes';

import { OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';


import { AppComponent } from './app.component';
import { ListExpensesComponent } from './components/list-expenses/list-expenses.component';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routers:Routes = [
  {path: 'expenses', component: ListExpensesComponent},
  {path: 'addexpense', component: AddExpenseComponent},
  {path: 'editexpense/:id', component: AddExpenseComponent},
  {path: '', redirectTo: '/expenses', pathMatch: 'full'},

];
@NgModule({
  declarations: [
    AppComponent,
    ListExpensesComponent,
    AddExpenseComponent,
  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routers),
    FormsModule,
    BrowserAnimationsModule,
    MatSortModule,
    CommonModule,
    TableModule,
    ButtonModule,
    
  ],
  providers: [ OrderByPipe ],
  bootstrap: [AppComponent]
})
export class AppModule { }
