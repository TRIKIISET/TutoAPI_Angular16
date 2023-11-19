import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniversitesComponent } from './components/universites/universites.component';
import { ConversionComponent } from './components/conversion/conversion.component';
import { ErrorComponent } from './components/error/error.component';
import { CurrencyComponent } from './components/currency/currency.component';
import { ConverterComponent } from './components/converter/converter.component';

const routes: Routes = [
  { path: 'universites', title: 'Universités', component: UniversitesComponent },
  {
    path: 'conversion', title: 'Conversion', component: ConversionComponent,
    children: [
      { path: 'currency', title: 'Currency', component: CurrencyComponent },
      { path: 'converter', title: 'Converter', component: ConverterComponent },
      { path: '', redirectTo: 'currency', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'universites', pathMatch: 'full' },
  { path: '**', title: 'Conversion', component: ErrorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
