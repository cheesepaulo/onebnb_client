import { Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { PropertiesService } from '../properties.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-reservation-box',
  templateUrl: './reservation-box.component.html',
  styleUrls: ['./reservation-box.component.scss']
})
export class ReservationBoxComponent implements OnInit {
  public begindate: Date = new Date();
  public enddate: Date = new Date();
  public guests: Number = 1;
  public guests_array:Array<Object> = [];
  @Input() max: number;
  @Input() property_id: number;
  @Input() price: any;
  public search_btn: boolean = false;


  constructor(private PropertiesService: PropertiesService, private router: Router, private route: ActivatedRoute, private NotificationsService: NotificationsService) {}

  ngOnChanges() {
    this.guests_array = [];
    for(var i = 0; i < this.max; i++) {
      this.guests_array.push({'num': i + 1, 'name': i + 1})
    }
  }

  ngOnInit() {  }

  intervalOfDays() {
    return (this.enddate.getTime()  - this.begindate.getTime()) / 86400000;
  }

  blockSearchBtn(){
    this.search_btn = false;
  }

  formateDate(date){
    var day = date.getDate();
    if (day.toString().length == 1)
      day = "0"+day;
    var month = date.getMonth()+1;
    if (month.toString().length == 1)
      month = "0"+month;
    var year = date.getFullYear();
    return day+"/"+month+"/"+year;
  }

  goToReservation(){
    let baseurl = 'property/' + this.property_id + '/reservation';
    this.router.navigateByUrl(baseurl + '?checkin=' + this.formateDate(this.begindate) + "&" +
                                        'checkout=' + this.formateDate(this.enddate)   + "&" +
                                        'intervalOfDays=' + this.intervalOfDays()      + "&" +
                                        'guests=' + this.guests
                             );
  }

  is_available(){
    this.PropertiesService.is_available(this.formateDate(this.begindate), this.formateDate(this.enddate), this.property_id)
      .subscribe(data => {
        if(data.success == true)
        {
          this.search_btn = true;
          this.NotificationsService.success(
            'Reserve Agora',
            'Disponível',
            {
                timeOut: 5000,
                showProgressBar: true,
                pauseOnHover: false,
                clickToClose: true,
                maxLength: 10,
                lastOnBottom: true
            }
          );
        }else{
          this.search_btn = false;
          this.NotificationsService.error(
            'Indisponível',
            ':(',
            {
                timeOut: 5000,
                showProgressBar: true,
                pauseOnHover: false,
                clickToClose: true,
                maxLength: 10,
                lastOnBottom: true
            }
          );
        }
      }
    );
  }
}
