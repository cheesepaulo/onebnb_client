import { Component, OnInit, Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PropertiesService } from '../../shared/properties.service';
import { ReservationService } from '../../shared/reservation.service';
import { Property } from '../../shared/property';
import { Reservation } from '../../shared/reservation';
import {NotificationsService} from 'angular2-notifications';


@Component({
  selector: 'app-property-reservations',
  templateUrl: './property-reservations.component.html',
  styleUrls: ['./property-reservations.component.scss']
})
export class PropertyReservationsComponent implements OnInit {

  private reservations_active: Reservation[] = [];
  private reservations_pending: Reservation[] = [];
  private reservations_finished: Reservation[] = [];
  private property: Property;


  constructor(private PropertiesService: PropertiesService, private ReservationService: ReservationService,  private route: ActivatedRoute, private router: Router, private NotificationsService: NotificationsService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.PropertiesService.getProperty(params['id'])
        .subscribe(data => {
          this.property = new Property(data.property);
        }
      );

      this.ReservationService.getByProperty(params['id'])
        .subscribe(
          data => {
            for(var i = 0; i < data.length; i++) {
              console.log(data[i]);
              if(data[i].status == "active"){
                this.reservations_active.push(new Reservation(data[i]));
              } else if(data[i].status == "pending"){
                this.reservations_pending.push(new Reservation(data[i]));
              } else if(data[i].status == "finished" && data[i].status == "canceled" && data[i].status == "refused"){
                this.reservations_finished.push(new Reservation(data[i]));
              }
            }
          },
          err => {this.router.navigateByUrl('/');}
        );
    });
  }

  accept(reservation)
  {
    this.ReservationService.accept(reservation.id)
      .subscribe(data => {
        var index = this.reservations_pending.indexOf(reservation);
        this.reservations_pending.splice(index, 1);

        this.reservations_active.push(reservation);

        this.NotificationsService.success(
          'Reserva Confirmada',
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
      }
    );
    return false;
  }

  refuse(reservation)
  {
    if (confirm("Você tem certeza que quer recusar esse pedido?")) {
      this.ReservationService.refuse(reservation.id)
        .subscribe(data => {
          var index = this.reservations_pending.indexOf(reservation);
          this.reservations_pending.splice(index, 1);

          this.reservations_finished.push(reservation);

          this.NotificationsService.alert(
            'Reserva Cancelada',
            'Sucesso.',
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
    return false;
  }

}
