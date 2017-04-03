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
export class PropertiesService {
  private url: string = "properties.json";

  constructor(private http: Http, private _tokenService: Angular2TokenService) { }

  is_available(checkin_date, checkout_date, id){
    let params = new URLSearchParams();
    params.set('checkin_date', checkin_date);
    params.set('checkout_date', checkout_date);

    return this.http.get(environment.api_base_url + 'properties/' + id + '/check_availability.json', {search: params})
      .map(res => res.json());
  }

  getFeatured(){
    return this.http.get(environment.api_base_url + 'featured.json')
      .map(res => res.json());
  }

  myTrips(){
    return this._tokenService.get('trips')
      .map(res => res.json());
  }

  // Incluimos nosso método de search
  searchProperties(params){
    let parameters = new URLSearchParams();
    for(var f in params) { parameters.set(f, params[f]) }

    return this.http.get(environment.api_base_url + 'search.json', {search: parameters})
      .map(res => res.json());
  }

  addToWishlist(id){
    //faz uma chamada pra api passando os dados do usuário logado (this._tokenService.)
    return this._tokenService.post('properties/' + id + '/wishlist', {})
      .map(res => res.json());
  }

  removeToWishlist(id){
    return this._tokenService.delete('properties/' + id + '/wishlist')
      .map(res => res.json());
  }

  getProperties(){
    return this.http.get(environment.api_base_url + 'properties.json')
      .map(res => res.json());
  }

  myProperties(){
  return this._tokenService.get('my_properties')
    .map(res => res.json());
  }

  autocomplete(){
    return this.http.get(environment.api_base_url + 'autocomplete.json')
      .map(res => res.json());
  }

  getProperty(id){
    return this.http.get(environment.api_base_url + 'properties/' + id)
      .map(res => res.json());
  }

  addProperty(property){
    var address_params = {
      country: property.country,
      state: property.state,
      city: property.city,
      neighborhood: property.neighborhood,
      street: property.street,
      number: property.number,
      zipcode: property.zipcode
    }

    var facility_params = {
      wifi: property.wifi,
      washing_machine: property.washing_machine,
      clothes_iron: property.clothes_iron,
      towels: property.towels,
      air_conditioning: property.air_conditioning,
      heater: property.heater,
      refrigerator: property.refrigerator
    }
    return this._tokenService.post('properties/' , {'api_v1_property': {
                                                                            name: property.name,
                                                                            price: property.price,
                                                                            description: property.description,
                                                                            guest_max: property.guest_max,
                                                                            beds: property.beds,
                                                                            bedroom: property.bedroom,
                                                                            bathroom: property.bathroom,
                                                                            accommodation_type: property.accommodation_type,
                                                                            "address_attributes": address_params,
                                                                            "facility_attributes": facility_params
                                                                          }
                                                      })
      .map(res => res.json());
  }


  updateProperty(property, id){
    var address_params = {
      country: property.country,
      state: property.state,
      city: property.city,
      neighborhood: property.neighborhood,
      street: property.street,
      number: property.number,
      zipcode: property.zipcode
    }

    var facility_params = {
      wifi: property.wifi,
      washing_machine: property.washing_machine,
      clothes_iron: property.clothes_iron,
      towels: property.towels,
      air_conditioning: property.air_conditioning,
      heater: property.heater,
      refrigerator: property.refrigerator
    }
    return this._tokenService.put('properties/' + id, {'api_v1_property': {
                                                                            name: property.name,
                                                                            price: property.price,
                                                                            description: property.description,
                                                                            guest_max: property.guest_max,
                                                                            beds: property.beds,
                                                                            bedroom: property.bedroom,
                                                                            bathroom: property.bathroom,
                                                                            accommodation_type: property.accommodation_type,
                                                                            "address_attributes": address_params,
                                                                            "facility_attributes": facility_params
                                                                          }
                                                      })
      .map(res => res.json());
  }

  deleteProperty(id){
    return this.http.delete(environment.api_base_url + 'properties.json/' + id)
      .map(res => res.json());
  }
}
