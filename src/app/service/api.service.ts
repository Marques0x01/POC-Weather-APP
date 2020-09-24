import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpInterceptor, HttpBackend } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  // Http Headers
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  public GetAirQuality(city: string){
    return this.http.get("http://api.waqi.info/feed/"+ city +"/?token=caf5464691f40c558a12097cf6b70b44a1b39dcd").toPromise();
  }

  public GetStates() {
    return this.http.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
  }

  public GetCities(state: string) {
    return this.http.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`);
  }

  public GetWeather(city: string) {
    return this.http.get(`https://api.hgbrasil.com/weather?format=json-cors&locale=pt&key=e1df0804&city_name=${city}`).toPromise();
  }


}