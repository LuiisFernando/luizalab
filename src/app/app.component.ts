import { Localizacao } from './Localizacao';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MapsService } from './maps.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  lat: String;
  long: String;

  location: Object;
  endereco: Localizacao;

  formulario: FormGroup;
  cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  constructor(
    private formBuilder: FormBuilder,
    private map: MapsService,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  ngOnInit() {

    this.formulario = this.formBuilder.group({
      localizacao: ['', Validators.required]
    });

  }

  buscarEndereco() {
    const cep = this.formulario.get('localizacao').value;

    if (cep.replace('_', '').length < 9) {
      return;
    }

    this.spinnerService.show();

    this.map.buscaEnderecoPorCep(cep).subscribe(
      (data: any) => {
      this.endereco = data;
      const enderecoProcura = `${this.endereco.logradouro}-${this.endereco.bairro}-${this.endereco.localidade}`.replace(' ', '-');
      console.log(enderecoProcura);

      this.map.buscarInformacoesEndereco(enderecoProcura).subscribe((data2: any) => {

        if (data2.status === 'ZERO_RESULTS') {
          this.fecharMapa();
          alert('nenhum local encontrado !');
        } else {
          this.lat = data2.results[0].geometry.location.lat;
          this.long = data2.results[0].geometry.location.lng;
        }
      });

    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    });

    this.spinnerService.hide();
  }

  fecharMapa() {
    this.endereco = null;
  }

}
