import { Component, OnInit } from '@angular/core';
import {Client} from "../model/client";
import {ClientsService} from "../services/clients.service";
import {catchError, Observable, of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../../shared/components/error-dialog/error-dialog.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-client',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  clients$: Observable<Client[]>;
  displayedColumns = ['idClient','nameClient','emailClient','birthDateClient','actions'];

  constructor(
    private clientsService: ClientsService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) {
    this.clients$ = this.clientsService.listClient()
      .pipe(
        catchError(() =>{
          this.onError('Erro ao carregar lista de clients.');
          return of([])
        })
      );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {
  }

  onAdd(): void {
    this.router.navigate(['new'],{relativeTo: this.route});
  }

}
