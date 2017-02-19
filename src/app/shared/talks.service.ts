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
export class TalksService {

  constructor(private http: Http, private _tokenService: Angular2TokenService) { }

  getTalks(page){
    return this._tokenService.get('talks?page=' + page).map(res => res.json());
  }

  getMessages(id){
    return this._tokenService.get('talks/' + id + '/messages', {}).map(res => res.json());
  }

  createMessage(id, property_id, body){
    if(id){
      return this._tokenService.post('talks/' + id + '/messages', {'body': body}).map(res => res.json());
    }else{
      return this._tokenService.post('talks/messages', {'body': body, 'property_id': property_id}).map(res => res.json());
    }
  }
