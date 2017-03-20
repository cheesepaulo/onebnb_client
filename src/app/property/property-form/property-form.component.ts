import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PropertiesService } from '../../shared/properties.service';
import { Property } from '../../shared/property';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import {NotificationsService} from 'angular2-notifications';


@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss']
})
export class PropertyFormComponent implements OnInit {

  private property: Property;
  public title: string = "";
  public propertyForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private PropertiesService: PropertiesService, public fb: FormBuilder, private NotificationsService: NotificationsService) {
    this.propertyForm = this.fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      accommodation_type: ["", Validators.required],
      price: ["", Validators.required],
      wifi: ["", Validators.required],
      washing_machine: ["", Validators.required],
      clothes_iron: ["", Validators.required],
      towels: ["", Validators.required],
      air_conditioning: ["", Validators.required],
      heater: ["", Validators.required],
      refrigerator: ["", Validators.required],
      beds: ["", Validators.required],
      bedroom: ["", Validators.required],
      bathroom: ["", Validators.required],
      guest_max: ["", Validators.required],
      country: ["", Validators.required],
      state: ["", Validators.required],
      city: ["", Validators.required],
      neighborhood: ["", Validators.required],
      street: ["", Validators.required],
      number: ["", Validators.required],
      zipcode: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.title = params['id'] ? 'Editar Propriedade' : 'Criar Propriedade';
      if (params['id']){
        this.PropertiesService.getProperty(params['id'])
          .subscribe(
            data => {
              this.property =  new Property(data.property);

              this.propertyForm = this.fb.group({
                name: [this.property.name, Validators.required],
                description: [this.property.description, Validators.required],
                accommodation_type: [this.property.accommodation_type, Validators.required],
                price: [this.property.price, Validators.required],
                wifi: [this.property.facility.wifi, Validators.required],
                washing_machine: [this.property.facility.washing_machine, Validators.required],
                clothes_iron: [this.property.facility.clothes_iron, Validators.required],
                towels: [this.property.facility.towels, Validators.required],
                air_conditioning: [this.property.facility.air_conditioning, Validators.required],
                heater: [this.property.facility.heater, Validators.required],
                refrigerator: [this.property.facility.refrigerator, Validators.required],
                beds: [this.property.beds, Validators.required],
                bedroom: [this.property.bedroom, Validators.required],
                bathroom: [this.property.bathroom, Validators.required],
                guest_max: [this.property.guest_max, Validators.required],
                country: [this.property.address.country, Validators.required],
                state: [this.property.address.state, Validators.required],
                city: [this.property.address.city, Validators.required],
                neighborhood: [this.property.address.neighborhood, Validators.required],
                street: [this.property.address.street, Validators.required],
                number: [this.property.address.number, Validators.required],
                zipcode: [this.property.address.zipcode, Validators.required],
              });

            },
            err => {this.router.navigateByUrl('/');}
          );
      }
    });
  }

  save(){
    if(this.property && this.property.id)
    {
      this.PropertiesService.updateProperty(this.propertyForm.value, this.property.id)
        .subscribe(res => {
          this.NotificationsService.success(
            'Dados atualizados',
            'Sucesso \\o/',
            {
                timeOut: 5000,
                showProgressBar: true,
                pauseOnHover: false,
                clickToClose: true,
                maxLength: 30,
                lastOnBottom: true
            }
          );
          location.reload();
        }, error => {
          this.NotificationsService.error(
            'Falha ao atualizar',
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
    else{
      this.PropertiesService.addProperty(this.propertyForm.value)
        .subscribe(res => {
          this.NotificationsService.success(
            'Propriedade criada com Sucesso',
            'Sucesso \\o/',
            {
                timeOut: 5000,
                showProgressBar: true,
                pauseOnHover: false,
                clickToClose: true,
                maxLength: 30,
                lastOnBottom: true
            }
          );
          location.reload();
        }, error => {
          this.NotificationsService.error(
            'Falha ao criar Propriedade',
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

  }

}
