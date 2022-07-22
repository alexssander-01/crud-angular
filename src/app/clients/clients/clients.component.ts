import { Component, OnInit } from '@angular/core';
import {Client} from "../model/client";
import {ClientsService} from "../services/clients.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-client',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  clients$: Observable<Client[]>;
  displayedColumns = ['idClient','nameClient','emailClient','birthDateClient'];

  constructor(private clientsService: ClientsService) {
    this.clients$ = this.clientsService.listClient();
  }

  ngOnInit(): void {
  }

}
