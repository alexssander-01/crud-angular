import { Component, OnInit } from '@angular/core';
import {Client} from "../model/client";

@Component({
  selector: 'app-client',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  displayedColumns = ['_idClient','nameClient','emailClient','birthDayClient'];
  constructor() {
    this.clients = [{
      _idClient:"1", nameClient:"alex",emailClient:"alex@gmail.com",birthDayClient:"01-01-2010"
    }];
  }

  ngOnInit(): void {

  }

}
