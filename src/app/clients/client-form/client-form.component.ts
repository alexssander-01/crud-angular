import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";
import {ClientsService} from "../services/clients.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})

export class ClientFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>,
    private service: ClientsService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute) {

    //this.service.getIdClient(route.snapshot.paramMap.get('id')).subscribe(data => console.log(data));
    this.form = this.formBuilder.group({
      nameClient: [null],
      emailClient: [null],
      birthDateClient: [null]
    });

    this._adapter.setLocale('pt-BR');

  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.service.saveClient(this.form.value).subscribe(data => this.onSuccess(data.nameClient), error => {
      console.log(error);
      this.onError()
    });
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess(text: string) {
    this.snackBar.open(`Cliente ${text} salvo com sucesso!`, '', {duration: 5000});
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao adicionar cliente', '', {duration: 5000});
  }
}
