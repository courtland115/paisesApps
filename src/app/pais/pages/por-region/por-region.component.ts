import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/paises.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [ `
    button {
      margin-right: 5px;
    }
  `]
})
export class PorRegionComponent{

  regiones: string[] = [ 'EU', 'EFTA', 'CARICOM', 'PA', 'AU', 'USAN', 'EEU', 'AL', 'ASEAN', 'CAIS', 'CEFTA', 'NAFTA', 'SAARC'];
  regionActiva: string = '';
  paises: Country[] = [];

  hayError : boolean = false;

  constructor( private paisService: PaisService) { }

  getClasesCss ( region: string): string {
    return (region === this.regionActiva) ? 'btn btn-primary': 'btn btn-outline-primary';
  }

  activaRegion ( region : string) {
    if ( region === this.regionActiva) { return; }
      this.regionActiva = region;
      this.paises = [];
      this.hayError = false;

    this.paisService.buscarRegion(this.regionActiva)
    .subscribe( paises => {     
      this.paises = paises;

    }, ( err ) => {     

      this.hayError = true;
      this.paises = [];

    });


  }
  
}
