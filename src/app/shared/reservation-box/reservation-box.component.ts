import { Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';


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


  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnChanges() {
    this.guests_array = [];
    for(var i = 0; i < this.max; i++) {
      this.guests_array.push({'num': i + 1, 'name': i + 1})
    }
  }

  ngOnInit() {
    console.log(this.formateDate(this.begindate));
  }

  intervalOfDays() {
    return (this.enddate.getTime()  - this.begindate.getTime()) / 86400000;
    // pega o tempo em segundos e divide pela quantidade de segundos de um dia resultar em um inteiro
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

  goToReservation() {
    let baseurl = 'property/' + this.property_id + '/reservation';
    this.router.navigateByUrl(baseurl + '?checkin=' + this.formateDate(this.begindate) + "&" +
                                        'checkout=' + this.formateDate(this.enddate)   + "&" +
                                        'intervalOfDays=' + this.intervalOfDays()      + "&" +
                                        'guests=' + this.guests
                             );
  }
}
