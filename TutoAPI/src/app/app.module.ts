import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UniversitesComponent } from './components/universites/universites.component';
import { ConversionComponent } from './components/conversion/conversion.component';
import { ErrorComponent } from './components/error/error.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './components/menu/menu.component';
import { CurrencyComponent } from './components/currency/currency.component';
import { ConverterComponent } from './components/converter/converter.component';

@NgModule({
  declarations: [
    AppComponent,
    UniversitesComponent,
    ConversionComponent,
    ErrorComponent,
    MenuComponent,
    CurrencyComponent,
    ConverterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
