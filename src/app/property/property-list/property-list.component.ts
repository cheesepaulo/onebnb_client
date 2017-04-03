import { Component, OnInit } from '@angular/core';
import { PropertiesService } from '../../shared/properties.service';
import { Property } from '../../shared/property';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {

  constructor(private PropertiesService: PropertiesService, private NotificationsService: NotificationsService) { }

  private properties: Property[] = [];

  ngOnInit() {
    this.PropertiesService.myProperties()
      .subscribe(
        data => {
          for(var i = 0; i < data.length; i++) {
            this.properties.push(new Property(data[i].property))
          }
          console.log(this.properties);
        }, error => {
          this.NotificationsService.error(
            'Falha ao pegar as Propriedades',
            'Tente novamente',
            {
                timeOut: 5000,
                showProgressBar: true,
                pauseOnHover: false,
                clickToClose: true,
                maxLength: 30,
                lastOnBottom: true
            }
          );
        }
      );
  }

  delete(property){

  }

}
