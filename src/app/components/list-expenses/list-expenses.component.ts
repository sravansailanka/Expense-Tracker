import { Component, OnInit } from '@angular/core';
import { Expense } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-list-expenses',
  templateUrl: './list-expenses.component.html',
  styleUrls: ['./list-expenses.component.css']
})
export class ListExpensesComponent implements OnInit{

  sortExpenseAsc = false;
  sortAmountAsc = false;

  expenses: Expense[] = [];
  filteredExpenses = [...this.expenses];
  filters = {
    keyword: '',
    // sortBy: 'Name'
  }

  constructor(private _expenseService: ExpenseService){}
  ngOnInit(): void {
    this.listExpenses();
    
  }
  deleteExpense(id:number){
    this._expenseService.deleteExpense(id).subscribe(
      data => {
        console.log('deleted responase', data);
        this.listExpenses();
      }
    )
  }

  listExpenses(){
    this._expenseService.getExpenses().subscribe( 
      data => {
        this.expenses = this.gettExpenses(data)
        this.filteredExpenses = [...this.expenses];
      }
    )
  }
  
  sortExpensesByExpense() {
    if (this.sortExpenseAsc) {
      this.filteredExpenses.sort((a, b) => a.expense.localeCompare(b.expense));
    } else {
      this.filteredExpenses.sort((a, b) => b.expense.localeCompare(a.expense));
    }
    this.sortExpenseAsc = !this.sortExpenseAsc;
  }
  
  sortExpensesByAmount() {
    if (this.sortAmountAsc) {
      this.filteredExpenses.sort((a, b) => a.amount - b.amount);
    } else {
      this.filteredExpenses.sort((a, b) => b.amount - a.amount);
    }
    this.sortAmountAsc = !this.sortAmountAsc;
  }
  
  filterExpenses() {
    const keyword = this.filters.keyword.toLowerCase();
    if (!keyword) {
      // If the input is empty, show all expenses
      this.filteredExpenses = [...this.expenses];
    } else {
      // Filter expenses based on the input text
      this.filteredExpenses = this.expenses.filter(expense =>
        expense.expense.toLowerCase().includes(keyword)
      );
    }
  }

  gettExpenses(expenses: Expense[]){

    return expenses.sort((a,b) => {return a.expense.toLowerCase() < b.expense.toLowerCase() ? -1:1});
    // filter((e:Expense)=>{
    //   return e.expense.toLowerCase().includes(this.filters.keyword.toLowerCase());
    // }).sort((a,b) => {return a.expense.toLowerCase() < b.expense.toLowerCase() ? -1:1});
    // .sort((a,b) => {
    //   if(this.filters.sortBy === 'Name'){
    //     return a.expense.toLowerCase() < b.expense.toLowerCase() ? -1:1;
    //   }
    //   else if(this.filters.sortBy === 'Amount'){
    //     return a.amount > b.amount ? -1:1;
    //   }
    //   else{
    //     return a.id < b.id ? -1:1;
    //   }
    // })
  }
}
