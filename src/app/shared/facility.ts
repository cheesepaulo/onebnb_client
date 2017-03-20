export class Facility {
  id: number;
  wifi: boolean;
  washing_machine: boolean;
  clothes_iron: boolean;
  towels: boolean;
  air_conditioning: boolean;
  heater: boolean;
  refrigerator: boolean;

  constructor(facilityInfo:any) {
    this.id = facilityInfo.id;
    this.wifi = facilityInfo.wifi;
    this.washing_machine = facilityInfo.washing_machine;
    this.clothes_iron = facilityInfo.clothes_iron;
    this.towels = facilityInfo.towels;
    this.air_conditioning = facilityInfo.air_conditioning;
    this.heater = facilityInfo.heater;
    this.refrigerator = facilityInfo.refrigerator;
  }
}
