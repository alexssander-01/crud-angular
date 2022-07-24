import {Injectable} from '@angular/core';
import {Client} from "../model/client";
import {HttpClient} from "@angular/common/http";
import {first} from "rxjs";
import * as moment from "moment/moment";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private httpClient: HttpClient) {
  }

  listClient() {
    return this.httpClient.get<Client[]>('http://localhost:8080/api/client')
      .pipe(
        first()
      );
  }
  save(record: Client){
    if(record.birthDateClient != null){
      let newDate: moment.Moment = moment.utc(record.birthDateClient).local();
      record.birthDateClient = newDate.format("DD-MM-YYYY");
    }
    return this.httpClient.post<Client>('http://localhost:8080/api/client',record).pipe(first());
  }
}
