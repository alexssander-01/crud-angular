import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients/clients.component';
import { AppMaterialModule } from "../shared/app-material/app-material.module";
import {SharedModule} from "../shared/shared.module";
import { ClientFormComponent } from './client-form/client-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [
    ClientsComponent,
    ClientFormComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,
    MatSortModule
  ]
})
export class ClientsModule { }
