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

    this.form = this.formBuilder.group({
      idClient: null,
      nameClient: null,
      emailClient: null,
      birthDateClient: null
    });

    this._adapter.setLocale('pt-BR');
  }

  ngOnInit(): void {
    this.service.getIdClient(this.route.snapshot.paramMap.get('id')).subscribe(data =>{
      this.form = this.formBuilder.group({
        idClient: data.idClient,
        nameClient: data.nameClient,
        emailClient: data.emailClient,
        birthDateClient: data.birthDateClient+'T03:00:00'
      });
    })
  }

  onSubmitAdd() {
    this.service.saveClient(this.form.value).subscribe(data => this.onSuccess(`${data.nameClient} salvo`), error => {
      console.log(error);
      this.onError()
    });
  }

  onSubmitUp() {
    this.service.updateClient(this.form.value).subscribe(data => this.onSuccess(`${data.nameClient} atualizado`), error => {
      console.log(error);
      this.onError()
    });
  }

  onCancel() {
    this.location.back();
  }

  showButton(): boolean{
    return this.form.value.idClient != null;
  }

  private onSuccess(text: string) {
    this.snackBar.open(`Cliente ${text} com sucesso!`, '', {duration: 5000});
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao adicionar cliente', '', {duration: 5000});
  }
}
