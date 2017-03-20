import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Angular2TokenService, A2tUiModule} from 'angular2-token';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';


@Injectable()
export class UsersService {

  constructor(private http: Http, private _tokenService: Angular2TokenService) { }

  getWishlist(){
    return this._tokenService.get('users/wishlist', {}).map(res => res.json());
  }

  show(){
    return this._tokenService.get('current_user', {}).map(res => res.json());
  }

  update(params, photo){
    return this._tokenService.put('users/', {"user":
                                              {"name": params.name,
                                               "email": params.email,
                                               "gender": params.gender,
                                               "description": params.description,
                                               "phone": params.phone, photo: photo},
                                               address: {"country": params.country,
                                                         "state": params.state,
                                                         "city": params.city
                                                        }
                                            }).map(res => res.json());
  }
}
