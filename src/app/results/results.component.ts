import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { Property } from '../shared/property';
import { PropertiesService } from '../shared/properties.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { UsersService } from '../shared/users.service';
import { Angular2TokenService, A2tUiModule} from 'angular2-token';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  private properties: Property[] = [];
  private mapPins: Array<{ lat: number, lng: number, draggable: boolean, label: string, icon: string, photo: string, price: number, id: any}> = [];
  private lat: number = -13.4963582;
  private lng: number = -69.8079044;
  private wishlist: any;

  constructor(private PropertiesService: PropertiesService, private route: ActivatedRoute, private UsersService: UsersService, private _tokenService: Angular2TokenService) { }

  ngOnInit() {
    // Método que pega os parâmetros da URL
    this.route
      .queryParams
      .subscribe(params => {
        // Método que chama nosso Service
        this.PropertiesService.searchProperties(params)
          .subscribe(data => {
            this.properties = data;
            this.mapPins = [];
            this.formateToMap();
          }
        );
      });

      // Pega a wishlist do usuário se estiver logado
      if(this._tokenService.userSignedIn() == true)
      {
        this.UsersService.getWishlist()
          .subscribe(data => {
            this.wishlist = data;
          }
        );
      }
  }

  wishlisted(id)
  {
    //FIX melhorar esse loop com um for each
    if(this.wishlist)
      for(var i = 0; i < this.wishlist.length; i++) {
        if(this.wishlist[i]['property']['id'] == id) {return true}
      }
    return false;
  }

  formateToMap() {
    // Depois de pegarmos as propriedades da pesquisa nos convertemos elas em um formato que o mapa entenda
    let i = 0;
    for (let p of this.properties) {
      this.mapPins.push({
        id: p['property']['id'],
        lat: +p['property']['address']['latitude'],
        lng: +p['property']['address']['longitude'],
        draggable: false,
        price: p['property']['price'],
        icon: "http://bootcamp.onebitcode.com/wp-content/uploads/2017/01/b3.png",
        label: p['property']['name'],
        photo: p['property']['photos'][0]
      });
      if(i == 0)
      {
        this.lat = +p['property']['address']['latitude'];
        this.lng = +p['property']['address']['longitude'];
      }
      i++;
    }
  }
}
