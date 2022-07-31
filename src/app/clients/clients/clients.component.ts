import { Component, OnInit } from '@angular/core';
import {Client} from "../model/client";
import {ClientsService} from "../services/clients.service";
import {catchError, Observable, of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../../shared/components/error-dialog/error-dialog.component";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmDialogComponent} from "../../shared/components/confirm-dialog/confirm-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";

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
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
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
    this.router.navigate(['form'],{relativeTo: this.route});
  }

  onUpdate(idClient: Client) {
    this.router.navigate(['form/'+idClient],{relativeTo: this.route});
  }

  onDelete(client: Client) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      data: client.nameClient
    });
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.clientsService.deleteClient(client.idClient).subscribe(() => {
          this.success(`${client.nameClient}`);
          this.clients$ = this.clientsService.listClient().pipe(
            catchError(() =>{
              this.onError('Erro ao carregar lista de clients.');
              return of([])
            })
          );
          },() => this.error()
        );
      }
        console.log(result);
    })
  }
  private success(text: string) {
    this.snackBar.open(`Cliente ${text} excluido!`, '', {duration: 5000});
  }

  private error() {
    this.snackBar.open('Erro ao excluir cliente', '', {duration: 5000});
  }
}
