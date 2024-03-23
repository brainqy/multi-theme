import { Component } from '@angular/core';
import { IcsRequest, TransactionService } from 'src/app/Core/services/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {
  transactions: any;
  sideNavStatus: boolean = false;
  userBalance!: any;
   // Prepare the data required by the service

  constructor(private transactionService:TransactionService){

  }
  ngOnInit(){
    this.fetchTransactions();
    this.getCurrentUserBalance();
  }

  fetchTransactions(): void {
    this.transactionService.getTransactions()
      .subscribe(transactions => {
        console.log("transactions",transactions);
        this.transactions = transactions;
      }
      )
  }
  getCurrentUserBalance(){
    this.transactionService.getUserBalance().subscribe((res)=>{
      this.userBalance=res;
console.log("Userbalance",res);
    })
  }

  formatDate(date: number): string {
    // Implement your date formatting logic here
    return new Date(date).toLocaleDateString();
  }

}
