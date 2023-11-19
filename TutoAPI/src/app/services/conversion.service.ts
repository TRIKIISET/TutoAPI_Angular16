import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {

  constructor(private http: HttpClient) { }

  getSupportedCurrencies(): Observable<any> {
    const URL = 'https://currency-converter18.p.rapidapi.com/api/v1/supportedCurrencies';
    const headers: HttpHeaders = new HttpHeaders({
      'X-RapidAPI-Key': 'b727ba6659msh61db1a7f1d7a512p13fb05jsn48dbe7a82dd0',
      'X-RapidAPI-Host': 'currency-converter18.p.rapidapi.com'
    })
    return this.http.get<any>(URL, { headers: headers });
  }
  convert(from:string, to:string, amount:number):Observable<any>{
    const URL= 'https://currency-converter18.p.rapidapi.com/api/v1/convert';
   
    let params= new HttpParams();
    params= params.append('from', from);
    params= params.append('to', to);
    params= params.append('amount', amount);

    const headers : HttpHeaders = new HttpHeaders({
      'X-RapidAPI-Key': 'b727ba6659msh61db1a7f1d7a512p13fb05jsn48dbe7a82dd0',
      'X-RapidAPI-Host': 'currency-converter18.p.rapidapi.com'
    })

   return this.http.get<any>(URL, {headers:headers, params: params});
  }

}
