import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.css']
})
export class BankListComponent implements OnInit {

  pseudo: string;

  constructor() { }

  ngOnInit() {
    this.pseudo = localStorage.getItem('pseudo');
  }

}
