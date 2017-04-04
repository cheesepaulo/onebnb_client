import { User } from './user';
import { Property } from './property';

export class Reservation {
  id: number;
  checkin_date: string;
  checkout_date: string;
  created_at: string;
  property_id: number;
  status: string;
  updated_at: string;
  user: User;
  interval_of_days: number;

  constructor(reservationInfo:any) {
    this.id = reservationInfo.id;
    this.checkin_date = reservationInfo.checkin_date;
    this.checkout_date = reservationInfo.checkout_date;
    this.created_at = reservationInfo.created_at;
    this.status = reservationInfo.status;
    this.updated_at = reservationInfo.updated_at;
    this.property_id = reservationInfo.property_id;
    this.interval_of_days = reservationInfo.interval_of_days;

    this.user = new User(reservationInfo.user);
  }
}
