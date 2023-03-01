import { Component, OnInit } from '@angular/core';
import { Expense } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense.service';
import { ConfirmationService, MessageService, SortEvent } from 'primeng/api';

@Component({
  selector: 'app-list-expenses',
  templateUrl: './list-expenses.component.html',
  styleUrls: ['./list-expenses.component.scss']
})
export class ListExpensesComponent implements OnInit{

  productDialog: boolean;
  selectedProducts: Expense[];

  submitted: boolean;
  sortExpenseAsc = false;
  sortAmountAsc = false;

  sortField: string = '';
  sortOrder: number = 1;

  expenses: Expense[]=[];
  expense: Expense;
  filteredExpenses = [...this.expenses];
  filters = {
    keyword: '',
    // sortBy: 'Name'
  }

  constructor(private _expenseService: ExpenseService,private messageService: MessageService, private confirmationService: ConfirmationService){}
  ngOnInit(): void {
    this.listExpenses();
    
  }
  openNew() {
    
    this.submitted = false;
    this.productDialog = true;
}

  confirmDeleteExpense(expenseId: number): void {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.deleteExpense(expenseId);
    }
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
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;

        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
            result = value1.localeCompare(value2);
        else
            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

        return (event.order * result);
    });
}
  
  // sortExpensesByExpense() {
  //   if (this.sortExpenseAsc) {
  //     this.filteredExpenses.sort((a, b) => a.expense.localeCompare(b.expense));
  //   } else {
  //     this.filteredExpenses.sort((a, b) => b.expense.localeCompare(a.expense));
  //   }
  //   this.sortExpenseAsc = !this.sortExpenseAsc;
  // }


  // sortExpenses(sortField: string) {
  //   console.log(this.expenses);
  //   if (this.sortField === sortField) {
  //       this.sortOrder *= -1;
  //   } else {
  //       this.sortField = sortField;
  //       this.sortOrder = 1;
  //   }

  //   this.filteredExpenses.sort((a, b) => {
  //       let comparison = 0;

  //       if (a[sortField] > b[sortField]) {
  //           comparison = 1;
  //       } else if (a[sortField] < b[sortField]) {
  //           comparison = -1;
  //       }

  //       return comparison * this.sortOrder;
  //   });
  // }

  // sortExpensesByAmount() {
  //   if (this.sortAmountAsc) {
  //     this.filteredExpenses.sort((a, b) => a.amount - b.amount);
  //   } else {
  //     this.filteredExpenses.sort((a, b) => b.amount - a.amount);
  //   }
  //   this.sortAmountAsc = !this.sortAmountAsc;
  // }
  
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
    

    return expenses;
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
