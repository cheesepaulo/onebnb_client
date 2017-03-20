import { Address } from './address';

export class User {
  id: number;
  name: string;
  email: string;
  birthday: string;
  created_at: string;
  description: string;
  gender: string;
  phone: string;
  address: Address;
  photo: any;

  constructor(userInfo:any) {
    this.id = userInfo.id;
    this.name = userInfo.name;
    this.email = userInfo.email;
    this.birthday = userInfo.birthday;
    this.created_at = userInfo.created_at;
    this.description = userInfo.description;
    this.gender = userInfo.gender;
    this.phone = userInfo.phone;
    this.address = userInfo.address;
    this.photo = userInfo.photo;

    this.address = new Address(userInfo.address);
  }
}
