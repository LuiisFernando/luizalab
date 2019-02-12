import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Localizacao } from './Localizacao';

interface Location {
  latitude: String;
  longitude: String;
}


@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(
    private http: HttpClient
  ) { }


  buscaEnderecoPorCep(cep: String) {
    return this.http.get<Localizacao>(`https://viacep.com.br/ws/${cep}/json/`);
  }
  buscarInformacoesEndereco(endereco: String) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`https://maps.google.com/maps/api/geocode/json?address=${endereco}&amp;sensor=false&key=AIzaSyARDczU1yDgDNayevF8RA-6-Ur-ZfXrTXY`);
  }

}
