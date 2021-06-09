import { ProvidersComponent } from "./providers.component";
import { CardModule } from "../../../components/card/card.module";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProvidersRoutingModule } from "./executions-routing.module";
import { ProviderFormComponent } from './provider-form/provider-form.component';

@NgModule({
  declarations: [ProvidersComponent, ProviderFormComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    ProvidersRoutingModule,
    CardModule,
  ],
  providers: [],
  bootstrap: [],
})
export class ProvidersModule {}