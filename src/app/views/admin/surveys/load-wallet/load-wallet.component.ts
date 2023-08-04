import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-load-wallet',
  templateUrl: './load-wallet.component.html',
  styleUrls: ['./load-wallet.component.css']
})
export class LoadWalletComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goBack(){
    this.router.navigate(["survey/setup"]);
  }

  sendMessage(){
    this.router.navigate(['survey/topup-success']);
  }

}
