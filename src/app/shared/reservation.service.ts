import { Injectable } from '@angular/core';
// Incluimos o URLSearchParams para nos permitir passar parâmetros na chamada GET
import { Http, URLSearchParams } from '@angular/http';
import { Angular2TokenService, A2tUiModule} from 'angular2-token';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';


@Injectable()
export class ReservationService {

  constructor(private http: Http, private _tokenService: Angular2TokenService) { }

  addEvaluation(id, comment, rating){
    return this._tokenService.post('reservations/' + id + '/evaluation', {"evaluation": {"comment": comment, "rating": rating}})
      .map(res => res.json());
  }

  cancel(id){
    return this._tokenService.put('reservations/' + id + '/cancel', {}).map(res => res.json());
  }
}
