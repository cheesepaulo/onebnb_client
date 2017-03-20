import { Address } from './address';
import { User } from './user';
import { Comment } from './comment';
import { Facility } from './facility';

export class Property {
  id: number;
  name: string;
  price: string;
  description: string;
  accommodation_type: string;
  bathroom: number;
  bedroom: number;
  beds: number;
  created_at: string;
  guest_max: number;
  priority: number;
  rating: string;
  status: string;
  user_id: number;
  user: User;
  address: Address;
  comments: Comment[] = [];
  facility: Facility;
  photos: any;

  constructor(propertyInfo:any) {
    this.id = propertyInfo.id;
    this.name = propertyInfo.name;
    this.price = propertyInfo.price;
    this.description = propertyInfo.description;
    this.accommodation_type = propertyInfo.accommodation_type;
    this.bathroom = propertyInfo.bathroom;
    this.bedroom = propertyInfo.bedroom;
    this.beds = propertyInfo.beds;
    this.created_at = propertyInfo.created_at;
    this.guest_max = propertyInfo.guest_max;
    this.priority = propertyInfo.priority;
    this.rating = propertyInfo.rating;
    this.status = propertyInfo.status;
    this.user_id = propertyInfo.user_id;

    this.user = new User(propertyInfo.user);
    this.facility = new Facility(propertyInfo.facility);
    this.address = new Address(propertyInfo.address);

    for(var count in propertyInfo.comments) {
      this.comments.push(new Comment(propertyInfo.comments[count]));
    }
  }
}
