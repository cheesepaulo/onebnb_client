export class Address {
  id: number;
  country: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  zipcode: string;
  latitude: string;
  longitude: string;

  constructor(addressInfo:any) {
    this.id = addressInfo.id;
    this.country = addressInfo.country;
    this.state = addressInfo.state;
    this.city = addressInfo.city;
    this.neighborhood = addressInfo.neighborhood;
    this.street = addressInfo.street;
    this.number = addressInfo.number;
    this.zipcode = addressInfo.zipcode;
    this.latitude = addressInfo.latitude;
    this.longitude = addressInfo.longitude;
  }
}
