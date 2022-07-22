import { Injectable } from '@angular/core';
import {Client} from "../model/client";
import {HttpClient} from "@angular/common/http";
import {first, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private httpClient: HttpClient) {
  }

  listClient(){
    return this.httpClient.get<Client[]>('http://localhost:8080/api/client')
      .pipe(
        first(),
        tap(cliets =>{
          console.log(cliets)
        })
      );
  }
}
