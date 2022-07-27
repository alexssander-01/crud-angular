import {Injectable} from '@angular/core';
import {Client} from "../model/client";
import {HttpClient} from "@angular/common/http";
import {first} from "rxjs";
import * as moment from "moment/moment";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) {
  }

  listClient() {
    return this.httpClient.get<Client[]>(`${this.baseUrl}/client`)
      .pipe(
        first()
      );
  }

  saveClient(record: Client){
    console.log(record.birthDateClient);
    if(record.birthDateClient != null){
      let newDate: moment.Moment = moment.utc(record.birthDateClient).local();
      record.birthDateClient = newDate.format("YYYY-MM-DD");
    }
    return this.httpClient.post<Client>(`${this.baseUrl}/client`,record).pipe(first());
  }

  getIdClient(idClient: string | null) {
    return this.httpClient.get<Client>(`${this.baseUrl}/client/${idClient}`).pipe(first());
  }

  updateClient(record: Client){
    return this.httpClient.put<Client>(`${this.baseUrl}/client/${record.idClient}`,record).pipe(first());
  }
}
