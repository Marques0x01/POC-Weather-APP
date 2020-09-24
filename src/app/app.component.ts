import { Component, OnInit } from '@angular/core';
import { ApiService } from './service/api.service';
import { DialogModals } from './utils/dialog-modals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private api: ApiService, private dialog: DialogModals) {}

  public scoreTypes: Array<any> = [];
  public panelOpenState: boolean;
  public iaqi: any;
  public states: Array<any> = [];
  public cities: Array<any> = [];
  public stateSelected: any = '';
  public citySelected: any = '';
  public weather: any = [];

  ngOnInit(): void {
    this.searchQuality('São Paulo');
    this.getStates();
  }

  public orderArray(array: Array<any>, field: string) {
    return array.sort((a, b) => {
      if (a[field] > b[field]) {
        return 1;
      }
      if (a[field] < b[field]) {
        return -1;
      }
      return 0;
    });
  }

  public getStates() {
    this.api.GetStates().subscribe((response) => {
      this.states = this.orderArray(<Array<any>>response, 'nome');
    });
  }

  public getCities(): void {
    this.cities = [];

    if (this.stateSelected && this.stateSelected != '') {
      this.api.GetCities(this.stateSelected.id).subscribe((response) => {
        this.cities = this.orderArray(<Array<any>>response, 'nome');
      });
    }
  }

  public searchQuality(city: string): void {
    if (!city || city == '') {
      return;
    }

    this.api
      .GetAirQuality(city)
      .then((response: any) => {
        this.iaqi = response.data;
        this.iaqi.quality = this.getQualityScore(response.data.aqi);
        this.createAqicn(this.iaqi.iaqi);
        this.getWeather(city);
      })
      .catch((error) => {
        this.searchQuality('São Paulo');
        this.getWeather('São Paulo');
        this.dialog.error(
          'Não foi encontrado nenhuma estação próxima a cidade selecionada'
        );
      });
  }

  public getWeather(city): void {
    if (!city || city == '') {
      return;
    }

    this.api
      .GetWeather(city)
      .then((response: any) => {
        console.log(response.results);
        this.weather = response.results;
      })
      .catch((error) => {
      });
  }

  public getQualityScore(score: number): any {
    if (!score || score < 0) {
      return null;
    }

    if (score >= 0 && score <= 50) {
      return {
        score: score,
        status: 'BOA',
        description:
          'A qualidade do ar é considerada satisfatória, a poluição do ar representa pouco ou nenhum risco',
        class: 'success',
      };
    }

    if (score > 50 && score <= 100) {
      return {
        score: score,
        status: 'Moderado',
        description:
          'A qualidade do ar é aceitável; No entanto, para alguns poluentes pode haver um problema de saúde moderada para um número muito pequeno de pessoas que são mais sensíveis à poluição do ar.',
        class: 'moderate',
      };
    }

    if (score > 100 && score <= 150) {
      return {
        score: score,
        status: 'Não Saudável para Grupos Sensíveis',
        description:
          'Membros de grupos sensíveis podem ter efeitos na a saúde. O público em geral não é susceptível de ser afetado.',
        class: 'warning',
      };
    }

    if (score > 150 && score <= 200) {
      return {
        score: score,
        status: 'Não saudável',
        description:
          'Toda a população pode começar a sentir os efeitos na saúde, membros de grupos sensíveis podem apresentar efeitos mais sérios de saúde.',
        class: 'danger',
      };
    }

    if (score > 200 && score <= 300) {
      return {
        score: score,
        status: 'Muito Prejudical à Saúde',
        description:
          'Muito Insalubre - As advertências de saúde de situações de emergência. Toda a população é mais susceptível de ser afectada.',
        class: 'purple',
      };
    }

    if (score > 300) {
      return {
        score: score,
        status: 'Perigoso',
        description:
          'Alerta de saúde: todos podem experimentar efeitos mais graves para a saúde',
        class: 'risk',
      };
    }
  }

  public createAqicn(aqicn): void {
    let t = aqicn.t
      ? {
          name: 't',
          value: aqicn.t.v,
          description: 'Temperatura',
        }
      : null;
    let pm10 = aqicn.pm10
      ? {
          name: 'pm10',
          value: aqicn.pm10.v,
          description: 'Monóxido de carbono',
        }
      : null;
    let pm25 = aqicn.pm25
      ? {
          name: 'pm25',
          value: aqicn.pm25.v,
          description: 'Monóxido de carbono',
        }
      : null;
    let co = aqicn.co
      ? {
          name: 'co',
          value: aqicn.co.v,
          description: 'Monóxido de carbono',
        }
      : null;
    let o3 = aqicn.o3
      ? {
          name: 'o3',
          value: aqicn.o3.v,
          description: 'Ozônio',
        }
      : null;
    let h = aqicn.h
      ? {
          name: 'h',
          value: aqicn.h.v,
          description: 'Hidrogênio',
        }
      : null;
    let no2 = aqicn.no2
      ? {
          name: 'no2',
          value: aqicn.no2.v,
          description: 'Dióxido de nitrogénio',
        }
      : null;
    let p = aqicn.p
      ? {
          name: 'p',
          value: aqicn.p.v,
          description: 'Fósforo',
        }
      : null;

    this.scoreTypes.push(co, h, no2, o3, p, pm10, pm25, t);
    this.scoreTypes = this.scoreTypes.filter((x) => x != null);
  }
}
