import {Injectable} from '@angular/core';
import {Client} from "../model/client";
import {HttpClient} from "@angular/common/http";
import {first, Observable} from "rxjs";
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
    return this.httpClient.post<Client>(`${this.baseUrl}/client`,record).pipe(first());
  }

  getIdClient(idClient: string | null) {
    if(idClient != null)
      return this.httpClient.get<Client>(`${this.baseUrl}/client/${idClient}`).pipe(first());
    return new Observable<Client>();
  }

  updateClient(record: Client){
    return this.httpClient.put<Client>(`${this.baseUrl}/client/${record.idClient}`,record).pipe(first());
  }

  deleteClient(idClient: number){
    return this.httpClient.delete<string>(`${this.baseUrl}/client/${idClient}`).pipe(first());
  }
}
