import { Component, OnInit, Input } from '@angular/core';
import { PropertiesService } from '../properties.service';

@Component({
  selector: 'app-property-box',
  templateUrl: './property-box.component.html',
  styleUrls: ['./property-box.component.scss']
})
export class PropertyBoxComponent implements OnInit {

  @Input() wishlisted: boolean = false;
  @Input() photo: string;
  @Input() name:  string;
  @Input() price: string;
  @Input() stars: string;
  @Input() whish: string;
  @Input() property_id: string;

  constructor(private PropertiesService: PropertiesService) { }

  ngOnInit() {
  }

  wishlist(status, property_id){
    if(status == true){
      this.PropertiesService.addToWishlist(property_id)
        .subscribe(data => {
          this.wishlisted = status;
        }
      );
    }else{
      this.PropertiesService.removeToWishlist(property_id)
        .subscribe(data => {
          this.wishlisted = status;
        }
      );
    }
  }
}
